module.exports = {
    name: 'ping',
    description: "comando para verificar la respuesta del bot",
    execute(message, args){
        message.channel.send({ content: 'pong!'});
    }
}