const moment = require('moment')
require('dotenv').config();

const {Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');
const Discord = require('discord.js')

const client = new Client({
    intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

let mysql = require('mysql');
let config = require('./dbNew/config')
let connection = mysql.createConnection(config);

const bitacora = new Map();

const prefix = '!';

const fs = require('fs');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
};

client.once('ready', () => {
    console.log("Bot bitacoras online!")

    const guildId = '899852504240623617' // testServer
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'Responde con un pong.',
    })

    commands?.create({
        name: 'desactivar',
        description: 'Inabilita un ciclo de bitacora especifico.',
        options: [
            {
                name: 'bitacora',
                description: 'El id de la bitacora que queres desactivar.',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
        ]
    })

    commands?.create({
        name: 'activar',
        description: 'Activa un ciclo de bitacora que se habia desactivado anteriormente.',
        options: [
            {
                name: 'bitacora',
                description: 'El id de la bitacora que queres reactivar.',
                required: true,
                type: Discord.Constants.ApplicationCommandOptionTypes.NUMBER,
            },
        ]
    })
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction

    if (commandName === 'ping') {
        interaction.reply({ content: 'pong!', ephemeral: true })
    } else if (commandName === 'desactivar') {
        let id = options.getNumber('bitacora');

        connection.query(`SELECT max(bitacoraId) As "bitid" FROM bitacoras`, function select(err, resultsMax, fields) {
            if (err) {
                return console.error(err);
            }
            let maxId = (resultsMax[0]).bitid;
            if (id > maxId) {
                interaction.reply({ content: `La \`bitacora Nro ${id}\` no existe.` })
                return;
            }
            connection.query(`select is_active from bitacoras where bitacoraId = ${id};`, function select(err, resultsActive, fields) {
                if (err) {
                    return console.log(err);
                }
                let selectedId = (resultsActive[0]).is_active;
                if (selectedId === 0) {
                    interaction.reply({ content: `La \`bitacora Nro ${id}\` ya se habia desactivado.` })                    
                } else {
                    connection.query(`UPDATE bitacoras SET is_active = 0 WHERE bitacoraId = ${id};`);
            
                    interaction.reply({ content: `Se desactivo la \`bitacora Nro ${id}\` correctamente.` })
                }
            })
        });
    } else if (commandName === 'activar') {
        let id = options.getNumber('bitacora');

        connection.query(`SELECT max(bitacoraId) As "bitid" FROM bitacoras`, function select(err, resultsMax, fields) {
            if (err) {
                return console.error(err);
            }
            let maxId = (resultsMax[0]).bitid;
            if (id > maxId) {
                interaction.reply({ content: `La \`bitacora Nro ${id}\` no existe.` })
                return;
            }
            connection.query(`select is_active from bitacoras where bitacoraId = ${id};`, function select(err, resultsActive, fields) {
                if (err) {
                    return console.log(err);
                }
                let selectedId = (resultsActive[0]).is_active;
                if (selectedId === 1) {
                    interaction.reply({ content: `La \`bitacora Nro ${id}\` se encontraba activa anteriormente.` })                    
                } else {
                    connection.query(`UPDATE bitacoras SET is_active = 1 WHERE bitacoraId = ${id};`);
            
                    interaction.reply({ content: `Se reactivo la \`bitacora Nro ${id}\` correctamente.` })
                }
            })
        });
    }
})

// {!!!} Botones que abren y cierran las bitacoras =>
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    let user = interaction.user.id
    //let date = new Date().toISOString().slice(0, 19).replace('T', ' '); // ESTA MAL EL TIME ZONE
    let dateEmb = new Date()

    var tzoffset = (new Date()).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
    
    //console.log(localISOTime)

    const logsChat = client.channels.cache.get('899866780741296138')

    function msToTime(ms) {
        let seconds = (ms / 1000).toFixed(1);
        let minutes = (ms / (1000 * 60)).toFixed(1);
        let hours = (ms / (1000 * 60 * 60)).toFixed(1);
        let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
        if (seconds < 60) return seconds + " Segundos";
        else if (minutes < 60) return minutes + " Minutos";
        else if (hours < 24) return hours + " Horas";
        else return days + " Días"
      }

    // OPEN =>
    if (interaction.customId === 'open') {
        if( bitacora.has(user) === true ) {
            interaction.reply({ content: 'Ya tenes abierta una bitacora', ephemeral: true })
        } else {
            const bitAbierta = {
                color: 0x3BA55D,
                title: 'Bitacora abierta  <a:tick:902695712163246150>', // <a:tick:902695712163246150>
                description: 'Tu bitacora se abrio correctamente.',
                fields: [
                    {
                        name: 'Fecha de inicio:',
                        value: `${localISOTime}`,
                        inline: false,
                    },
                ],
            };

            bitacora.set(
                `${interaction.user.id}`, {
                    username: `${interaction.user.username}`,
                    dsId: `${interaction.user.id}`,
                    openDate: `${localISOTime}`
                    }
                )

            logsChat.send({ content: `\`[${localISOTime}] [ Usuario: ${interaction.user.username} | DiscordId: ${interaction.user.id} ]\` Abrio una bitacora` }) // Informa la accion via #bitacora-logs

            interaction.reply({ embeds: [bitAbierta], ephemeral: true }); // Envia una respuesta al usuario
        }

    // CLOSE =>
    } else if (interaction.customId === 'close') {
        if( bitacora.has(user) === false ) {
            interaction.reply({ content: 'Tenes que abrir una bitacora antes', ephemeral: true })
        } else {

            var diff = Math.abs(new Date() - new Date((bitacora.get(user).openDate).replace(/-/g,'/')));
            
            //console.log(diff);
            //console.log(msToTime(diff));

            const bitCerrada = {
                color: 0xed4245,
                title: 'Bitacora cerrada',
                description: 'La bitacora se cerro y se subio a la base de datos',
                fields: [
                    {
                        name: 'Fecha de inicio:',
                        value: `${bitacora.get(user).openDate}`,
                    },
                    {
                        name: 'Fecha de cierre:',
                        value: `${localISOTime}`
                    },
                    {
                        name: 'Duración:',
                        value: `${msToTime(diff)}`,
                    }
                ],
            };

            // {!!!} Acá va la parte en la que se inserta a la base de datos

            async function insertSql() {
                connection.query(`INSERT INTO bitacoras(bitacoraId, discordId, username, openDate, closeDate) VALUES ("", ${bitacora.get(user).dsId}, "${bitacora.get(user).username}", "${bitacora.get(user).openDate}", "${localISOTime}")`);
            };
            await insertSql();
            
            connection.query(`SELECT max(bitacoraId) As "bitid" FROM bitacoras where discordId = ${user}`, function select(err, results, fields) {
                if (err) {
                    return console.error(err);
                }
                let id = (results[0]).bitid;
                //console.log(id);

                connection.query(`select timediff(closeDate, openDate) As "duracion" from bitacoras where bitacoraId = ${id}`, function select2(err, results, fields) {
                    if (err) {
                        return console.log(err);
                    }
                    let lenght = (results[0].duracion)
                    var alert = "";

                    if (lenght > "06:00:00" && lenght < "11:59:59") {
                        var alert = "  :yellow_square:";
                    } else if (lenght > "12:00:00" && lenght < "23:59:59") {
                        var alert = "  :orange_square:";
                    } else if (lenght > "24:00:00") {
                        var alert = "  :red_square:";
                    }

                    logsChat.send({ content: `\`[${localISOTime}] [ Usuario: ${interaction.user.username} | DiscordId: ${interaction.user.id} ]\` \`[ bitId: ${id} | duración: ${lenght} ]\` Cerro una bitacora${alert}` })
                });
            });
            
            bitacora.delete(`${interaction.user.id}`)

            interaction.reply({ embeds: [bitCerrada], ephemeral: true }); // Envia una respuesta al usuario
        }
    } else if (interaction.customId === 'status') {

        // var now = moment();
        // var input = moment('2022/01/10 00:00:00');
        // var isThisWeek = (now.isoWeek() == input.isoWeek())

        // const today = moment();
        // const from_date = today.startOf('week');
        // const to_date = today.endOf('week');
        // console.log({
        //     from_date: from_date.toString(),
        //     today: moment().toString(),
        //     to_date: to_date.toString(),
        // });

        console.log(moment().startOf('isoWeek'));
        // console.log(moment().startOf('isoWeek').toISOString().slice(0, 19).replace('T', ' '));
        // console.log(moment().endOf('isoWeek'));

        console.log(moment().startOf('isoWeek').toISOString())

        //console.log(isThisWeek);

        connection.query(`select sum(timediff(closeDate, openDate)) AS duracion_semana from bitacoras where discordId = ${user} and opendate between "2022-01-09 23:59:59" and "2022-01-17 00:00:00";`, function select(err, results, fields) {
            if (err) {
                return console.log(err);
            }
            let lenghtWeek = (results[0].duracion_semana)
            //console.log(msToTime(lenghtWeek*1000));

            connection.query(`select count(openDate) As cantidad_semana from bitacoras where discordId = ${user} and opendate between "2022-01-09 23:59:59" and "2022-01-17 00:00:00"`, function select(err, results, fields){
                if(err) {
                    console.log(err);
                }
                let countWeek = (results[0].cantidad_semana)
            
                if (countWeek == 1) {
                    var V = "vez";
                } else {
                    var V = "veces";
                }

                const bitStatus = {
                    color: 0x4F545C,
                    title: 'Estado de mis bitacoras',
                    description: `En esta semana roleaste **${msToTime(lenghtWeek*1000)}** y abriste **${countWeek}** ${V} bitacora.`
                }

                interaction.reply({ embeds: [bitStatus], ephemeral: true })
            })
        })
    }
});

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'clear') { // for developers purpose only
        client.commands.get('clear').execute(message, args, client);
    } else if (command === 'open') {
        client.commands.get('open').execute(message, args, client, MessageActionRow, MessageSelectMenu, MessageEmbed);
    } else if (command === 'button') {
        client.commands.get('button').execute(message, args, client, MessageActionRow, MessageButton, MessageEmbed);
    } else if (command === 'insert') {
        client.commands.get('insert').execute(message, args);
    }
});


client.login(process.env.BOT_TOKEN);