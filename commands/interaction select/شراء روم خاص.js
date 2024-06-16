const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db ,dbTickets ,  settings} = require('../../index');
const { createEmbed  } = require('../../function/function/Embed')
const checkCredits = require('../../function/function/checkCredits')
const Config = require('../../config/prices')

client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;
  
	if (interaction.customId === 'select_Buy') {
	  const selectedValue = interaction.values[0]; 
	 if (selectedValue == 'Buy_Privte_Room'){
        const tax = Math.floor(Config.PrivteRoom.Day7 * (20 / 19) + 1);
        const options = {
            title: `عملية شراء روم خاص 7 ايام`,
            image: null,
            color: settings.لون_الامبيد,
            description: `لأكمال عملية شراء الروم الخاص , يرجي نسخ الكود بالاسفل واتمام عملية التحويل\n\n \`\`\`#credit ${settings.BankID} ${tax}\`\`\``
        };
        
        const embed = createEmbed({
            interaction: interaction,
            title: options.title,
            image: options.image,
            color: options.color,
            description: options.description
        });
        
        await interaction.update({embeds : [embed], components: []})

        const options2 = {
            price: Config.PrivteRoom.Day7 ,
            time: 60000,
            bank: settings.BankID,
            probot: settings.Probot,
        };

        const result = await checkCredits(interaction, options2.price, options2.time, options2.bank, options2.probot);

        if (result.success) {

            const DataTicket = await dbTickets.get(`Tickets_Support`)
            const ExitData = DataTicket?.find((t) => t.Ticket = interaction.channel.id)

            if (ExitData) {
                if (ExitData.Buys == null) {
                    ExitData.Buys = "تم شراء روم خاص 7 ايام";
                }
                await dbTickets.set(`Tickets_Support`, DataTicket);
            }

            const button = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId('PrivteRoomCreate')
                .setLabel(`اضغط هنا لأكمال العملية`)
                .setStyle('PRIMARY')
            )


            await interaction.editReply({
                embeds: [interaction.message.embeds[0].setDescription(`**- تمت عملية الشراء بنجاح ✅\n\n اضغط علي الزر بالاسفل وضع اسم الروم الذي تريده وسيتم انشائه**`)],
                components: [button],
            });


            const Log = await interaction.guild.channels.cache.get(settings.Rooms.LogPrivteRooms)
            if (Log){
                const embed = createEmbed(interaction, `عملية شراء روم خاص ناجحة`, null, options.colorEm, `
- تم عملية شراء روم خاص 7 ايام بنجاح , التفاصيل : 
- الشخص : ${interaction.user}
- السعر : ${Config.PrivteRoom.Day7}
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

 ///////////////
 client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return
     if (interaction.customId == 'PrivteRoomCreate'){

        const PostModal = new Modal()
        .setCustomId('PostModalPrivteRoom')
        .setTitle('اتمام عملية شراء الروم الخاص');
    const NameRoom = new TextInputComponent()
        .setCustomId('NameRoom')
        .setLabel("حابب يكون اسم رومك اي؟")
        .setPlaceholder('اكتب اسم الروم هنا !')
        .setRequired(true)
        .setStyle('SHORT'); 
    const firstActionRow = new MessageActionRow().addComponents(NameRoom);
    PostModal.addComponents(firstActionRow);

    await interaction.showModal(PostModal);

     }
    })


    client.on('interactionCreate', async interaction => {
        if (!interaction.isModalSubmit()) return
        if (interaction.customId == 'PostModalPrivteRoom'){
  
       const NameRoom = interaction.fields.getTextInputValue('NameRoom')

       const Channel = await interaction.guild.channels.create(`♢〢・${NameRoom}`, {
          type : 'GUILD_TEXT', 
          parent : settings.Rooms.CeatogryPrivteRooms , 
          permissionOverwrites : [
            {
                id : interaction.guild.roles.everyone.id , 
                allow : 'VIEW_CHANNEL', 
                deny : 'SEND_MESSAGES'
            }, 
            {
                id : interaction.user.id , 
                allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES'], 
            },   
              
          ],
         rateLimitPerUser : 3600
       })
       const options2 = {
        title: `روم خاص جديد`,
        image: null,
        color: settings.لون_الامبيد,
        description: `
    - صاحب الروم : ${interaction.user}
    
    - وقت الأنشاء : <t:${Math.floor(Date.now() / 1000)}:R>
    - وقت الانتهاء : <t:${Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60)}:R>
    `
    };
    const embed2 = createEmbed({
        interaction: interaction,
        title: options2.title,
        image: options2.image,
        color: options2.color,
        description: options2.description
    });
       const button = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId('PrivteRoomDelete')
        .setLabel(`حذف الروم`)
        .setStyle('DANGER')
    )
       await Channel.send({embeds : [embed2], components : [button]})

       const options = {
        title: `تم اكتمال عملية شراء الروم الخاص بنجاح `,
        image: null,
        color: settings.لون_الامبيد,
        description: `- تمت عملية شرائك لمنشور مميز بنجاح\n- الروم بتاعك جاهز يباشا ✅`
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

    client.on('interactionCreate', async interaction =>{
        if (!interaction.isButton()) return
        if (interaction.customId == 'PrivteRoomDelete'){

     if (!interaction.member.roles.cache.has(settings.Admins.DiscordLeder)) return

     await interaction.reply({content : `**سيتم حذف الروم الخاص بعد قليل | ✅**`, ephemeral : true})


        }
    })