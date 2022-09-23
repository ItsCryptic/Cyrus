module.exports  = {
    name: 'messageCreate',
    once: false,
    execute(message, client) {
        if (message.content.includes("@here") || message.content.includes("@everyone") || message.type == "REPLY") return false;
    
        if (message.mentions.has(client.user.id)) {
            message.channel.send("Howdy!");
        }
    }
}
