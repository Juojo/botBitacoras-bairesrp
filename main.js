const {Client, Intents, Collection, MessageEmbed} = require('discord.js');

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
] });

const prefix = '!'; // prefijo que se requiere para cada comando

const fs = require('fs');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); // vincula la carpeta "commands" y SOLO leé los archivos terminados en '.js'
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
};

client.once('ready', () => {
    console.log("Bot bitacoras it's on!")
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return; // no responde a mensajes que no empiezen con el prefijo

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') { // si el usuario escribe esto
        client.commands.get('ping').execute(message, args); // llama y ejecuta al comando "ping" de la carpeta "commands"
    }
});


client.login('ODk5ODUzMDA3NzQ1ODcxOTIy.YW4zaw.ONZ6smbUcx8xNfCy8s6OBm7Ek2w'); // token del bot