const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db , dbTickets,dbCloseTicket ,  settings} = require('../../index');
const discordTranscripts = require('discord-html-transcripts');
const { default: chalk } = require('chalk');

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId == 'CloseTicket') {

        if (!interaction.member.roles.cache.has(settings.Admins.DiscordStaff)) return;

        await interaction.reply({ content: `**جاري حذف التذكرة | ✅**` });

        const transcript = await discordTranscripts.createTranscript(interaction.channel, {
            limit: -1,
            returnType: 'attachment',
            fileName: `${interaction.channel.name}.html`,
            minify: true,
            saveImages: true,
            useCDN: false,
        });

        const transcriptChannel = await client.channels.fetch(settings.Rooms.LogTranscreipt);
        await interaction.editReply({ content: `**جاري انشاء الترانسكريبت |📜**` });

        const msg = await transcriptChannel.send({ files: [transcript] });
        await transcriptChannel.send({ content: `Room ID: ${interaction.channel.id}\nRoom Name: ${interaction.channel.name}\nTime: <t:${Math.floor(Date.now() / 1000)}:R>\n[View Transcript](https://mahto.id/chat-exporter?url=${msg.attachments.first().url})` });

        try {
            const DataTicket = await dbTickets.get('Tickets_Support');
            const DataTicket2 = await dbTickets.get('Tickets_Tashher');

            const E = await DataTicket?.find((t) => t.Ticket == interaction.channel.id);
            if (E) {
                E.type = 'close';
                E.transcrept = `https://mahto.id/chat-exporter?url=${msg.attachments.first().url}`;
                await dbCloseTicket.push('Tickets_Support', E); // نقل البيانات إلى dbCloseTicket
                await dbTickets.set(`Tickets_Support`, DataTicket2.filter(t => t.Ticket !== interaction.channel.id));

            }

            const E2 = await DataTicket2?.find((t) => t.Ticket == interaction.channel.id);
            if (E2) {
                E2.type = 'close';
                E2.transcrept = `https://mahto.id/chat-exporter?url=${msg.attachments.first().url}`;
                await dbCloseTicket.push('Tickets_Tashher', E2); // نقل البيانات إلى dbCloseTicket
                await dbTickets.set(`Tickets_Tashher`, DataTicket2.filter(t => t.Ticket !== interaction.channel.id));
            }

            await interaction.editReply({ content: `**تم حفظ الترانسكريبت وحذف التذكرة |✨**` });

            setTimeout(() => {
                interaction.channel.delete();
            }, 2000);
        } catch (err) {
            console.log(chalk.red(err))
        }
    }
});


client.on('channelDelete', async channel => {
    const DataTicket = await dbTickets.get('Tickets_Support');
    const DataTicket2 = await dbTickets.get('Tickets_Tashher');
    const E2 = await DataTicket2?.find((t) => t.Ticket == channel.id);
    const E = await DataTicket?.find((t) => t.Ticket == channel.id);

    if (E || E2) {
        const transcript = await discordTranscripts.createTranscript(channel, {
            limit: -1,
            returnType: 'attachment',
            fileName: `${channel.name}.html`,
            minify: true,
            saveImages: true,
            useCDN: false,
        });

        const transcriptChannel = await client.channels.fetch(settings.Rooms.LogTranscreipt);

        const msg = await transcriptChannel.send({ files: [transcript] });
        await transcriptChannel.send({ content: `Room ID: ${channel.id}\nRoom Name: ${channel.name}\nTime: <t:${Math.floor(Date.now() / 1000)}:R>\n[View Transcript](https://mahto.id/chat-exporter?url=${msg.attachments.first().url})` });

        if (E) {
            E.type = 'close';
            E.transcrept = `https://mahto.id/chat-exporter?url=${msg.attachments.first().url}`;
            await dbCloseTicket.push('Tickets_Support', E); // نقل البيانات إلى dbCloseTicket
            await dbTickets.delete('Tickets_Support', E); // حذف التذكرة من dbTickets
        }
        if (E2) {
            E2.type = 'close';
            E2.transcrept = `https://mahto.id/chat-exporter?url=${msg.attachments.first().url}`;
            await dbCloseTicket.push('Tickets_Tashher', E2); // نقل البيانات إلى dbCloseTicket
            await dbTickets.delete('Tickets_Tashher', E2); // حذف التذكرة من dbTickets
        }
    }
});