module.exports = {
    name: 'button',
    description: "",
    execute(message, args, client, MessageActionRow, MessageButton, MessageEmbed){
        // const bitacora = new Map();
        // const logsChat = client.channels.cache.get('899866780741296138')

        //console.log(bitacora)

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

                new MessageButton()
                    .setCustomId('status')
                    .setLabel('Estado de mis bitacoras')
                    .setStyle('SECONDARY'),
            );

        const introEmbed = new MessageEmbed()
                .setColor('#187bcd')
                .setTitle('Bitácoras de la PFA')
                .setDescription('Esto que estás viendo es el lugar donde se abren y cierran tus bitácoras. Es obligatorio que siempre que entres a rolear de policía abras una y luego cuando termines la cierres.')
                .addFields(
                    { name: '¿Por qué son importantes las bitácoras?', value: 'Son importantes ya que toman registro de tu tiempo de juego y nos ayudan a ver quienes son activos y cumplen el mínimo de horas semanales. Esto se tiene en cuenta a la hora de subir de rango.', inline: true },
                    { name: '¿Qué pasa si no puedo rolear por un tiempo?', value: 'No hay problema! pero te pedimos que nos avises con un mensaje en el canal <#835118115343695882> indicando desde cuando y hasta que dia vas a estar inactivo.', inline: true },
                );
        
        const helpEmbed = new MessageEmbed()
                    .setColor('#187bcd')
                    .addFields(
                        { name: '¿Cómo funciona el bot?', value: '・Si queres **abrir** una bitácora tenes que hacer click sobre el botón que dice *"Abrir"*, esto resultará en una respuesta indicando si se abrió correctamente.' },
                        { name: '\u200b', value: '・Para **cerrarla** es muy similar solo que esta vez es haciendo click en el botón de *"Cerrar"*, el bot también te notificará si la acción se concreta.' },
                    );

        message.channel.send({ embeds: [introEmbed, helpEmbed], components: [row] })


        // client.on('interactionCreate', async interaction => {
        //     if (!interaction.isButton()) return;
        //     let user = interaction.user.id
        //     let openDate = new Date();

        //     // OPEN =>
        //     if (interaction.customId === 'open') {
        //         //console.log(bitacora.has(user))
        //         if( bitacora.has(user) === true ) {
        //             interaction.reply({ content: 'Ya tenes abierta una bitacora', ephemeral: true })
        //         } else {
        //             const bitAbierta = {
        //                 color: 0x3BA55D,
        //                 title: 'Bitacora abierta correctamente <a:tick:902695712163246150>',
        //                 fields: [
        //                     {
        //                         name: 'Dia:',
        //                         value: `${openDate.toLocaleDateString()}`,
        //                         inline: false,
        //                     },
        //                     {
        //                         name: 'Inicio:',
        //                         value: `${openDate.toLocaleTimeString()}`,
        //                         inline: true,
        //                     },
        //                 ],
        //             };
    
        //             bitacora.set(
        //                 `${interaction.user.id}`, {
        //                     username: `${interaction.user.username}`,
        //                     dsId: `${interaction.user.id}`,
        //                     openDate: `${openDate.toLocaleString()}`
        //                     }
        //                 )
    
        //             //console.log(`${interaction.user.username} (ds ID: ${interaction.user.id}) abrio un bitacora el dia ${openDate.toLocaleString()}`); // Informa la accion via consola
        //             logsChat.send({ content: `\`[${openDate.toLocaleString()}] [ Usuario: ${interaction.user.username} | DiscordId: ${interaction.user.id} ]\` Abrio una bitacora  :green_circle:` }) // Informa la accion via #bitacora-logs
        //             //console.log(bitacora);
        //             //console.log(bitacora.get(user))
    
        //             interaction.reply({ embeds: [bitAbierta], ephemeral: true }); // Envia una respuesta al usuario
                    
        //         }

        //     // CLOSE =>
        //     } else if (interaction.customId === 'close') {
        //         if( bitacora.has(user) === false ) {
        //             interaction.reply({ content: 'Tenes que abrir una bitacora antes', ephemeral: true })
        //         } else {
        //             const bitCerrada = {
        //                 color: 0xed4245,
        //                 title: 'Bitacora cerrada correctamente',
        //                 fields: [
        //                     {
        //                         name: 'Dia:',
        //                         value: `${openDate.toLocaleDateString()}`,
        //                         inline: false,
        //                     },
        //                     {
        //                         name: 'Inicio:',
        //                         value: `${openDate.toLocaleTimeString()}`,
        //                         inline: true,
        //                     },
        //                 ],
        //             };

        //             // {!!!} Acá va la parte en la que se inserta a la base de datos
        //             bitacora.delete(`${interaction.user.id}`)

        //             //console.log(`${interaction.user.username} (ds ID: ${interaction.user.id}) cerro un bitacora el dia ${openDate.toLocaleString()}`);
        //             logsChat.send({ content: `\`[${openDate.toLocaleString()}] [ Usuario: ${interaction.user.username} | DiscordId: ${interaction.user.id} ]\` Cerro una bitacora  :red_circle:` })
        //             //console.log(bitacora);

        //             interaction.reply({ embeds: [bitCerrada], ephemeral: true }); // Envia una respuesta al usuario
        //         }
        //     }
        // });
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