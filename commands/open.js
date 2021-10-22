module.exports = {
    name: 'open',
    description: "Abre bitacora",
    execute(message, args, client, MessageActionRow, MessageSelectMenu){
    
        if(message.member.roles.cache.has('899865248054509679')){
            const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Nothing selected')
					.addOptions([
						{
							label: 'Abrir bitacora',
							description: 'Siempre que entres en servicio hace click acá',
							value: 'Abre',
						},
						{
							label: 'Cerrar bitacora',
							description: 'Cuando salgas de servicio no te olvides de cerrar tu bitacora',
							value: 'Cierra',
						},
					]),
			);

		    message.channel.send({ content: 'Selecciona una opcion.', components: [row] });

            client.on('interactionCreate', interaction => {
                if (interaction.isSelectMenu()){
                    
					if(interaction.values[0] === 'Abre') {
						message.channel.send({ content: 'Se abrio una bitacora!' })
					} else if(interaction.values[0] === 'Cierra') {
						message.channel.send({ content: 'Se cerro la bitacora.' })
					}
					console.log(interaction.get('createdTimestamp'));
					let dateObject = new Date(interaction.createdTimestamp[0] * 1000);

					message.channel.send({ content: dateObject.toLocaleString() })
                }
                
            });
        }
    }
}