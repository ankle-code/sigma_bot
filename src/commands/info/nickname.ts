import { Command } from "../../structures/Command";

export default new Command({
    name: "nickname",
    description: "Faz com que o nick de usário seja alterado automaticamente",
    options: [
        {
            name: 'user',
            type: 'STRING',
            description: 'Usuário a ter o nick alterado',
        },
        {
            name: 'nick',
            type: 'STRING',
            description: 'Nick a ser colocado no usuário',
        },
    ],
    run: async ({ client, interaction }) => {
       const guild = client.guilds.cache.get('942417133911023666');
       const memberId = interaction.options.get('user').value as string
       const member = memberId && guild.members.fetch(memberId.replace(/\D/g, ""))
       ;(await member).setNickname(interaction.options.get('nick').value as string)

       const listener = () => async update => {
        const onChangeUser = update.user.id
        if(onChangeUser === memberId.replace(/\D/g, "")){
         ;(await member).setNickname(interaction.options.get('nick').value as string)
        }
    }

       if(interaction.options.get('nick').value as string === 'stop'){
           client.removeAllListeners()
       }
       
       else {
           client.on('guildMemberUpdate', listener())
       }
    }
});
