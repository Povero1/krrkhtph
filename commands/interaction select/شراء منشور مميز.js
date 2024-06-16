const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db ,dbTickets ,  settings} = require('../../index');
const { createEmbed  } = require('../../function/function/Embed')
const checkCredits = require('../../function/function/checkCredits')
const Config = require('../../config/prices')
client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;
  
    if (interaction.customId === 'select_Buy') {
        const selectedValue = interaction.values[0];
  
        if (selectedValue == 'Buy_Post') {
            const but = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId('CancelButton')
                    .setLabel('الغاء العملية ؟')
                    .setStyle('DANGER')
            )

            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('PostsBuy')
                        .setPlaceholder(`اختار نوع المنشن الي عاوزة  ${interaction.user.displayName}`)
                        .addOptions([
                            {
                                label: `منشن هير`,
                                value: 'MentionHerePost',
                            },
                            {
                                label: `منشن ايفري`,
                                value: 'MentionEveryPost',
                            },
                        ]),
                );
            await interaction.update({ embeds: [interaction.message.embeds[0].setDescription(`اختار نوع المنشن الي عاوز تشتريه 😊`)], components: [row, but] });
 }
    } else if (interaction.customId == 'PostsBuy') {
        const selectedValue = interaction.values[0];

        if (selectedValue === 'MentionHerePost') {
            const tax = Math.floor(Config.Posts.here * (20 / 19) + 1);
            const options1 = {
                TitleEm: `عملية شراء منشور مميز منشن هير`,
                ImageEm: null,
                colorEm: settings.لون_الامبيد,
                DesEm: `لأكمال عملية شراء المنشور المميز , يرجي نسخ الكود بالاسفل واتمام عملية التحويل\n\n \`\`\`#credit ${settings.BankID} ${tax}\`\`\``
            };
            
            const embed1 = createEmbed({
                interaction: interaction,
                title: options1.TitleEm,
                image: options1.ImageEm,
                color: options1.colorEm,
                description: options1.DesEm
            });
            

            await interaction.update({embeds : [embed1], components: []})

            const options2 = {
                price: Config.Posts.here ,
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
                        ExitData.Buys = "تم شراء منشور مميز هير";
                    }
                    await dbTickets.set(`Tickets_Support`, DataTicket);
                }


                const button = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId('posthere')
                    .setLabel(`اضغط هنا لنشر منشورك`)
                    .setStyle('PRIMARY')
                )


                await interaction.editReply({
                    embeds: [interaction.message.embeds[0].setDescription(`**- تمت عملية الشراء بنجاح ✅\n\n اضغط علي الزر بالاسفل وضع منشورك لكي يتم نشره**`)],
                    components: [button],
                });


                const Log = await interaction.guild.channels.cache.get(settings.Rooms.LogPosts)
                if (Log){
                    const embed = createEmbed(interaction, `عملية شراء منشور ناجحة`, null, options.colorEm, `
- تم عملية شراء منشور مميز منشن هير بنجاح , التفاصيل : 
- الشخص : ${interaction.user}
- السعر : ${Config.Posts.here}
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

        } else if (selectedValue === 'MentionEveryPost') {
          
            const tax = Math.floor(Config.Posts.every * (20 / 19) + 1);

            const options3 = {
                TitleEm: `عملية شراء منشور مميز منشن ايفري`,
                ImageEm: null,
                colorEm: settings.لون_الامبيد,
                DesEm: `لأكمال عملية شراء المنشور المميز , يرجي نسخ الكود بالاسفل واتمام عملية التحويل\n\n \`\`\`#credit ${settings.BankID} ${tax}\`\`\``
            };
            
            const embed2 = createEmbed({
                interaction: interaction,
                title: options3.TitleEm,
                image: options3.ImageEm,
                color: options3.colorEm,
                description: options3.DesEm
            });
            

            await interaction.update({embeds : [embed2], components: []})

            const options2 = {
                price: Config.Posts.every ,
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
                        ExitData.Buys = ["تم شراء منشور مميز ايفري"];
                    } else {
                        ExitData.Buys += "تم شراء منشور مميز ايفري";
                    }
                    await dbTickets.set(`Tickets_Support`, DataTicket);
                }

                const button = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId('postevery')
                    .setLabel(`اضغط هنا لنشر منشورك`)
                    .setStyle('PRIMARY')
                )


                await interaction.editReply({
                    embeds: [interaction.message.embeds[0].setDescription(`**- تمت عملية الشراء بنجاح ✅\n\n اضغط علي الزر بالاسفل وضع منشورك لكي يتم نشره**`)],
                    components: [button],
                });


                const Log = await interaction.guild.channels.cache.get(settings.Rooms.LogPosts)
                if (Log){
                    const embed = createEmbed(interaction, `عملية شراء منشور ناجحة`, null, options.colorEm, `
- تم عملية شراء منشور مميز منشن ايفري بنجاح , التفاصيل : 
- الشخص : ${interaction.user}
- السعر : ${Config.Posts.every}
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
    if (interaction.customId == 'posthere'){
        const PostModal = new Modal()
        .setCustomId('PostModalHere')
        .setTitle('اتمام عملية نشر منشورك');
        const ThePost = new TextInputComponent()
        .setCustomId('ThePost')
        .setLabel("ما هو منشورك ؟")
        .setPlaceholder('قم بوضع منشورك دون كتابة تواصل معي او وضع المنشن !')
        .setRequired(true)
        .setStyle('PARAGRAPH'); 
    const firstActionRow = new MessageActionRow().addComponents(ThePost);
    PostModal.addComponents(firstActionRow);

    await interaction.showModal(PostModal);

  }else if (interaction.customId == 'postevery'){

    const PostModal = new Modal()
    .setCustomId('PostModalEvery')
    .setTitle('اتمام عملية نشر منشورك');
const ThePost = new TextInputComponent()
    .setCustomId('ThePost')
    .setLabel("ما هو منشورك ؟")
    .setPlaceholder('قم بوضع منشورك دون كتابة تواصل معي او وضع المنشن !')
    .setRequired(true)
    .setStyle('PARAGRAPH'); 
const firstActionRow = new MessageActionRow().addComponents(ThePost);
PostModal.addComponents(firstActionRow);

await interaction.showModal(PostModal);

  }
})



///////////// استاجبة المودال
client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return
    if (interaction.customId == 'PostModalHere'){
        const RoomPost = await interaction.guild.channels.cache.get(settings.Rooms.RoomPosts)
        const ThePost = interaction.fields.getTextInputValue('ThePost')
        if (ThePost.includes(`@here`) || ThePost.includes(`@everyone`)) return await interaction.reply({content : `ضع منشورك مرة اخرى ولكن بدون منشن !` , ephemeral : true})
        await RoomPost.send({content : `${ThePost}\n\nتواصلوا مع : ${interaction.user}\n@here`})
        await RoomPost.send({content : `**المنشور دا مدفوع ونخلي مسؤليتنا من يلي يصير بينكم**`})
        await RoomPost.send({ files : [settings.ServerInfo.line]})
        const options3 = {
            TitleEm: `تم اكتمال عملية شراء منشورك `,
            ImageEm: null,
            colorEm: settings.لون_الامبيد,
            DesEm: `- تمت عملية شرائك لمنشور مميز بنجاح\n- منشورك نزل في روم المنشورات المميزة ✅`
        };
        
        const embed3 = createEmbed({
            interaction: interaction,
            title: options3.TitleEm,
            image: options3.ImageEm,
            color: options3.colorEm,
            description: options3.DesEm
        });
        await interaction.update({embeds : [embed3], components: []})
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return
    if (interaction.customId == 'PostModalEvery'){
        const RoomPost = await interaction.guild.channels.cache.get(settings.Rooms.RoomPosts)
        const ThePost = interaction.fields.getTextInputValue('ThePost')
        if (ThePost.includes(`@here`) || ThePost.includes(`@everyone`)) return await interaction.reply({content : `ضع منشورك مرة اخرى ولكن بدون منشن !` , ephemeral : true})

        await RoomPost.send({content : `${ThePost}\n\nتواصلوا مع : ${interaction.user}\n@everyone`})
        await RoomPost.send({content : `**المنشور دا مدفوع ونخلي مسؤليتنا من يلي يصير بينكم**`})
        await RoomPost.send({ files : [settings.ServerInfo.line]})
        const options3 = {
            TitleEm: `تم اكتمال عملية شراء منشورك `,
            ImageEm: null,
            colorEm: settings.لون_الامبيد,
            DesEm: `- تمت عملية شرائك لمنشور مميز بنجاح\n- منشورك نزل في روم المنشورات المميزة ✅`
        };
        
        const embed3 = createEmbed({
            interaction: interaction,
            title: options3.TitleEm,
            image: options3.ImageEm,
            color: options3.colorEm,
            description: options3.DesEm
        });
        await interaction.update({embeds : [embed3], components: []})
    }
})