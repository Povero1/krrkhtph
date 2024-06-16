const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , dbpoint,  settings} = require('../../index');
const { createEmbed } = require('../../function/function/Embed');

client.on('messageCreate', async message => {
    if (message.content == settings.prefix + 'help'){

        if (!message.member.roles.cache.has(settings.Admins.DiscordLeder)) return


        const embed = createEmbed({
            interaction : message , 
            title : 'اوامر ريدبول بوت', 
             fields : [
                {
                    name : settings.prefix + `come`, value : `لأستدعاء عضو`, inline : false , 
                }, 
                {
                    name : settings.prefix + `helper`, value : `مساعد الادارة`, inline : false , 
                },  
                {
                    name : settings.prefix + `embed`, value : `لأنشاء امبيد`, inline : false , 
                },  
                {
                    name : settings.prefix + `say`, value : `لأنشاء كلام من خلال البوت`, inline : false , 
                },   
                {
                    name : settings.prefix + `blacklist`, value : `لأعطاء احد بلاك ليست`, inline : false , 
                }, 
                {
                    name : settings.prefix + `remove-blacklist`, value : `لأزالة بلاك ليست من شخص`, inline : false , 
                },  
                {
                    name : settings.prefix + `تصفير`, value : `لتصفير جميع التحذيرات والتكتات`, inline : false , 
                },    
                {
                    name : settings.prefix + `apply`, value : `لأرسال التقديم`, inline : false , 
                },   
                {
                    name : settings.prefix + `mr`, value : `لفحص اعضاء رتبة معينه`, inline : false , 
                },    
                {
                    name : settings.prefix + `نقاط`, value : `لعرض بيانات الاداري مثل عدد تكتاته وتحذيراته`, inline : false , 
                },     
                {
                    name : settings.prefix + `قضاة`, value : `لعرض تكتات المستلمه من قبل القاضي`, inline : false , 
                },   
                {
                    name : settings.prefix + `setup-ticket`, value : `لأنشاء تذكرة الدعم الفني والقضاه`, inline : false , 
                },   
                {
                    name : settings.prefix + `help`, value : `لأنشاء امبيد الاوامر`, inline : false , 
                },                 
             ]
        })

        await message.reply({embeds : [embed]})


    }
})