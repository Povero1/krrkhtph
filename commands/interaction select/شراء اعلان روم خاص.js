const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db ,dbTickets ,  settings} = require('../../index');
const { createEmbed  } = require('../../function/function/Embed')
const checkCredits = require('../../function/function/checkCredits')
const Config = require('../../config/prices')


client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;
  
    if (interaction.customId === 'select_Buy') {
        const selectedValue = interaction.values[0];
        if (selectedValue == 'Buy_Ads_Room') {
            const but = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('CancelButton')
                    .setLabel('الغاء العملية ؟')
                    .setStyle('DANGER')
            )

          
            const tax = Math.floor(Config.ads.privteRoom * (20 / 19) + 1);

            const options = {
                title: 'عملية شراء اعلان روم خاص ايفري',
                image: null,
                color: settings.لون_الامبيد,
                description: `لأكمال عملية شراء الاعلان , يرجي نسخ الكود بالاسفل واتمام عملية التحويل\n\n \`\`\`#credit ${settings.BankID} ${tax}\`\`\``
            };
            
            const embed = createEmbed({
                interaction: interaction,
                title: options.title,
                image: options.image,
                color: options.color,
                description: options.description
            });
            

            await interaction.update({embeds : [embed], components: [but]})

            const options2 = {
                price: Config.ads.privteRoom  ,
                time: 60000,
                bank: settings.BankID,
                probot: settings.Probot,
            };

            const result = await checkCredits(interaction, options2.price, options2.time, options2.bank, options2.probot);

            if (result.success) {
                const DataTicket = await dbTickets.get(`Tickets_Support`);
                const ExitData = DataTicket?.find((t) => t.Ticket === interaction.channel.id);
                if (ExitData) {
                    if (ExitData.Buys == null) {
                        ExitData.Buys = "تم شراء اعلان روم خاص ايفري";
                    }
                    await dbTickets.set(`Tickets_Support`, DataTicket);
                }

                const button = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId('AdsPrivteroom')
                    .setLabel(`اضغط هنا لنشر اعلانك`)
                    .setStyle('PRIMARY')
                )


                await interaction.editReply({
                    embeds: [interaction.message.embeds[0].setDescription(`**- تمت عملية الشراء بنجاح ✅\n\n اضغط علي الزر بالاسفل وضع اعلانك لكي يتم نشره**`)],
                    components: [button],
                });


                const Log = await interaction.guild.channels.cache.get(settings.Rooms.LogPosts)
                if (Log){
                    const embed = createEmbed(interaction, `عملية شراء اعلان ناجحة`, null, options.colorEm, `
- تم عملية شراء اعلان روم خاص منشن ايفري بنجاح , التفاصيل : 
- الشخص : ${interaction.user}
- السعر : ${Config.ads.privteRoom}
- الوقت : <t:${Math.floor(Date.now() / 1000)}:R>
`);
                    await Log.send({embeds : [embed]})
                }

            } else {
                await interaction.editReply({
                    embeds: [interaction.message.embeds[0].setDescription(`لقد انتهى الوقت، لا تقم بالتحويل ${interaction.user}`)],
                    components: [],
                });   

            }
        }
    }
});



///// زر منشن هير  
client.on('interactionCreate', async interaction => {
   if (!interaction.isButton()) return
 if (interaction.customId == 'AdsPrivteroom'){

    const PostModal = new Modal()
    .setCustomId('adsModalEveryPrivteRoom')
    .setTitle('اتمام عملية نشر منشورك');
const ThePost = new TextInputComponent()
    .setCustomId('ThePost')
    .setLabel("ما هو اعلانك ؟")
    .setPlaceholder('قم بوضع اعلانك دون وضع المنشن !')
    .setRequired(true)
    .setStyle('PARAGRAPH'); 

    const NamePrivteRoom = new TextInputComponent()
    .setCustomId('NamePrivteRoom')
    .setLabel("ما هو اسم الروم الخاص الذي تريده ؟")
    .setPlaceholder('قم بوضع اسم الروم  !')
    .setRequired(true)
    .setStyle('PARAGRAPH'); 

const firstActionRow = new MessageActionRow().addComponents(ThePost);
const firstActionRow2= new MessageActionRow().addComponents(NamePrivteRoom);

PostModal.addComponents(firstActionRow, firstActionRow2);

await interaction.showModal(PostModal);

  }
})




client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return
    if (interaction.customId == 'adsModalEveryPrivteRoom'){
        const ThePost = interaction.fields.getTextInputValue('ThePost')
        const NamePrivteRoom = interaction.fields.getTextInputValue('NamePrivteRoom')

        const ChannelAds = await interaction.guild.channels.create(NamePrivteRoom, {
            type : 'GUILD_TEXT', 
            parent : settings.Rooms.CeatogryPrivteRooms , 
            permissionOverwrites : [
                {
                    id : interaction.guild.roles.everyone.id , 
                    deny : ['SEND_MESSAGES' , 'MANAGE_CHANNELS']
                }

            ]
        })
        await ChannelAds.send({content : `${ThePost}\n@everyone`})
        await ChannelAds.send(`-start ${ChannelAds} 3d 3 300k`)
        setTimeout(() => {
            ChannelAds.send({content : `**الاعلان دا مدفوع ونخلي مسؤليتنا من اي شي يصير بينكم**`})
            ChannelAds.send({ files : [settings.ServerInfo.line]})
        }, 2000);
        const options = {
            title: 'تم اكتمال عملية شراء اعلانك',
            image: null,
            color: settings.لون_الامبيد,
            description: `- تمت عملية شرائك لأعلان ايفري بنجاح\n- اعلانك نزل في رومك الخاص ${ChannelAds} ✅`
        };
        
        const embed = createEmbed({
            interaction: interaction,
            title: options.title,
            image: options.image,
            color: options.color,
            description: options.description
        });
        
        await interaction.update({embeds : [embed], components: []})
    }
})