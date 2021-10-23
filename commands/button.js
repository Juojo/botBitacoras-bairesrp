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
            );

        message.channel.send({ content: 'String.', components: [row] })

        client.on('interactionCreate', interaction => {
            if (!interaction.isButton()) return;
            console.log(`${interaction.user.username} (ds ID: ${interaction.user.id}) abrio un bitacora`);
            
            let openDate = new Date();
            console.log(openDate.toLocaleString());

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
*/