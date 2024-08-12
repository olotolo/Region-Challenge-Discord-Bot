//nodemon
const {Client, IntentsBitField, MessageActivityType} = require('discord.js');
require ('dotenv').config();
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const regions = [
    "Bandle", //Bandle City
    "Bilgewater",
    "Demacia",
    "Ionia",
    "Ixtal",
    "Noxus",
    "Piltover",
    "Shadow", //Shadow Isles
    "Shurima",
    "Targon",
    "Freljord", //The Freljord
    "Void", //The Void
    "Zaun"
];

const images = [
    "BandleCity.png",
    "Bilgewater.png",
    "Demacia.png",
    "Ionia.png",
    "Ixtal.png",
    "Noxus.png",
    "Piltover.png",
    "ShadowIsles.png",
    "Shurima.png",
    "Targon.png",
    "Freljord.png",
    "Void.png",
    "Zaun.png"
];
client.on('ready', (c) => {
    console.log(`${c.user.tag} is online`);
});

client.on('messageCreate', (message) => {
    if(message.author.bot) {
        return;
    }
    if(message.content.toLowerCase().includes('regions'.toLowerCase())) {
        let text = "";
        for (var i = 0; i < regions.length; i++) {
            text += regions[i] + "\n";
        }
        message.channel.send(text);
    }
    for(var i = 0; i < regions.length; i++) {
        if(message.content.toLowerCase().includes(regions[i].toLowerCase())) {
            message.channel.send({
                
                content: regions[i], files: [`./images/${images[i]}`]
            });}
        }
    }

);



client.login(process.env.TOKEN);