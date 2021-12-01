module.exports = {
    name: 'ping',
    description: "comando para verificar la respuesta del bot",
    async execute(message, args, connection){
        
        try {
            await connection.query(
                `INSERT INTO bitacora (discordId, username) VALUES('${user.id}', '${user.username}')`
            );
        } catch(err) {
            console.log(err);
        }

        message.channel.send({ content: 'Insert cargado.' })
    }
}