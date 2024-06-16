const { Intents, Collection, Client, Guildplayer2, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const {client , settings } = require('../../index');
const Canvas = require('@napi-rs/canvas');

/**
 * @param {object} interaction - الانتراكشن
 * @param {object} player1 -  اللاعب الأول
 * @param {object} player2 -  اللاعب الثاني
 * @param {object} db - داتا بيس
 * @param {object} Rd - داتا بيس العملات الخ.
 * @returns {void}
 */
function RandomNumber() {
  return Math.floor(Math.random() * 100000);
}

const randomNumber =RandomNumber();


async function StartGame(interaction, player1, player2, db, Rd) {
    const GawlaChannel = await interaction.guild.channels.create(`↬〢${player1.username} Vs ${player2.username}`, {
        type: 'GUILD_TEXT',
        parent: settings.كاتوجري_الجولات, 
        permissionOverwrites: [
            {
                id: interaction.guild.roles.everyone.id,
                allow: ['ADD_REACTIONS', 'VIEW_CHANNEL'],
                deny: ['ATTACH_FILES', 'SEND_MESSAGES', 'CREATE_PUBLIC_THREADS', 'CREATE_PRIVATE_THREADS']
            },
            {
                id: player1.id ,
                allow: ['SEND_MESSAGES']
            }, 
            {
              id: player2.id,
              allow: ['SEND_MESSAGES']
          }
        ],
        rateLimitPerUser: 5 
    });

    // const randomGuildId = settings.guildsRandom[Math.floor(Math.random() * settings.guildsRandom.length)];
    // const ServerRandom = await client.guilds.cache.get(randomGuildId);

    let emojePlayer1, emojePlayer2;
    
    emojePlayer1 = await interaction.guild.emojis.create(player1.avatarURL({ format: 'png', dynamic: false }), 'avatarUser');
    emojePlayer2 = await interaction.guild.emojis.create(player2.avatarURL({ format: 'png', dynamic: false }), 'avatarUser');

const Sahm1 = settings.Emoje.SahmR
const Sahm2 = settings.Emoje.SahmL
const LineEmbed = settings.Emoje.Line
const AllLineEmbed = `${LineEmbed}${LineEmbed}${LineEmbed}${LineEmbed}`

  
const embed = new MessageEmbed()
.setTitle(`${player1.username} Vs ${player2.username}`)
.setColor(`#837ea0`)
.setThumbnail(interaction.guild.iconURL({dynamic : true}))
.setFooter({text: `يمكنك دعمهم عن طريق التكبيس او زر الهدايا | ${interaction.guild.name}`,iconURL: interaction.guild.iconURL({ dynamic: true })
})
.setTimestamp()
.setDescription(`
> -  تمت دعوة الطرف الاخر من قبل ${player1}
> - المنافسين  : ${player1} Vs ${player2}
`)
.addFields(
  { name: `وقت بدأ الجولة`, value: `<t:${Math.floor(Date.now() / 1000)}:R>`, inline: true },
  { name: `وقت انتهاء الجولة`, value: `<t:${Math.floor(Date.now() / 1000) + (3 * 60)}:R>`, inline: true },
)
const embed2 = new MessageEmbed()
.setDescription(`${emojePlayer1} ${Sahm1} 0 ${AllLineEmbed}🆚${AllLineEmbed} 0 ${Sahm2} ${emojePlayer2}`)
.setColor(`#837ea0`); 

const buttons = new MessageActionRow().addComponents(
  new MessageButton()
  .setCustomId('ButtonTakbeesPlayer1')
  .setLabel(`تكبيس الي`)
  .setEmoji(`${emojePlayer1}`)
  .setStyle('SECONDARY'), 

  new MessageButton()
  .setCustomId('ButtonTakbeesPlayer2')
  .setLabel(`تكبيس الي`)
  .setEmoji(`${emojePlayer2}`)
  .setStyle('SECONDARY'), 

  new MessageButton()
  .setCustomId('GiveBoxGifts')
  .setLabel(`ارسال صندوق هدايا`)
  .setEmoji(`🎁`)
  .setStyle('SUCCESS'), 

)
const row = new MessageActionRow()
.addComponents(
  new MessageSelectMenu()
  .setCustomId('select_Gifts_Gawla')
  .setPlaceholder('ادعم بالهدايا الان')
  .addOptions([
    {
      label: `دعم بالهدايا الي`,
      emoji : `${emojePlayer1}`,
      value: 'ButtonDa3mGiftsPlayer1',
    },
    {        
    label: `دعم بالهدايا الي`,
    emoji : `${emojePlayer2}`,
    value: 'ButtonDa3mGiftsPlayer2',
    },        
  ]),
);



const EmbedMessage = await GawlaChannel.send({content : `- <@&${settings.رتبة_الجولات}>\nGawla ID : ${interaction.message.id}`, embeds : [embed,embed2], components : [buttons, row]})
const EmmbedLLine = await GawlaChannel.send({files : [settings.lineserver]})
await db.set(`Gawla_${EmbedMessage.id}`, {
  player1 : player1.id,
  player2 : player2.id ,
  PointsPlayer1 : 0 , 
  PointsPlayer2 : 0
})

// إنشاء الثريد
const thread = await EmbedMessage.startThread({
    name: 'شات الجولة',
    reason: 'تحدث هنا بدلا من التحدث فالجولة',
    permissionOverwrites: [
        {
            id: interaction.guild.roles.everyone.id,
            allow: ['VIEW_CHANNEL', "SEND_MESSAGES"], 
            deny: [ 'ATTACH_FILES', 'CREATE_PUBLIC_THREADS', 'CREATE_PRIVATE_THREADS']
        }
    ]
  });


  const updateImageInterval = setInterval( async() => {
    const DataGawla = await db.get(`Gawla_${EmbedMessage.id}`)
    const PointsUser = DataGawla.PointsPlayer1
    const PointsMember = DataGawla.PointsPlayer2
      embed2.setDescription(`${emojePlayer1} ${Sahm1} ${PointsUser} ${AllLineEmbed}🆚${AllLineEmbed} ${PointsMember} ${Sahm2} ${emojePlayer2}`);
      EmbedMessage.edit({ embeds: [embed,embed2] });
    }, 2000); 


    ///////////////////////////////////////

    
setTimeout( async() => {
  
    clearInterval(updateImageInterval);
    const DataGawlaCoins = await db.get(`Gawla_${EmbedMessage.id}`);

    let winner;
    let winnerUser;
    let loserUser;
    let winnerPoints;
    let t3adl;
    const CoinsMember = DataGawlaCoins.PointsPlayer2;
    const CoinsUser = DataGawlaCoins.PointsPlayer1;
    
    if (CoinsMember > CoinsUser) {
      winnerUser = player2;
      loserUser = player1;
      winner = CoinsMember;
    } else if (CoinsUser > CoinsMember) {
      winnerUser = player1;
      loserUser = player2;
      winner = CoinsUser;
    }

await db.delete(`Gawla_${EmbedMessage.id}`)
const DataVotes1 = await db.get(`VotesUser1_${EmbedMessage.id}`)
const DataVotes2 = await db.get(`VotesUser2_${EmbedMessage.id}`)

if (DataVotes1){
  await db.delete(`VotesUser1_${EmbedMessage.id}`)
}
if (DataVotes2){
 await db.delete(`VotesUser2_${EmbedMessage.id}`)
}


const DataCoins = await Rd.get(`RedCoins`)
const Exxx = await DataCoins?.find((t) => t.userid == winnerUser.id)
Exxx.Winning_number ++  ;
Exxx.gawla ++  ;
await Rd.set(`RedCoins`, DataCoins)

const DataCoins2 = await Rd.get(`RedCoins`)
const Exxx2 = await DataCoins2?.find((t) => t.userid == loserUser.id)
Exxx2.loss_nubmer ++  ;
Exxx2.gawla ++  ;
await Rd.set(`RedCoins`, DataCoins2)

emojePlayer1?.delete();
emojePlayer2?.delete();

const embed = new MessageEmbed()
  .setColor(settings.لون_الامبيد)
  .setTitle('الفائز فالجولة')
  .setURL('https://discord.gg/reds')
  .setDescription(`**> - الفائز بالجولة هو : ${winnerUser}\n\n> - يمكنك الان تنفيذ حكم علي العضو الخسران**`)
  .setTimestamp()


      
         await GawlaChannel.send({embeds : [embed]})
         await GawlaChannel.send({content : `سيتم حذف الجولة خلال دقيقتين ونصف ..\n${player1} | ${player2}`})
          if (winnerPoints == `**${winnerUser}** يمكنه الان تنفيذ حكمين علي الشخص المهزوم`){
             await GawlaChannel.setName(`تنفيذ احكام`)
             await thread.setName(`تنفيذ احكام`)
             }else {
              await GawlaChannel.setName(`انتهت الجولة`)
              await thread.setName(`انتهت الجولة`)
             }
         

      
           setTimeout( async() => {
        
            await GawlaChannel.send({content : `سيتم حذف الجولة الان بعد 5 ثواني`})
            setTimeout(async() => {
                await GawlaChannel.delete()
            }, 5000);
            
             }, 138000);
       
      
      }, 180000);




}

module.exports = StartGame