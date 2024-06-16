const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db ,dbpoint ,  settings} = require('../../index');
const { createEmbed  } = require('../../function/function/Embed')
const moment = require('moment');

client.on('messageCreate', async message => {
    if (message.content.startsWith(settings.prefix + 'mr')) {
        if (!message.member.roles.cache.has(settings.Admins.DiscordLeder))
        try {
            let role;
            if (message.mentions.roles.size > 0) {
                role = message.mentions.roles.first();
            } else {
                const roleId = message.content.split(/\s+/)[1];
                if (!roleId) return message.reply("منشن رتبة");
                role = message.guild.roles.cache.get(roleId);
                if (!role) return message.reply("الرتبة م موجودة");
            }

            await message.guild.members.fetch();
            let map = role.members.map(rr => `**<@${rr.id}> (${rr.id})**`).join("\n");
            const embed = createEmbed({
                interaction: message,
                title: `Info About \`${role.name}\` `,
                description: `**Members Count Have This Role:** \`${role.members.size}\` \n
                **Members :** \n
                ${map} \n
                **Role Is Created At :** \`${moment(role.createdAt).format('DD/MM/YYYY h:mm')}\``
            });

            await message.reply({ embeds: [embed] });

        } catch (err) {
            console.log(err);
        }
    }
});
