const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , settings} = require('../../index');

const { createEmbed  } = require('../../function/function/Embed')


client.on('messageCreate', async message => {
    if (message.author.bot) return
    if (message.content == `${settings.prefix}setup-order`){

        if (!message.member.roles.cache.has(settings.Admins.DiscordLeder)) return


        const embed = createEmbed({
            interaction : message , 
            title : `يمكمك طلب ما تريد من هنا`, 
            description : `**
قوانين الطلبات

1-ممنوع طلب منتجات 18+
2-ممنوع طلب اعضاء او بارتنر
3-ممنوع طلب طرق نيترو و كريديت
4-ممنوع طلب اشياء في اماكن خطأ مثل : (تطلب نيترو في روم برمجيات او تصاميم)
5-ممنوع بيع اي شي           
**`, 
image : settings.ServerInfo.Orders
        })

        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('Montgat')
            .setLabel('منتجات')
            .setStyle('SECONDARY'), 

            new MessageButton()
            .setCustomId('Tsamem')
            .setLabel('تصاميم')
            .setStyle('SECONDARY'), 
            
            new MessageButton()
            .setCustomId('Devss')
            .setLabel('برمجيات')
            .setStyle('SECONDARY'), 
        )

        await message.delete()
        await message.channel.send({embeds : [embed ], components : [buttons]})


    }
})


//// منتجات 
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton() && !interaction.isModalSubmit()) return;

    const { customId } = interaction;

    if (customId == 'Montgat') {

        const OrderModal = new Modal()
            .setCustomId('OrderModalMontgat')
            .setTitle('اكمال عملية الطلب');
        const request = new TextInputComponent()
            .setCustomId('request')
            .setLabel("ما هو طلبك؟")
            .setStyle('PARAGRAPH');
        const firstActionRow = new MessageActionRow().addComponents(request);
        OrderModal.addComponents(firstActionRow);

        await interaction.showModal(OrderModal)
    } else if (customId == 'OrderModalMontgat') {
        const Order = interaction.fields.getTextInputValue(`request`);
        await interaction.reply({content : `تم ارسال طلبك بنجاح  | ✅`, ephemeral : true})

        const embed = createEmbed({
            interaction : interaction , 
            title : `طلب جديد`, 
            description: `- صاحب الطلب : ${interaction.user}\n\n\`\`\`${Order}\`\`\``,
        })

        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('DeleteOrder')
            .setLabel('حذف الطلب')
            .setStyle('SECONDARY'), 
        )

        const Log = await interaction.guild.channels.fetch(settings.Orders.montgat.room)
        await Log.send({content : `<@&${settings.Orders.montgat.role}>` , embeds : [embed], components : [buttons]})
        await Log.send({files : [settings.ServerInfo.line]})

       
    }
});

//// برمجيات 
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton() && !interaction.isModalSubmit()) return;

    const { customId } = interaction;

    if (customId == 'Devss') {

        const OrderModal = new Modal()
            .setCustomId('OrderModalDevss')
            .setTitle('اكمال عملية الطلب');
        const request = new TextInputComponent()
            .setCustomId('request')
            .setLabel("ما هو طلبك؟")
            .setStyle('PARAGRAPH');
        const firstActionRow = new MessageActionRow().addComponents(request);
        OrderModal.addComponents(firstActionRow);

        await interaction.showModal(OrderModal)
    } else if (customId == 'OrderModalDevss') {
        const Order = interaction.fields.getTextInputValue(`request`);
        await interaction.reply({content : `تم ارسال طلبك بنجاح  | ✅`, ephemeral : true})

        const embed = createEmbed({
            interaction : interaction , 
            title : `طلب جديد`, 
            description: `- صاحب الطلب : ${interaction.user}\n\n\`\`\`${Order}\`\`\``,
        })

        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('DeleteOrder')
            .setLabel('حذف الطلب')
            .setStyle('SECONDARY'), 
        )
        const Log = await interaction.guild.channels.fetch(settings.Orders.devss.room)
        await Log.send({content : `<@&${settings.Orders.devss.role}>` , embeds : [embed] , components : [buttons]})
        await Log.send({files : [settings.ServerInfo.line]})

       
    }
});

//// تصاميم 

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton() && !interaction.isModalSubmit()) return;

    const { customId } = interaction;

    if (customId == 'Tsamem') {

        const OrderModal = new Modal()
            .setCustomId('OrderModalTsamem')
            .setTitle('اكمال عملية الطلب');
        const request = new TextInputComponent()
            .setCustomId('request')
            .setLabel("ما هو طلبك؟")
            .setStyle('PARAGRAPH');
        const firstActionRow = new MessageActionRow().addComponents(request);
        OrderModal.addComponents(firstActionRow);

        await interaction.showModal(OrderModal)
    } else if (customId == 'OrderModalTsamem') {
        const Order = interaction.fields.getTextInputValue(`request`);
        await interaction.reply({content : `تم ارسال طلبك بنجاح  | ✅`, ephemeral : true})

        const embed = createEmbed({
            interaction : interaction , 
            title : `طلب جديد`, 
            description: `- صاحب الطلب : ${interaction.user}\n\n\`\`\`${Order}\`\`\``,
        })

        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
            .setCustomId('DeleteOrder')
            .setLabel('حذف الطلب')
            .setStyle('SECONDARY'), 
        )
        const Log = await interaction.guild.channels.fetch(settings.Orders.tsamem.room)
        await Log.send({content : `<@&${settings.Orders.tsamem.role}>` , embeds : [embed], components: [buttons]})
        await Log.send({files : [settings.ServerInfo.line]})

       
    }
});



client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId == 'DeleteOrder') {
        if (!interaction.member.roles.cache.has(settings.Admins.DiscordStaff)) return;

        await interaction.message.delete();
    }
});
