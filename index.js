const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./conf');
const fs = require('fs');

const regex = /math/i;

client.on('ready', () => {
    console.log("ready to fuck up someones shit!");
});

client.on('message', msg => {
    if (msg.author.id === config.discord.userToTarget && regex.test(msg.content)) {
        const rand = Math.random();
        if (rand > 0.1) {
            msg.reply(`Lets see how ${msg.author.username} will solve this mathematical problem!`);
        } else {
            randImg((err, img) => {
                msg.channel.send('Its ok you\'re having problems. We all do. Have a cat :)', {
                    files: [img]
                });
            })
        }
    }
});

const randImg = (cb) => {
    fs.readdir('./pics', (err, files) => {
        if (err) { console.error(err); }
        else { cb(null, `./pics/${files[Math.floor(Math.random() * files.length - 1)]}`); }
    });
};

client.login(config.discord.token);
