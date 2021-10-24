module.exports = {
    name: 'button',
    description: "",
    execute(message, args, client, MessageActionRow, MessageButton){
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('open')
                    .setLabel('Abrir')
                    .setStyle('SUCCESS')
                    .setDisabled(false),

                    new MessageButton()
                    .setCustomId('close')
                    .setLabel('Cerrar')
                    .setStyle('DANGER')
                    .setDisabled(false),
            );

        message.channel.send({ content: 'String.', components: [row] })

        client.on('interactionCreate', interaction => {
            if (!interaction.isButton()) return;

            let openDate = new Date();
            if (interaction.customId === 'open') {
                console.log(`${interaction.user.username} (ds ID: ${interaction.user.id}) abrio un bitacora el dia ${openDate.toLocaleString()}`);
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