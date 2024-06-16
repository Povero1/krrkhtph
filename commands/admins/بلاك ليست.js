const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , settings} = require('../../index');
const { createEmbed  } = require('../../function/function/Embed');
const { default: chalk } = require('chalk');

client.on('messageCreate', async message => {
    if (message.content.startsWith(`${settings.prefix}blacklist`)) {
        if (!message.member.roles.cache.has(settings.Admins.DiscordLeder)) return;
        const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(message.content.split(/\s+/)[1]);

        if (!mentionedUser) {
            return message.reply('منشن الشخص');
        }

        const blacklistType = message.content.split(/\s+/)[2];
        const reason = message.content.split(/\s+/).slice(3).join(' ') || 'غير محدد';

        if (!blacklistType || !['مزاد', 'تكت', 'ادارة'].includes(blacklistType)) {
            return message.reply(' حدد نوع البلاك ليست: مزاد، تكت، أو ادارة');
        }

         const data = await db.get(`BlackList`)
         const e = data?.find((t) => t.userid == mentionedUser.id)
        const role = blacklistType === 'مزاد' ? settings.blacklist.mazad : 
        blacklistType === 'تكت' ? settings.blacklist.tickets :
        blacklistType === 'ادارة' ? settings.blacklist.staff : null 
        
            await db.push(`BlackList`, {
                userid: mentionedUser.id,
                type: blacklistType,
                role: role , 
                reason : reason
            });
        
         await mentionedUser.roles.add(role)
         const embed = createEmbed({
            interaction: message,
            title: 'بلاك ليست',
            description: `**- العضو : ${mentionedUser}\n- الاداري : ${message.author}\n- نوع البلاك : ${blacklistType}\n- السبب : ${reason}**`
        });

        await message.channel.send({ embeds: [embed] });
      
    }
});


client.on('messageCreate', async message => {
    if (message.content.startsWith(`${settings.prefix}remove-blacklist`)) {
        if (!message.member.roles.cache.has(settings.Admins.DiscordLeder)) return;
        const mentionedUser = message.mentions.members.first() || message.guild.members.cache.get(message.content.split(/\s+/)[1]);

        if (!mentionedUser) {
            return message.reply('منشن الشخص');
        }

        const blacklistType = message.content.split(/\s+/)[2];
        const reason = message.content.split(/\s+/).slice(3).join(' ') || 'غير محدد';

        if (!blacklistType || !['مزاد', 'تكت', 'ادارة'].includes(blacklistType)) {
            return message.reply(' حدد نوع البلاك ليست: مزاد، تكت، أو ادارة');
        }

         const data = await db.get(`BlackList`)
         const e = data?.find((t) => t.userid == mentionedUser.id)
        const role = blacklistType === 'مزاد' ? settings.blacklist.mazad : 
        blacklistType === 'تكت' ? settings.blacklist.tickets :
        blacklistType === 'ادارة' ? settings.blacklist.staff : null 

         if (!e) return await message.reply({content : `مش معاه بلاك ليست`})

              const updatedData = data.filter((Data) => Data.userid !== mentionedUser.id && Data.type == blacklistType);
           await db.set(`BlackList`, updatedData);
         
         const embed = createEmbed({
            interaction: message,
            title: ' ازالة بلاك ليست',
            description: `**- العضو : ${mentionedUser}\n- الاداري : ${message.author}\n- تم ازالة بلاك ليست بنوع  : ${blacklistType}**`
        });

        await message.channel.send({ embeds: [embed] });
      
    }
});





client.on('guildMemberAdd', async member => {
    const data = await db.get(`BlackList`)
    const ex = await data?.find((t) => t.userid == member.id)

    if (ex){
        await member.roles.add(ex.role)
        console.log(chalk.red(`Role BlackList Add To ${member.displayName}`))
    }

})