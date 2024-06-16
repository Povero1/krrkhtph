const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , settings} = require('../../index');

const moment = require('moment');
const { createEmbed } = require('../../function/function/Embed');

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;
    if (interaction.customId == 'RedBull_Helber') {
        const selectedValue = interaction.values[0];


        if (selectedValue == 'فحص بوست') {
  if (!interaction.member.roles.cache.has(settings.Admins.DiscordStaff)) return await interaction.reply({content : `**انت ادارة ؟؟؟ 😅**` , ephemeral : true})

            const ModalCheck = new Modal()
                .setCustomId('CheckBosts')
                .setTitle('لفحص بوست')
                .setComponents();

            const Info = new TextInputComponent()
                .setCustomId('Info')
                .setLabel('اي البوست الي عاوز تفحصه ؟')
                .setPlaceholder('حط ايدي العضو')
                .setStyle('SHORT')
                .setRequired(true);

            const row = new MessageActionRow().addComponents(Info);

            await ModalCheck.addComponents(row);
            await interaction.showModal(ModalCheck);
        }
    }
});
client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId == 'CheckBosts') {
        const userId = interaction.fields.getTextInputValue('Info');

        const guildId = interaction.guild.id;
        const guild = await client.guilds.fetch(guildId);

        const member = await guild.members.fetch(userId);

        const isBooster = member.premiumSince !== null;

        if (isBooster) {
            const boostDate = moment(member.premiumSince);
            const now = moment();

            const duration = moment.duration(now.diff(boostDate));
            const weeksPassed = Math.floor(duration.asWeeks());

            const remainingDays = 7 - (weeksPassed % 7);

            const boosterEmbed = createEmbed({
                interaction: interaction,
                title: `تفاصيل الـ Boost`,
                description: `العضو <@${userId}> قام بعمل Boost للسيرفر.`,
                fields: [
                    { name: 'تاريخ الـ Boost', value: boostDate.format('YYYY-MM-DD HH:mm:ss') },
                    { name: 'مضى على الـ Boost', value: `${weeksPassed} أسبوعًا و ${duration.days()} يومًا` },
                    { name: 'الوقت المتبقي للاسبوع القادم', value: `${remainingDays} أيام` },
                ],
            });
            await interaction.update({ embeds: [boosterEmbed] });
        } else {
            const notBoosterEmbed = createEmbed({
                interaction: interaction,
                title: `تفاصيل الـ Boost`,
                description: `العضو <@${userId}> لم يقم بعمل Boost للسيرفر`,
            });
            await interaction.update({ embeds: [notBoosterEmbed] });
        }
    }
});