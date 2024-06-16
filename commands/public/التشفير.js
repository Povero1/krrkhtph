const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , settings} = require('../../index');
const { createEmbed  } = require('../../function/function/Embed')

client.on('messageCreate', async message => {
    if (message.author.bot) return
    if (message.content == `${settings.prefix}setup-tashfer`){
     if (!message.member.roles.cache.has(settings.Admins.DiscordLeder)) return


        const embed = createEmbed({
            interaction : message , 
            title : `تشفير ريدبول`, 
            description : `**لتشفير منشورك يرجى ضغط الزر وضع منشورك**`, 
            image : settings.ServerInfo.tashfer
        })

        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('Tashfeer')
            .setLabel('شفر منشورك الان')
            .setStyle('SECONDARY'), 
        )

        await message.delete()
        await message.channel.send({embeds : [embed ], components : [buttons]})


    }
})
const wordReplacements = {
    "متجر": "متـgـر",
    "حساب": "7ـساب",
    "بيع": "بـيـ3",
    "شراء": "شـrـراء",
    "شوب": "شـ9ب",
    "ديسكورد": "ديسـkورد",
    "سعر": "سـ3ـر",
    "متوفر": "متـ9فر",
    "بوست": "بـ9ست",
    "نيترو": "نيـtـرو",
    "شوب": "شـ9ب",
    "توكنات": "تـ9ـكنات ",
}; // الكلمات التي سيتم استبدالها

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton() && !interaction.isModalSubmit()) return;

    const { customId } = interaction;

    if (customId == 'Tashfeer') {
        const TashfeerModal = new Modal()
            .setCustomId('TashfeerModal')
            .setTitle('شفر منشورك الان');
        const ThePost = new TextInputComponent()
            .setCustomId('ThePost')
            .setLabel("منشورك")
            .setPlaceholder('اكتب منشورك هنا')
            .setStyle('PARAGRAPH');
        const firstActionRow = new MessageActionRow().addComponents(ThePost);
        TashfeerModal.addComponents(firstActionRow);

        await interaction.showModal(TashfeerModal);
    } else if (customId == 'TashfeerModal') {
        const originalPost = interaction.fields.getTextInputValue(`ThePost`);
        
        // قم بتحويل النص باستخدام مصفوفة الاستبدال
        const modifiedPost = originalPost.replace(
            new RegExp(Object.keys(wordReplacements).join('|'), 'gi'),
            match => wordReplacements[match.toLowerCase()] || match
        );

        await interaction.reply({ content: `- منشورك بعد التشفير:\n${modifiedPost}`, ephemeral: true });
    }
});
