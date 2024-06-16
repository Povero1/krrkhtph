const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , settings} = require('../../index');

client.on('messageCreate', message => {
    if (message.content == settings.prefix + 'setup-ticket'){
        if (!settings.Owners.includes(message.author.id)) return 

        const Emmed = new MessageEmbed()
        .setColor(settings.لون_الامبيد)
        .setAuthor(message.guild.name , message.guild.iconURL({dynamic : true}))
        .setFooter(message.guild.name , message.guild.iconURL({dynamic : true}))
        .setThumbnail( message.guild.iconURL({dynamic : true}))
        .setImage('https://media.discordapp.net/attachments/1207553954515255327/1207598850710183936/18.png?ex=65e03b12&is=65cdc612&hm=6e8f4bf5c803316aa65173a5e118f19496dfcf35e0e5f57bd597e1d57d9e6be0&=&format=webp&quality=lossless&width=1919&height=599')
        .setDescription(`**اذا عندك سؤال , عايز تشتري رتبة / اعلان / منشور مميز الخ.. اختار الدعم الفني
اذا حد نصبك اختار طلب مشهر
اذا عندك شكوى على حد من طاقم الادارة اختار شكاوي على طاقم الادارة
        
ملاحظات :
        
تفتح شكوى و تكون على حد مش من طاقم الادارة = مخالفة
استهبال بالتكتات = مخالفة
تفتح تكت ملهاش علاقة بالي عايزه , مثال : تفتح شكوى و عايز تشتري رتبة = مخالفة
        
المخالفة تختلف حسب الغلطة الي سويتها**`)

const row = new MessageActionRow()
.addComponents(
  new MessageSelectMenu()
  .setCustomId('open_Ticket')
  .setPlaceholder('حابب تفتح تكت ؟')
  .addOptions([
    {
    label: 'الدعم الفني',
    value: 'TicketSupport',
    }, 
    {
     label: 'طلب قاضي',
     value: 'TicketTashher',
    }, 
    
  ]),
);

message.channel.send({embeds : [Emmed], components : [row]})


    }
})

