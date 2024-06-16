const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , settings} = require('../../index');
const {createEmbed} = require('../../function/function/Embed')
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return
    if (interaction.customId == 'Apply_Blag'){

        const modal = new Modal()
            .setCustomId('blagModal')
            .setTitle('تقديم بلاغ عن نصاب');

        const scammerID = new TextInputComponent()
            .setCustomId('scammerID')
            .setLabel("ايدي النصاب")
            .setPlaceholder(`حط هنا ايدي النصاب وليس يوزره`)
            .setStyle('SHORT');

            const MansubID = new TextInputComponent()
            .setCustomId('MansubID')
            .setLabel("ايدي المنصوب")
            .setPlaceholder(`حط الايدي بتاع الشخص المنصوب`)
            .setStyle('SHORT');

        const story = new TextInputComponent()
            .setCustomId('story')
            .setLabel("القصة")
            .setPlaceholder(`حط القصه هنا بشكل مختصر`)
            .setStyle('PARAGRAPH');

        const amount = new TextInputComponent()
            .setCustomId('amount')
            .setLabel("المبلغ")
            .setPlaceholder(`حط المبلغ الي نصب عليك فيه`)
            .setStyle('SHORT');

        const Item = new TextInputComponent()
            .setCustomId('Item')
            .setLabel("السلعة")
            .setPlaceholder(`حط المنتج الي نصب عليك فيه`)
            .setStyle('SHORT');

        const firstActionRow = new MessageActionRow().addComponents(scammerID);
        const firstActionRow2 = new MessageActionRow().addComponents(MansubID);

        const secondActionRow = new MessageActionRow().addComponents(story);
        const thirdActionRow = new MessageActionRow().addComponents(amount);
        const thirdActionRow2 = new MessageActionRow().addComponents(Item);
        modal.addComponents(firstActionRow, firstActionRow2 ,  secondActionRow, thirdActionRow,thirdActionRow2 );

        await interaction.showModal(modal);
    }
})


client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return
    if (interaction.customId == 'blagModal'){
        const scammerID = interaction.fields.getTextInputValue('scammerID');
        const MansubID = interaction.fields.getTextInputValue('MansubID');
        const story = interaction.fields.getTextInputValue('story');
        const amount = interaction.fields.getTextInputValue('amount');
        const Item = interaction.fields.getTextInputValue('Item');

        const options = {
            TitleEm: `بلاغ على نصاب`,
            ImageEm: null,
            colorEm: settings.لون_الامبيد,
            DesEm: `**
- النصاب : <@${scammerID}> | (\`${scammerID}\`)
- المنصوب : <@${MansubID}> | (\`${MansubID}\`)
- السلعة : ${Item}
- المبلغ : ${amount}

\`\`\`${story}\`\`\`
        **`
        };
        
        const embed = createEmbed({
            interaction: interaction,
            title: options.TitleEm,
            image: options.ImageEm,
            color: options.colorEm,
            description: options.DesEm
        });
        
        interaction.message.components[0].components[0].setDisabled(true)
        interaction.message.components[0].components[0].setLabel('تم تقديم بلاغ من قبل')
        await interaction.message.edit({components : interaction.message.components})
        await interaction.reply({embeds : [embed]})
        await interaction.channel.send({content : `**الخطوة التالية : دلوقتي لازم ترسل الدلائل محتاجينك منك الاتي \n\n- دليل الاتفاق علي : (${Item}) بينك وبين النصاب\n- ودليل انه نصب عليك : (يعني عملك بلوك , السلعه مش شغاله , مش بيرد عليك) \n- واخر دليل : دليل تحويل الكريديت للنصاب**`})
        await interaction.channel.send({files : [settings.ServerInfo.line]})


    }
})