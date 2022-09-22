const { Client, GatewayIntentBits } = require('discord.js');
const fs = require("fs");
const path = require('path')
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers]});
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file =>  file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
/*client.on("messageCreate", (message) => {
        if (message.author.bot) return false;
    
        if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;
    
        if (message.mentions.has(client.user.id)) {
            message.channel.send("Howdy!");
        }
    });*/

client.login(token);