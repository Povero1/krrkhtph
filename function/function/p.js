const Canvas = require('@napi-rs/canvas');
const { MessageAttachment } = require('discord.js');
const { settings } = require('./../../index');
const path = require('path');


async function createImage(member, guildIconURL, followers, coinsUser) {
    const canvas = Canvas.createCanvas(604, 604);
    const context = canvas.getContext('2d');
    const background = await Canvas.loadImage(settings.خلفية_البروفايل);
    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(member.displayAvatarURL({ format: 'png', size: 256 }));
    const SizeAvatar = 175;


    const fontPath = path.join(__dirname, './../../fonts/Tajawal-ExtraBold.ttf');
    Canvas.GlobalFonts.registerFromPath(fontPath, 'Tajawal ExtraBold' );


    context.fillStyle = "#ffffff";
    context.font = '30px Tajawal ExtraBold';
    context.textBaseline = "middle";
    context.textAlign = "left";
    context.fillText(member.username, 20, 331); 
    


    const buffer = await canvas.encode('png');

    return {
        buffer: buffer,
        type: 'image/png', // نوع الملف
        name: 'profile-image.png' // اسم الملف
    };
}

module.exports = createImage;

