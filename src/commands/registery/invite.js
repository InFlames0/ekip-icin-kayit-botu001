const {  voice, mesaj2, star, green } = require("../../Settings/emojidb.json");
const moment = require("moment");
const inviterSchema = require("../../KayitData/inviter");
const db = require("../../KayitData/inviter");
const inviteMemberSchema = require("../../KayitData/inviteMember");
require("moment-duration-format");
const { MessageEmbed } = require("discord.js");
const { MessageButton,MessageActionRow } = require('discord-buttons');
const conf = require("../../Settings/Guild.json")
module.exports = {
    conf: {
      aliases: ["invite","inv","in"],
      name: "invite",
      help: "invite"
    },
  
run: async (client, message, args, embed, prefix) => {



      
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;
    const invMember = await inviteMemberSchema.find({ guildID: message.guild.id, inviter: member.user.id });
    const daily = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24).size : 0;
    const weekly = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && Date.now() - m.joinedTimestamp < 1000 * 60 * 60 * 24 * 7).size : 0;
    let tagged;
    if (conf.tag && conf.tag.length > 0) tagged = invMember ? message.guild.members.cache.filter((m) => invMember.some((x) => x.userID === m.user.id) && m.user.username.includes(conf.tag)).size : 0;
    else tagged = 0;

    let data = await db.find({ guildID: message.guild.id }).sort({ total: -1 });
    if (!data.length)return message.channel.send(embed.setDescription("Herhangi bir invite verisi bulunamadı!"));
    let arr = [];
    data.forEach((x) => arr.push({ id: x.userID, total: x.total }));
    let index = arr.findIndex((x) => x.id == message.author.id) + 1;

    let list = data
      .filter((x) => message.guild.members.cache.has(x.userID))
      .splice(0, 10)
      .map((x, index) => `${x.userID === message.author.id ? `**${index + 1}. <@${x.userID}> - Toplam ${x.total} davet (${x.regular} gerçek, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} ayrılmış)**` : `**${index + 1}.** <@${x.userID}> - Toplam **${x.total}** davet \`(${x.regular} gerçek, ${x.bonus} bonus, ${x.fake} fake, ${x.leave} ayrılmış)\``}`)
      .join("\n");

      var invite = new MessageButton()
      .setID("invite")
      .setLabel("İnvite")
      .setStyle("green")

      var invitop = new MessageButton()
      .setID("invitop")
      .setLabel("İnvite Top")
      .setStyle("green")

      var kapat = new MessageButton()
      .setID("kapat")
      .setLabel("Kapat")
      .setStyle("red")

      const row = new MessageActionRow()
      .addComponent(invite)
      .addComponent(invitop)
      .addComponent(kapat);

      embed .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
      .setColor("RANDOM")
      .setThumbnail(member.user.avatarURL({ dynamic: true, size: 2048 }))
      .setDescription(`
${star} İnvite: \`(${regular} gerçek, ${bonus} bonus, ${leave} ayrılmış, ${fake} fake)\` 

${star} Günlük: (\`${daily}\`)
${star} Haftalık: (\`${weekly}\`)

${star} Toplam (**${total}**) davet.
      `);



      let msg = await message.channel.send({ buttons : [ invite, invitop,kapat], embed: embed})
      var filter = (button) => button.clicker.user.id === message.author.id;
     
      let collector = await msg.createButtonCollector(filter, { time: 99999999 })
collector.on("collect", async (button) => {
if(button.id === "invite") {
await button.reply.defer()
const embed = new MessageEmbed()
.setColor("RANDOM")
.setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
.setThumbnail(member.user.avatarURL({ dynamic: true, size: 2048 }))
.setDescription(`
${star} İnvite: \`(${regular} gerçek, ${bonus} bonus, ${leave} ayrılmış, ${fake} fake)\` 

${star} Günlük: (\`${daily}\`)
${star} Haftalık: (\`${weekly}\`)

${star} Toplam (**${total}**) davet.
`);



msg.edit({
embed: embed,
components : row
})}
if(button.id === "invitop") {
await button.reply.defer()
const embeds = new MessageEmbed()
if (index < 10) {
    embeds.setColor("RANDOM")
    embeds.setTitle("Invite Sıralaması");
    embeds.setDescription(list);
  } else {
    embeds.setColor("RANDOM")
    embeds.setTitle("Invite Sıralaması");
    embeds.setDescription( `${list} \n... \n**${index}. ${message.author} Toplam ${veri.total} davet (${veri.regular} gerçek, ${veri.bonus} bonus, ${veri.fake} fake, ${veri.leave} ayrılmış)**`);
  }
msg.edit({
embed: embeds,
components : row
})}
if(button.id === "kapat") {
    msg.edit(`**${green} Başarılı :**Başarılı bir şekilde kapatıldı.`,{components: null}).then(x=> x.delete({timeout: 5000 , react: true })); 
}
})
},
};  
  
