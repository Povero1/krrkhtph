const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , settings} = require('../../index');
const { createEmbed  } = require('../../function/function/Embed');


client.on('messageCreate', async msg => {
  if (msg.author.bot) return
  if (msg.content == settings.prefix + `helper`){
    if (!msg.member.roles.cache.has(settings.Admins.DiscordStaff)) return

    const embed = createEmbed({
       interaction : msg , 
       title : 'مساعد الادارة الذكي', 
       description : `ازيك ي ${msg.author} , ازاي اقدر اساعدك ؟`, 
    })

    const row = new MessageActionRow()
    .addComponents(
      new MessageSelectMenu()
      .setCustomId('RedBull_Helber')
      .setPlaceholder(`${msg.author.displayName} محتاج مساعدة ؟`)
      .addOptions([
        {
        label: 'فحص تكت',
        value: 'فحص تكت',
        }, 
        {
        label: 'فحص تحذير',
        value: 'فحص تحذير',
        },
        {
         label: 'فحص بوست',
         value: 'فحص بوست',
        },
       

      ]),
    );
    const but = new MessageActionRow().addComponents(
      new MessageButton()
          .setCustomId('CancelButton')
          .setLabel('الغاء العملية ؟')
          .setStyle('DANGER')
  )
    await msg.reply({embeds : [embed], components : [row,but]})

  }
})
