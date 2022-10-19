const { MessageEmbed, Client, Message } = require("discord.js");
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const client = global.client;
const { star } = require("../../Settings/emojidb.json")

module.exports = {
    conf: {
      aliases: ["yardım","help"],
      name: "yardım",
      help: "yardım"
},
run: async (client, message, args, durum, kanal) => {
let AdminKomutları = new disbut.MessageMenuOption()
.setLabel("Admin Komutları")
.setDescription("Admin Komutlarını Göstermektedir!")
.setValue("AdminKomutları") 
let YetkiliKomutları = new disbut.MessageMenuOption()
.setLabel("Yetkili Komutları")
.setDescription("Yetkili Komutlarını Göstermektedir!")
.setValue("YetkiliKomutları")
let GuildKomutları = new disbut.MessageMenuOption()
.setLabel("Sunucu Komutları")
.setDescription("Sunucu Komutlarını Göstermektedir!")
.setValue("GuildKomutları")
let StaffKomutları = new disbut.MessageMenuOption()
.setLabel("Kurucu Komutları")
.setDescription("Kurucu Komutlarını Göstermektedir!")
.setValue("StaffKomutları")
let kısayollar = new disbut.MessageMenu();
kısayollar.setID("kısayollar");
kısayollar.setPlaceholder(`Komutlar hakkında yardım almak için tıkla!`)

kısayollar.addOptions(AdminKomutları,YetkiliKomutları,GuildKomutları,StaffKomutları);    


message.channel.send(`${star} **Kayıt Botunun Yardım Menüsüne Hoşgeldiniz Lütfen Botun Komutları İle Uğraşmayınız**
***Botta Olan Komutların Hepsi Bulunmaktadır Dikatlli Bakınız Botun Neler Var Menüde,***

${star}**Admin Komutları : \`Sunucumuzun En Üst Yetkilisi Olan Admin Komutlarıdır!\`**
${star}**Yetkili Komutları : \`Sunucumuzun Yetkili Komutlarıdır Normal Komutlar!\`**
${star}**Staff Komutları : \`Kurucu Komutları Bulunmaktadır!\`**
${star}**Guild Komutları : \`Sunucu Komutları Bulunmaktadır\`**

**Not : \`Lütfen Admin, Staff , Yetkili Komutlarını Kullanmayınız...\`**
`, kısayollar);



client.on("clickMenu", async (menu) => {
if (menu.values[0] === "AdminKomutları") {
await menu.reply.think(true)
const asd1 = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setDescription(`
**- alencia-emojikur**
**- eval**
**- isim-reset/sf (@alencia/ID)**
**- ping**
**- restart (Bot Sahibi Yapabilir)**
**- rolsüz ver**
**- taglı-alım (aç/kapat)**
`)         
await menu.reply.edit(asd1,true)         
};
if (menu.values[0] === "YetkiliKomutları") {
await menu.reply.think(true)
const asd1 = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setDescription(`
**- kayıt (@alencia/ID)**
**- isim (@alencia/ID)**
**- kayitsiz**
**- bağlantı-kes**
`)         
await menu.reply.edit(asd1,true)

};
if (menu.values[0] === "GuildKomutları") {
await menu.reply.think(true)
const asd1 = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setDescription(`
**  - yardım**
**  - reg-yetkili-say**
**  - say**
**   - vip**
`)         
await menu.reply.edit(asd1,true)                
};
if (menu.values[0] === "StaffKomutları") {
await menu.reply.think(true)
const asd1 = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setDescription(`
**  - günlük-info**
** - isimler (@alencia/ID)**
** - teyit-stat**
**     - vip**
`)         
await menu.reply.edit(asd1,true)
                        
};
        })
    }
}