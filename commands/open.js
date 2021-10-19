module.exports = {
    name: 'open',
    description: "Abre bitacora",
    execute(message, args, client){
        const bitChannel = client.channels.cache.get('870094988837548082')

        if(message.member.roles.cache.has('899865248054509679') && message.author.bitChannel){
            message.reply({ content: 'LOL' });
        }
    }
}