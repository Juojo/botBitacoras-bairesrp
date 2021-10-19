module.exports = {
    name: 'clear',
    description: "Borra mensajes (dev propouse only)",
    async execute(message, args, client, MessageEmbed){
        if(message.member.permissions.has('MANAGE_MESSAGES')){
            if(!args[0]) return message.reply({ content: 'Agrega el numero de mensajes que queres borrar.'});
            if(isNaN(args[0])) return message.reply({ content: 'El valor debe ser numerico.'});

            if(args[0] > 99) return message.reply({ content: 'No puedo borrar más de 99 mensajes!'});
            if(args[0] < 1) return message.reply({ contnet: 'Deberias borrar un mensaje al menos.'});
        
            await message.channel.messages.fetch({limit: ++args[0]}).then(messages =>{
                message.channel.bulkDelete(messages, true);
            
            if (messages.size == 1) {
                message.channel.send({ content: `No hay mensajes que se puedan borrar` })
            } 
        })}
        else {
            message.reply({ content: 'Necesitas el permiso *`MANAGE_MESSAGES`* para ejecutar este comando.'})
        }
    }
}