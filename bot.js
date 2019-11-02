const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const roll = require('./roll.js');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
      msg.reply('pong');
    }
    if (msg.content.startsWith('roll ')) {
        msg.reply(msg.content + ': ' + roll.roll(msg.content.substr(5), console.log));
    }
  });

client.login(auth.token);