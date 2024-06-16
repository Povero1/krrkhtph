const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db ,dbpoint ,  settings} = require('../../index');
const { createEmbed  } = require('../../function/function/Embed')
const moment = require('moment');

client.on('messageCreate', async message => {
    if (message.content.startsWith(settings.prefix + 'فحص')) {
        if (!message.member.roles.cache.has(settings.Admins.DiscordLeder)) return;

        const dataPointsStaff = await dbpoint.get(`Points_Staff`);
        const dataPointsKdaa = await dbpoint.get(`Points_Kdaa`);

        const StaffRole = settings.Admins.DiscordStaff;
        const KdaaRole = settings.Admins.Kdaa;

        const priceStaffTicket = settings.Fa7s.staff.ticket;
        const priceStaffWarn = settings.Fa7s.staff.warn;
        const priceKdaaTicket = settings.Fa7s.Kdaa.ticket;

        message.guild.members.fetch().then(async members => {
            const staffMembers = members.filter(member => member.roles.cache.has(StaffRole));
         
            staffMembers.sort((a, b) => {
                const userDataA = dataPointsStaff.find(data => data.userid === a.id) || { point: 0, Warn: 0 };
                const userDataB = dataPointsStaff.find(data => data.userid === b.id) || { point: 0, Warn: 0 };
                const totalPointsA = userDataA.point + userDataA.Warn;
                const totalPointsB = userDataB.point + userDataB.Warn;
                return totalPointsB - totalPointsA;
            });
    
            const embedStaff = createEmbed({
                interaction: message,
                title: `فحص الادارة`,
                description: ''
            });
    
            staffMembers.forEach(async (staffMember, index) => {
                const userData = dataPointsStaff.find(data => data.userid === staffMember.id) || {
                    userid: staffMember.id,
                    point: 0,
                    Warn: 0
                };
    
                const TotalPrice = priceStaffTicket * userData.point + priceStaffWarn * userData.Warn;
                const totalPoints = userData.point + userData.Warn;
    
                embedStaff.description += `**${staffMember.user}** : \n- Tickets: **${userData.point}** | Warns: **${userData.Warn}** | All Points: **${totalPoints}** | Credits: **${TotalPrice}**\n- #credit ${staffMember.user.id} ${TotalPrice}\nـــــــــــــــــ\n`;
            });
    
            await message.channel.send({ embeds: [embedStaff] });

        });


        message.guild.members.fetch().then(async members => {
            const staffMembers = members.filter(member => member.roles.cache.has(KdaaRole));
         
            staffMembers.sort((a, b) => {
                const userDataA = dataPointsKdaa.find(data => data.userid === a.id) || { point: 0, Warn: 0 };
                const userDataB = dataPointsKdaa.find(data => data.userid === b.id) || { point: 0, Warn: 0 };
                const totalPointsA = userDataA.point 
                const totalPointsB = userDataB.point;
                return totalPointsB - totalPointsA;
            });
    
            const embedStaff = createEmbed({
                interaction: message,
                title: `فحص القضاة`,
                description: ''
            });
    
            staffMembers.forEach(async (staffMember, index) => {
                const userData = dataPointsKdaa.find(data => data.userid === staffMember.id) || {
                    userid: staffMember.id,
                    point: 0,
                    Warn: 0
                };
    
                const TotalPrice = priceKdaaTicket * userData.point;
                const totalPoints = userData.point + userData.Warn;
    
                embedStaff.description += `**${staffMember.user}** : \n- Tickets: **${userData.point}**| Credits: **${TotalPrice}**\n- #credit ${staffMember.user.id} ${TotalPrice}\nـــــــــــــــــ\n`;
            });
    
            await message.channel.send({ embeds: [embedStaff] });

        });



       
    }
});

