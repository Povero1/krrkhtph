const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , settings} = require('../../index');
const { createEmbed  } = require('../../function/function/Embed')


client.on('messageCreate', async message => {
    if (message.author.bot) return
    if (message.content === `${settings.prefix}apply`) {

        if (!message.member.roles.cache.has(settings.Admins.DiscordStaff)) return

        const staffSettings = settings.Apply.staff;
        const KdaaSettings = settings.Apply.Kdaa;
        const WasetSettings = settings.Apply.Waset;

        const options = {
            TitleEm: `تقديم على ادارة سيرفر ريدبول`,
            ImageEm: settings.ServerInfo.ApplyImage,
            colorEm: settings.لون_الامبيد,
            DesEm: `**الشعار اجباري و ليس اختياري
تقدم مرتين بدون شعار = @♜ || ممنوع من التقديم :
ملاحظات :
يوجد رواتب ( 2500 كريدت على كل تكت - 1500 كريدت على كل تحذير )
يوجد رتبه بيـع خاصة بالادارة طول فترة تواجدك
يوجد منشورات مميزة كل 30 تكت تكملها
يوجد رتبه افصل اداري اسبوعيا..**`,
            FiledsEm : []
        };

        //const embed = createEmbed(message, options.TitleEm, options.ImageEm, options.colorEm, options.DesEm , options.FiledsEm);
        const embed = createEmbed(
            {
                interaction : message,
                title: `تقديم على ادارة سيرفر ريدبول`,
                image: settings.ServerInfo.ApplyImage,
                color: settings.لون_الامبيد,
                description: `**الشعار اجباري و ليس اختياري
    تقدم مرتين بدون شعار = @♜ || ممنوع من التقديم :
    ملاحظات :
    يوجد رواتب ( 2500 كريدت على كل تكت - 1500 كريدت على كل تحذير )
    يوجد رتبه بيـع خاصة بالادارة طول فترة تواجدك
    يوجد منشورات مميزة كل 30 تكت تكملها
    يوجد رتبه افصل اداري اسبوعيا..**`,
            }
        );


        const staffButton = new MessageButton()
            .setCustomId('staffButton')
            .setLabel('تقديم اداري')
            .setStyle(staffSettings.type ? 'SUCCESS' : 'DANGER')
            .setDisabled(!staffSettings.type);

        const KdaaButton = new MessageButton()
            .setCustomId('KdaaButton')
            .setLabel('تقديم قاضي')
            .setStyle(KdaaSettings.type ? 'SUCCESS' : 'DANGER')
            .setDisabled(!KdaaSettings.type);

        const WasetButton = new MessageButton()
            .setCustomId('WasetButton')
            .setLabel('تقديم وسيط')
            .setStyle(WasetSettings.type ? 'SUCCESS' : 'DANGER')
            .setDisabled(!WasetSettings.type);

        const row = new MessageActionRow().addComponents(staffButton, KdaaButton, WasetButton);

        await message.channel.send({ embeds : [embed], components: [row] });
    }
})

///////// اداري 
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId == 'staffButton') {

    if (!interaction.user.displayName.startsWith('RB' || '!RB' || '! RB')) return await interaction.reply({content: `**لازم تحط شعارك الاول زي كدا RB | اسمك**`, ephemeral : true})
        const nameInput = new TextInputComponent()
            .setCustomId('name')
            .setLabel('اسمك اي ؟')
            .setPlaceholder('مثال : محمد')
            .setStyle('SHORT');

        const ageInput = new TextInputComponent()
            .setCustomId('age')
            .setLabel('كام عمرك ؟')
            .setPlaceholder('مثال : 18')
            .setStyle('SHORT');

        const countryInput = new TextInputComponent()
            .setCustomId('country')
            .setLabel('انت منين ؟')
            .setPlaceholder('مثال : مصر')
            .setStyle('SHORT');

        const hoursInput = new TextInputComponent()
            .setCustomId('hours')
            .setLabel('كام عدد ساعات تفاعلك؟')
            .setPlaceholder('مثال : 14 ساعه فاليوم')
            .setStyle('SHORT');

            
        const info = new TextInputComponent()
        .setCustomId('info')
        .setLabel('ازاي هتقدر تفيدنا؟')
        .setPlaceholder('مثال : بعرف استلم تكتات واتعامل فيها , براقب رومات البيع')
        .setStyle(`PARAGRAPH`);

        const row = new MessageActionRow().addComponents(nameInput);
        const row2 = new MessageActionRow().addComponents(ageInput);
        const row3 = new MessageActionRow().addComponents(countryInput);
        const row4 = new MessageActionRow().addComponents(hoursInput);
        const row5 = new MessageActionRow().addComponents(info);


        const modal = new Modal()
            .setCustomId('staffModal')
            .setTitle('املأ الاستبيان'); 

   		await modal.addComponents(row, row2 , row3 , row4 , row5);


        await interaction.showModal(modal);
    }
});


/// وسيط 
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId == 'WasetButton') {
        const nameInput = new TextInputComponent()
            .setCustomId('name')
            .setLabel('اسمك اي ؟')
            .setPlaceholder('مثال : محمد')
            .setStyle('SHORT');

        const ageInput = new TextInputComponent()
            .setCustomId('age')
            .setLabel('كام عمرك ؟')
            .setPlaceholder('مثال : 18')
            .setStyle('SHORT');

        const countryInput = new TextInputComponent()
            .setCustomId('country')
            .setLabel('انت منين ؟')
            .setPlaceholder('مثال : مصر')
            .setStyle('SHORT');

        const Type = new TextInputComponent()
            .setCustomId('Type')
            .setLabel('هل ستقوم بدفع مبلغ التأمين ؟')
            .setPlaceholder('اجب نعم او لا')
            .setStyle('SHORT');

            
        const info = new TextInputComponent()
        .setCustomId('info')
        .setLabel('اشرح عمل الوسيط')
        .setPlaceholder('قم بشرح عمل الوسيط بالكامل')
        .setStyle(`PARAGRAPH`);

        const row = new MessageActionRow().addComponents(nameInput);
        const row2 = new MessageActionRow().addComponents(ageInput);
        const row3 = new MessageActionRow().addComponents(countryInput);
        const row4 = new MessageActionRow().addComponents(Type);
        const row5 = new MessageActionRow().addComponents(info);


        const modal = new Modal()
            .setCustomId('wasetModal')
            .setTitle('املأ الاستبيان'); 

   		await modal.addComponents(row, row2 , row3 , row4 , row5);


        await interaction.showModal(modal);
    }
});

/// القاضي 
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId == 'KdaaButton') {
        const nameInput = new TextInputComponent()
            .setCustomId('name')
            .setLabel('اسمك اي ؟')
            .setPlaceholder('مثال : محمد')
            .setStyle('SHORT');

        const ageInput = new TextInputComponent()
            .setCustomId('age')
            .setLabel('كام عمرك ؟')
            .setPlaceholder('مثال : 18')
            .setStyle('SHORT');

        const countryInput = new TextInputComponent()
            .setCustomId('country')
            .setLabel('انت منين ؟')
            .setPlaceholder('مثال : مصر')
            .setStyle('SHORT');

            const hoursInput = new TextInputComponent()
            .setCustomId('hours')
            .setLabel('كام عدد ساعات تفاعلك؟')
            .setPlaceholder('مثال : 14 ساعه فاليوم')
            .setStyle('SHORT');

            
        const info = new TextInputComponent()
        .setCustomId('info')
        .setLabel('اشرح عمل القاضي')
        .setPlaceholder('قم بشرح عمل القاضي بالكامل')
        .setStyle(`PARAGRAPH`);

        const row = new MessageActionRow().addComponents(nameInput);
        const row2 = new MessageActionRow().addComponents(ageInput);
        const row3 = new MessageActionRow().addComponents(countryInput);
        const row4 = new MessageActionRow().addComponents(hoursInput);
        const row5 = new MessageActionRow().addComponents(info);


        const modal = new Modal()
            .setCustomId('kadyModal')
            .setTitle('املأ الاستبيان'); 

   		await modal.addComponents(row, row2 , row3 , row4 , row5);


        await interaction.showModal(modal);
    }
});