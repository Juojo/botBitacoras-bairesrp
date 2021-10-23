const {Client, Intents, Collection, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageButton} = require('discord.js');

const client = new Client({ intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
] });

const prefix = '!';

const fs = require('fs');

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
};

client.once('ready', () => {
    console.log("Bot bitacoras it's online!")
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
        client.commands.get('open').execute(message, args, client, MessageActionRow, MessageSelectMenu);
    } else if (command === 'button') {
        client.commands.get('button').execute(message, args, client, MessageActionRow, MessageButton);
    }
});


client.login('ODk5ODUzMDA3NzQ1ODcxOTIy.YW4zaw.ONZ6smbUcx8xNfCy8s6OBm7Ek2w');