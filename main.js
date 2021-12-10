require('dotenv').config();
const {Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');
//const db = require('./db/database')
// let connection = require('./db/database');

// (async () => {
//     connection = await require('./db/database')
// })

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
] });

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
});

// {!!!} Mensaje que abre y cierra las bitacoras =>
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    let user = interaction.user.id
    let openDate = new Date();

    const logsChat = client.channels.cache.get('899866780741296138')

    // OPEN =>
    if (interaction.customId === 'open') {
        if( bitacora.has(user) === true ) {
            interaction.reply({ content: 'Ya tenes abierta una bitacora', ephemeral: true })
        } else {
            const bitAbierta = {
                color: 0x3BA55D,
                title: 'Bitacora abierta correctamente <a:tick:902695712163246150>',
                fields: [
                    {
                        name: 'Dia:',
                        value: `${openDate.toLocaleDateString()}`,
                        inline: false,
                    },
                    {
                        name: 'Inicio:',
                        value: `${openDate.toLocaleTimeString()}`,
                        inline: true,
                    },
                ],
            };

            bitacora.set(
                `${interaction.user.id}`, {
                    username: `${interaction.user.username}`,
                    dsId: `${interaction.user.id}`,
                    openDate: `${openDate.toLocaleString()}`
                    }
                )

            logsChat.send({ content: `\`[${openDate.toLocaleString()}] [ Usuario: ${interaction.user.username} | DiscordId: ${interaction.user.id} ]\` Abrio una bitacora  :green_circle:` }) // Informa la accion via #bitacora-logs

            interaction.reply({ embeds: [bitAbierta], ephemeral: true }); // Envia una respuesta al usuario
        }

    // CLOSE =>
    } else if (interaction.customId === 'close') {
        if( bitacora.has(user) === false ) {
            interaction.reply({ content: 'Tenes que abrir una bitacora antes', ephemeral: true })
        } else {
            const bitCerrada = {
                color: 0xed4245,
                title: 'Bitacora cerrada correctamente',
                fields: [
                    {
                        name: 'Dia:',
                        value: `${openDate.toLocaleDateString()}`,
                        inline: false,
                    },
                    {
                        name: 'Inicio:',
                        value: `${openDate.toLocaleTimeString()}`,
                        inline: true,
                    },
                ],
            };

            // {!!!} Acá va la parte en la que se inserta a la base de datos
            bitacora.delete(`${interaction.user.id}`)

            logsChat.send({ content: `\`[${openDate.toLocaleString()}] [ Usuario: ${interaction.user.username} | DiscordId: ${interaction.user.id} ]\` Cerro una bitacora  :red_circle:` })

            interaction.reply({ embeds: [bitCerrada], ephemeral: true }); // Envia una respuesta al usuario
        }
    }
});

client.on('messageCreate', message => {
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
        client.commands.get('insert').execute(message, args, connection);
    }
});


client.login(process.env.BOT_TOKEN);