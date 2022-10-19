const Discord = require("discord.js");
const conf = require("../../Settings/Permissions.json")

module.exports = {
  conf: {
    aliases: [],
    name: "rolsuz",
    owner: true,
  },

  run: async (client, message, args, embed) => {
    let alencia = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
    if(args[0] == "ver") {
      alencia.forEach(r => {
    r.roles.add(conf.unregRoles)
    })
    message.channel.send(embed
    .setDescription("Sunucuda rolü olmayan \`"+ alencia.size +"\` kişiye kayıtsız rolü verildi!"))
    } else if(!args[0]) {
    message.channel.send(embed
    .setDescription("Sunucumuzda rolü olmayan \`"+ alencia.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için \`.rolsüz ver\` komutunu uygulayın!"))    
}
  },
};
 