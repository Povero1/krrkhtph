const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , settings} = require('../../index');
const { createEmbed  } = require('../../function/function/Embed')

client.on('messageCreate', async message => {
    if (message.author.bot) return
    if (message.content == `${settings.prefix}setup-rules`){
    if (!message.member.roles.cache.has(settings.Admins.DiscordLeder)) return

    const embed = createEmbed({
        interaction : message , 
        title : `قوانين ريدبول`, 
        description : ``
    })

    }
})