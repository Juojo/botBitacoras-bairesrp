module.exports = {
    name: 'button',
    description: "",
    execute(message, args, client, MessageActionRow, MessageButton, MessageEmbed){
        const bitacora = new Map();
        const logsChat = client.channels.cache.get('899866780741296138')

        console.log(bitacora)

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('open')
                    .setLabel('Abrir')
                    .setStyle('SUCCESS'),

                new MessageButton()
                    .setCustomId('close')
                    .setLabel('Cerrar')
                    .setStyle('DANGER'),
            );
        message.channel.send({ content: 'String.', components: [row] })


        client.on('interactionCreate', async interaction => {
            if (!interaction.isButton()) return;
            let user = interaction.user.id
            let openDate = new Date();

            // OPEN =>
            if (interaction.customId === 'open') {
                //console.log(bitacora.has(user))
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
    
                    //console.log(`${interaction.user.username} (ds ID: ${interaction.user.id}) abrio un bitacora el dia ${openDate.toLocaleString()}`); // Informa la accion via consola
                    logsChat.send({ content: `\`[${openDate.toLocaleString()}] [ Usuario: ${interaction.user.username} | DiscordId: ${interaction.user.id} ]\` Abrio una bitacora  :green_circle:` }) // Informa la accion via #bitacora-logs
                    //console.log(bitacora);
                    //console.log(bitacora.get(user))
    
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

                    //console.log(`${interaction.user.username} (ds ID: ${interaction.user.id}) cerro un bitacora el dia ${openDate.toLocaleString()}`);
                    logsChat.send({ content: `\`[${openDate.toLocaleString()}] [ Usuario: ${interaction.user.username} | DiscordId: ${interaction.user.id} ]\` Cerro una bitacora  :red_circle:` })
                    //console.log(bitacora);

                    interaction.reply({ embeds: [bitCerrada], ephemeral: true }); // Envia una respuesta al usuario
                }
            }
        });
    }
}

/*
Date del mensaje:
    let dateObject = new Date(interaction.message.createdTimestamp);   
    console.log(dateObject.toLocaleString())

Date cuando haces click:
    let date = new Date();
    console.log(date.toLocaleString());

Colores:
    PRIMARY, a blurple button;
    SECONDARY, a grey button;
    SUCCESS, a green button;
    DANGER, a red button;
    LINK, a button that navigates to a URL.
*/