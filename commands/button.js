module.exports = {
    name: 'button',
    description: "",
    execute(message, args, client, MessageActionRow, MessageButton, MessageEmbed){
        let varDisabled = true;

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('open')
                    .setLabel('Abrir')
                    .setStyle('SUCCESS')
                    .setDisabled(!varDisabled),

                new MessageButton()
                    .setCustomId('close')
                    .setLabel('Cerrar')
                    .setStyle('DANGER')
                    .setDisabled(varDisabled),
            );

        message.channel.send({ content: 'String.', components: [row] })

        client.on('interactionCreate', interaction => {
            if (!interaction.isButton()) return;

            // const myEmbed = new MessageEmbed()
            //     .setColor('#3BA55D')
            //     .setTitle('Bitacora abierta correctamente');

            let openDate = new Date();
            if (interaction.customId === 'open') {

                    const myEmbed = {
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

                console.log(`${interaction.user.username} (ds ID: ${interaction.user.id}) abrio un bitacora el dia ${openDate.toLocaleString()}`);
                interaction.reply({ embeds: [myEmbed], ephemeral: true });
                //wait(3000);
                
            } else if (interaction.customId === 'close') {
                console.log(`${interaction.user.username} (ds ID: ${interaction.user.id}) cerro un bitacora el dia ${openDate.toLocaleString()}`);
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