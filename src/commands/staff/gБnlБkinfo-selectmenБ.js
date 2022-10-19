const { MessageEmbed, Client, Message } = require("discord.js");
const Discord = require('discord.js');
const disbut = require("discord-buttons");
const client = global.client;
const { star } = require("../../Settings/emojidb.json")

module.exports = {
    conf: {
        name: 'girişbilgi',
        aliases: ['günlükinfo', 'gi', 'gi', 'günlükinfo'],
        category: 'Admin',
        usage: '',
        permission: 'ADMINISTRATOR',
        guildOnly: true, 
        cooldown: 5,
    },
run: async (client, message, args, durum, kanal) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let age15 = message.guild.members.cache.filter(member => member.displayName.includes('15'));
    let age16 = message.guild.members.cache.filter(member => member.displayName.includes('16'));
    let age17 = message.guild.members.cache.filter(member => member.displayName.includes('17'));
    let age18 = message.guild.members.cache.filter(member => member.displayName.includes('18'));
    let age19 = message.guild.members.cache.filter(member => member.displayName.includes('19'));
    let age20 = message.guild.members.cache.filter(member => member.displayName.includes('20'));
    

    let YasOrtalaması = new disbut.MessageMenuOption()
.setLabel("Yaş Ortalaması")
.setDescription("Sunucumuzun Yaş Ortalaması")
.setValue("YasOrtalaması") 
let GirisCikisOrtalama = new disbut.MessageMenuOption()
.setLabel("Giriş Çıkış Ortalaması")
.setDescription("Sunucuya Kaç Kişi girdi Son 1 ay ve devamı!")
.setValue("GirisCikisOrtalama")

let kısayollar = new disbut.MessageMenu();
kısayollar.setID("kısayollar");
kısayollar.setPlaceholder(`Komutlar hakkında yardım almak için tıkla!`)

kısayollar.addOptions(YasOrtalaması,GirisCikisOrtalama);    


message.channel.send(`${star} Sunucumuzun Günlük İnfosu Bulunmaktadır Yani Sunucuya Giriş Çıkış Ve Yaş Ortalamaları Bulunmaktadır 
Bunları Görmek için aşagıdaki menüden seçerek bulabilirsiniz!
`, kısayollar);



client.on("clickMenu", async (menu) => {
if (menu.values[0] === "YasOrtalaması") {
await menu.reply.think(true)
const asd1 = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setDescription(`${star} Sunucumuzun Yaş Ortalaması Aşagıda Bulunmaktadır Net Bir Şekilde Veriler verilmiştir dikkatli okuyunuz iyi günler`)
.addFields(
  { name: "Sunucudaki yaş ortalaması;",  value: `
\`\`\`diff
- Sunucuda  15'da olan toplam ${age15.size} kişi bulunuyor
- Sunucuda  16'da olan toplam ${age16.size} kişi bulunuyor
- Sunucuda  17'da olan toplam ${age17.size} kişi bulunuyor
- Sunucuda  18'da olan toplam ${age18.size} kişi bulunuyor
- Sunucuda  19'da olan toplam ${age19.size} kişi bulunuyor
- Sunucuda  20'da olan toplam ${age20.size} kişi bulunuyor

\`\`\`
`, inline: true }
)       
await menu.reply.edit(asd1,true)         
};
if (menu.values[0] === "GirisCikisOrtalama") {
await menu.reply.think(true)
const asd1 = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(message.guild.name, message.guild.iconURL({ dynamic: true }))
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setDescription(`${star} Sunucudaki tüm giriş ortalaması burada dikkatlice bakınız Bütün Netleri Aşagıda İyi günler`)
.addFields(
  { name: "Sunucudaki Giriş Ortalaması;",  value: `
\`\`\`diff
- son \`1 saatte\` toplam ${message.guild.members.cache.filter(member => (Date.now() - member.joinedTimestamp) < 3600000).size} üye giriş yaptı
- son \`1 günde\` toplam ${message.guild.members.cache.filter(member => (Date.now() - member.joinedTimestamp) < 86400000).size} üye giriş yaptı
- son \`1 haftada\` toplam ${message.guild.members.cache.filter(member => (Date.now() - member.joinedTimestamp) < 604800000).size} üye giriş yaptı
- son \`1 ayda\` toplam ${message.guild.members.cache.filter(member => (Date.now() - member.joinedTimestamp) < 2592200000).size} üye giriş yaptı

\`\`\`
`, inline: true }
)        
await menu.reply.edit(asd1,true)

};
        })
    }
}