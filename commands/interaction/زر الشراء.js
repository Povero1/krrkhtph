const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , settings} = require('../../index');

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return
    if (interaction.customId == 'BuyShop'){

        const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
          .setCustomId('select_Buy')
          .setPlaceholder(`حابب تشتري اي ؟ ${interaction.user.displayName}`)
          .addOptions([
            {
            label: 'شراء رتبة',
            value: 'Buy_Role',
            }, 
            {
             label: 'شراء منشور مميز',
             value: 'Buy_Post',
            }, 
            {
             label: 'شراء روم خاص',
             value: 'Buy_Privte_Room',
            }, 
            {
                label: 'ازالة تحذيرات',
                value: 'Buy_Remove_Warn',
            },     
            {
                label: 'شراء اعلان منشن',
                value: 'Buy_Ads_Mention',
            },
            {
                label: 'شراء اعلان روم خاص',
                value: 'Buy_Ads_Room',
            },

          ]),
        );
        const but = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('CancelButton')
            .setLabel('الغاء العملية ؟')
            .setStyle('DANGER')
        )

        const Emmed = new MessageEmbed()
        .setColor(settings.لون_الامبيد)
        .setAuthor(interaction.guild.name , interaction.guild.iconURL({dynamic : true}))
        .setFooter(interaction.guild.name , interaction.guild.iconURL({dynamic : true}))
        .setDescription(`**تقدر تختار من هنا انت حابب تشتري اي 🥰.**`)

        await interaction.reply({embeds : [Emmed], components : [row,but]})


    }
})