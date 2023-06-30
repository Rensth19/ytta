require("dotenv/config");
const { Client, Message, MessageEmbed } = require("discord.js");
const client = new Client({
    intents: 32767
})
const samp = require("samp-query")
const prefix = "!"

client.on("ready", () => {
    console.log("Ready")
})

client.on("messageCreate", (message) => {
    const args = message.content.slice(prefix.length).split(/ +/g)
    const command = args.shift().toLowerCase();

    if(command === "samp") {
        const split = args.join(" ").split(":")
        if(!split[0] || !split[1]) return message.reply("Harus Termasuk Ip dan port 127.1.1.1:7777");

        const options = {
            host: split[0],
            port: split[1]
        }
        samp(options, function(error, response) {
            if(error) {
                return message.reply("Error")
            } else {
                return message.reply({ embeds: [new MessageEmbed().setColor("RANDOM").setTitle(response["hostname"]).setThumbnail("https://i.imgur.com/QYeGxrV.png") .addField("Gamemode", `${response["gamemode"]}`)
                .addField("Server Status", `:online: Online`)
                .addField("Mapname", `${response["mapname"]}`)
                .addField("Version", `${response["rules"].version}`)
                .addField("Players", `${response["online"]}/${response["maxplayers"]}`)
                .addField("Website", `${response["rules"].weburl}`)
                .addField("Time", `${response["rules"].worldtime}`)
                .addField("Map", `${response["rules"].mapname}`)] })
            }
        })
        
    }
})

client.login("MTA2ODUzNDkzMjIxNDkxNTI1Mw.GyHcq5.dUnJD5AUOCMaVhqiQ08c4eZlJbYR8KxDGexY0o"); 

