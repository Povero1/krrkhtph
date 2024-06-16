const { Intents, Collection, Client, GuildMember, MessageActionRow, WebhookClient,MessagePayload, GatewayIntentBits, MessageSelectMenu, Modal, MessageEmbed,MessageButton, MessageAttachment, Permissions, TextInputComponent} = require('discord.js');
const { client, db ,dbTickets ,  settings} = require('../../index');
const Roles = require('../../config/Roles')
const { createEmbed  } = require('../../function/function/Embed')
const checkCredits = require('../../function/function/checkCredits')
client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'select_Buy') {
        const selectedValue = interaction.values[0];

        if (selectedValue === 'Buy_Role') {
            const rolesData = Roles.Roles;
            const roleOptions = await Promise.all(rolesData.map(async role => {
                const guild = interaction.guild;
                const discordRole = await guild.roles.fetch(role.roleID).catch(() => null);

                return {
                    label: discordRole ? discordRole.name : 'Unknown Role',
                    value: role.roleID,
                    description: `سعرها : ${role.price}`,
                };
            }));
            const but = new MessageActionRow().addComponents(
                new MessageButton()
                .setCustomId('CancelButton')
                .setLabel('الغاء العملية ؟')
                .setStyle('DANGER')
            )

            const row = new MessageActionRow()
                .addComponents(
                    new MessageSelectMenu()
                        .setCustomId('RolesBuy')
                        .setPlaceholder(`اختار الرتبة الي عاوز تشتريها من هنا ${interaction.user.displayName}`)
                        .addOptions(roleOptions),
                );

            await interaction.update({ embeds : [interaction.message.embeds[0].setDescription(`اختار الرتبة الي محتاج تشتريها 😊`)], components: [row,but] });
        }

    } else if (interaction.isSelectMenu() && interaction.customId === 'RolesBuy') {

        const selectedRoleID = interaction.values[0];
        const selectedRole = Roles.Roles.find(role => role.roleID === selectedRoleID);

        if (selectedRole) {
            const tax = Math.floor(selectedRole.price * (20 / 19) + 1);

            const RoleInfo = await interaction.guild.roles.cache.get(selectedRole.roleID)
            const options = {
                title: `عملية شراء رتبة ${RoleInfo.name}`,
                image: null,
                color: settings.لون_الامبيد,
                description: `لأكمال عملية شراء الرتبة , يرجي نسخ الكود بالاسفل واتمام عملية التحويل\n\n \`\`\`#credit ${settings.BankID} ${tax}\`\`\``
            };
            
            const embed = createEmbed({
                interaction: interaction,
                title: options.title,
                image: options.image,
                color: options.color,
                description: options.description
            });
            
            

            await interaction.update({embeds : [embed], components: []})
            const options2 = {
                price: selectedRole.price,
                time: 60000,
                bank: settings.BankID,
                probot: settings.Probot,
            };
            
            try {
                const result = await checkCredits(interaction, options2.price, options2.time, options2.bank, options2.probot);
                console.log(result);
                if (result.success) {

                    const DataTicket = await dbTickets.get(`Tickets_Support`)
                    const ExitData = DataTicket?.find((t) => t.Ticket = interaction.channel.id)

                    if (ExitData) {
                        if (ExitData.Buys == null) {
                            ExitData.Buys = `تم شراء رتبة ${RoleInfo.name}`;
                        }
                        await dbTickets.set(`Tickets_Support`, DataTicket);
                    }

                    await interaction.member.roles.add(selectedRole.roleID);
                    await interaction.editReply({
                        embeds: [interaction.message.embeds[0].setDescription(`- عملية شراء رتبة ناجحة ✅\n- لقد اشتريت : ${RoleInfo.name}\n- بسعر : ${selectedRole.price}\n\n- تم اعطائك الرتبة , لازم تشيك ع القوانين قبل متعرض منتجاتك`)],
                        components: [],
                    });

                    const Log = await interaction.guild.channels.cache.get(settings.Rooms.LogRoles)
                    if (Log){
                        const embed = createEmbed(interaction, `عملية شراء رتبة ناجحة`, null, options.colorEm, `
- تم عملية شراء رتبة بنجاح , التفاصيل : 
- الشخص : ${interaction.user}
- السعر : ${selectedRole.price}
- الوقت : <t:${Math.floor(Date.now() / 1000)}:R>
 `);
            
                        await Log.send({embeds : [embed]})
                    }


                } else {
                    await interaction.editReply({
                        embeds: [interaction.message.embeds[0].setDescription(`لقد انتهى الوقت، لا تقم بالتحويل ${interaction.user}`)],
                        components: [],
                    });
                }
            } catch (error) {
                console.error(error);
                interaction.editReply('حدث خطأ ');
            }

        }
    }
});
