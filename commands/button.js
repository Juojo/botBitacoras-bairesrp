module.exports = {
    name: 'button',
    description: "",
    execute(message, args, client, MessageActionRow, MessageButton, MessageEmbed){
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