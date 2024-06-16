const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , settings} = require('../../index');
const server1 = settings.ServerInfo.serverID
client.on('messageCreate', message => {
    if(message.content === "//"){
        if(message.guildId !== server1) return;
        if (!message.member.roles.cache.has(auct)) return;
        message.delete();
        message.channel.send(`تزاود على سلعة وبالاخير ما تشتري = بلاك لست 
   ممنوع أي كلمة في المزاد غير سعـرك = ميوت 
   اقل سعـر للمزايدة 10 الاف = ميوت 
   تدفع عن طريق بنك؟ لازم تمنشن في رسالة المزايدة`);
    }
   });
   
   client.on('messageCreate', message => {
    if(message.content === "&"){
        if(message.guildId !== server1) return;
        if (!message.member.roles.cache.has(settings.Admins.DiscordStaff)) return;
        message.delete();
        message.channel.send(`لازم تمنشن بنك مع رسالتك !`);
    }
   });
   
   client.on('messageCreate', message => {
    if(message.content === "+"){
        if(message.guildId !== server1) return;
        if (!message.member.roles.cache.has(settings.Admins.DiscordStaff)) return;
        message.delete();
        message.channel.send(`أي كلام غير سـعرك = ميوت`);
    }
   });
   
   
   client.on('messageCreate', message => {
    if(message.content === "/"){
        if(message.guildId !== server1) return;
        if (!message.member.roles.cache.has(settings.Admins.DiscordStaff)) return;
        message.delete();
        message.channel.send(`
   **~ RedBull S / الاشياء الممنوعة في المزاد
    
   – ممنوع عرض كريدت او دولارات او عملة حقيقية او رصيد في المزاد . 
   – ممنوع عرض هاكات او اختراق او برامج غش و الكراك في المزاد . 
   – ممنوع عرض شرح يوتيوب في المزاد . 
   – ممنوع بيـع طريقة او منتج يكون عبر دخول للسيرفر . 
   – ممنوع عرض اي شي يخص الرشق . 
   – ممنوع عرض أي شي +18 . 
   – ممنوع عرض التوكنات بجميع انواعها . 
   – ممنوع عرض فيديوهات . 
   
   الحد الاقصى للصور : 2 
   **`);
    }
   });
   
   client.on('messageCreate', message => {
    if(message.content === "#ملكي"){
        if(message.guildId !== server1) return;
        if (!message.member.roles.cache.has(settings.Admins.DiscordStaff)) return;
        message.delete();
        message.channel.send(`**السلعة  : 
   صورة للسلعة ( غير ضروري )  : 
   سـعـر بداية المزاد ’ 60k ’  ،  ‘ 30k ‘ ( غير ضروري )  : 
   منشن نفسك  : **`);
    }
   });
   
   
   client.on('messageCreate', message => {
    if(message.content === "#مزاد"){
        if(message.guildId !== server1) return;
        if (!message.member.roles.cache.has(settings.Admins.DiscordStaff)) return;
        message.delete();
        message.channel.send(`**السلعة : 
   بداية المزايدة ' 30k ' ، ' 10k ' :
   : @
   **`);
    }
   });
   
   client.on('messageCreate', message => {
    if(message.content === "#دلائل"){
        if(message.guildId !== server1) return;
        if (!message.member.roles.cache.has(settings.Admins.DiscordLeder)) return;
        message.delete();
        message.channel.send(`**لتقديم بلاغك علي نصـ ـاب اذكر الاتي : 
   -  ايدي النصـ ـاب :
   -  ايدي المنصـ ـوب : 
   -  السـ ـلعه :
   -  سـ3ـرها :
   -  القصه بأختصار :
   -  ارسل__ دليل واحد فقط لكل صورة__ ( دليل اتفاق علي السـ ـلعه , دليل انه نصـ ـب عليك , دليل تحويل الكريديت للنصـ ـاب)**
   **يفضل دليل التحويل من موقع بروبوت**`);
    }
   });
   
   
   client.on('messageCreate', message => {
    if(message.content === "حول"){
        if(message.guildId !== server1) return;
        if (!message.member.roles.cache.has(settings.Admins.DiscordStaff)) return;
        message.delete();
        message.channel.send(`التحويل فقط ل <@190395550649024512> .**
   اي تحويل خارج التكت او تحويل لشخص اخر لن يتم الاعتراف به**`);
    }
   });
   
   
   client.on('messageCreate', message => {
    if(message.content === '~'){
        if(message.guildId !== server1) return;
        if (!message.member.roles.cache.has(settings.Admins.DiscordLeder)) return;
        message.delete();
        message.channel.send(`https://probot.io/transactions`);
    }
   });
   
   client.on('messageCreate', message => {
    if(message.content === 'شفر'){
        if(message.guildId !== server1) return;
        if (!message.member.roles.cache.has(settings.Admins.DiscordStaff)) return;
        message.delete();
        message.channel.send(`** يجب تشفير حرف من الكلمات الاتية :
   
   [ "حساب","بيع","شراء","شوب","متجر,"ديسكورد","نصاب","سعر","متوفر","بوست","نيترو" ]**`);
    }
   });
   
   client.on('messageCreate', message => {
    if(message.content === "منشور"){
        if(message.guildId !== server1) return;
        if (!message.member.roles.cache.has(settings.Admins.DiscordLeder)) return;
        message.delete();
        message.channel.send(`**منشور مدفوع مالنا علاقة و نخلي مسؤوليتنا عن الي يصير بينكم**`).then(
        message.channel.send(`${line}`));
    }
   });
   
   
   client.on('messageCreate', message => {
    if(message.content === '#خمول'){
        if(message.guildId !== server1) return;
        if (!message.member.roles.cache.has(settings.Admins.DiscordLeder)) return;
            message.delete();
        message.channel.send(`**في حال عدم الرد خلال 5 دقائق سيتم اغلاق التكت**`);  
            return;
  
        }
       });
   
   client.on('messageCreate', message => {
    if(message.content === 'شعار'){
        if (!message.member.roles.cache.has(settings.Admins.DiscordStaff)) return;
        message.delete();
        message.channel.send(`**
   الشعار الوحيد لسيرفرات ريدبول :
   RB | Name
   **`);
    }
   });