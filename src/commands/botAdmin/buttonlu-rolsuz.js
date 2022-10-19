
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');
const conf = require("../../Settings/Permissions.json")
module.exports = {
    conf: {
      aliases: ["rolsüzver","rolsüzver"],
      name: "rolsüzver",
      help: "rolsüzver"
    },
  
run: async (client, message, args, embed, prefix) => {
    let alencia = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

      var sescat = new MessageButton()
      .setID("ses")
      .setLabel("Rolsüz Ver")
      .setStyle("gray")

      const row = new MessageActionRow()
      .addComponent(sescat)


      embed.setDescription("Sunucumuzda rolü olmayan \`"+ alencia.size +"\` kişi var. Bu kişilere kayıtsız rolü vermek için aşagıdaki buttonu tıkalyarak rol verebilirsiniz!")
      

      let msg = await message.channel.send({ buttons : [sescat], embed: embed})
      var filter = (button) => button.clicker.user.id === message.author.id;
     
      let collector = await msg.createButtonCollector(filter, { time: 5000 , Disabled: true })
collector.on("collect", async (button) => {
if(button.id === "ses") {
await button.reply.defer()
const embeds = new MessageEmbed()

alencia.forEach(r => {
    r.roles.add(conf.unregRoles)
    })
    message.channel.send(embed
        .setDescription("Sunucuda rolü olmayan \`"+ alencia.size +"\` kişiye kayıtsız rolü verildi!"))
  
  
        .then(x=> x.delete({timeout: 2000})) 
}
})
},
};
  