const Canvas = require('@napi-rs/canvas');
const { MessageAttachment } = require('discord.js');
const { settings } = require('./../../index');
const path = require('path');

async function createProfileImage(user, guildIconURL, followers, coinsUser) {
    const canvas = Canvas.createCanvas(604, 604);
    const context = canvas.getContext('2d');
    const background = await Canvas.loadImage(settings.خلفية_البروفايل);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'png', size: 256 }));
    const SizeAvatar = 175;


    const fontPath = path.join(__dirname, './../../fonts/Tajawal-ExtraBold.ttf');
    Canvas.GlobalFonts.registerFromPath(fontPath, 'Tajawal ExtraBold' );
    const x = 402;
    const y = 102;
    context.save();
    context.beginPath();
    context.arc(x + SizeAvatar / 2, y + SizeAvatar / 2, SizeAvatar / 2, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(avatar, x, y, SizeAvatar, SizeAvatar);
    context.restore();

    const IconServer = await Canvas.loadImage(guildIconURL);
    const SizeIcon = 55;

    const xSer = 46;
    const ySer = 162;
    context.save();
    context.beginPath();
    context.arc(xSer + SizeIcon / 2, ySer + SizeIcon / 2, SizeIcon / 2, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    context.drawImage(IconServer, xSer, ySer, SizeIcon, SizeIcon);
    context.restore();

    const followersText = followers;
    const coinsText = coinsUser;
    const username = user.displayName;

    function formatNumber(num) {
        if (num !== undefined && num !== null) {
            if (num >= 1e6) {
                return (num / 1e6).toFixed(num % 1e5 === 0 ? 0 : 1) + 'm';
            } else if (num >= 1e3) {
                return (num / 1e3).toFixed(num % 1e2 === 0 ? 0 : 1) + 'k';
            } else {
                return num.toString();
            }
        } else {
            return 'N/A';
        }
    }

    context.fillStyle = "#ffffff";
    context.font = '30px Tajawal ExtraBold';
    context.textBaseline = "middle";
    context.textAlign = "left";
    context.fillText(username, 20, 331); // الاسم
    context.fillText(formatNumber(followersText), 20, 442); // فولورز
    context.fillText(formatNumber(coinsText), 20, 544); // نقاط

    const attachment = new MessageAttachment(await canvas.encode('png'), 'profile-image.png');

    return attachment;
}

module.exports = createProfileImage;
