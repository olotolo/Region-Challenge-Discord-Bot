//nodemon
const {Client, IntentsBitField, MessageActivityType} = require('discord.js');
const fs = require('node:fs').promises;
const { send } = require('node:process');
const axios = require('axios');

require ('dotenv').config();
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

//Random einfügen
//Current game einfügen




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

//const rndInt = Math.floor(Math.random() * regions.length) + 1
//    console.log(rndInt)

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


async function getData() {
    let fileContent =  await fs.readFile('./data.txt', 'utf8');
    return JSON.parse(fileContent);
}

/*
const getJoke = async (message) => {
    try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Any');
        const joke = response.data;

        if (joke.type === 'single') {
            message.channel.send(joke.joke);
        } else {
            message.channel.send(`${joke.setup}\n${joke.delivery}`);
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
    }
};
*/
client.on('messageCreate', async (message) => {
    if(message.author.bot) {
        return;
    }

    if(message.content.includes("joke")) {
        //getJoke(message);
    }

    if(message.author.id == 187575087329837057) {
        if(message.content == 'RESET') {
            let json = "[]";
            fs.writeFile('./data.txt', json, 'utf8', (err) => {
                if (err) {
                    console.error('Error writing file:', err);
                    return;
                }
            });
            message.channel.send('Stats have been reseted!');
        }
    }

    if(message.content == 'win') {
        userCache.forEach(element => {
            console.log(element);
        });
        ChallengeWon(messageCache, message);
    }

    if(message.content == 'stats') {
        getData().then(data => {
            data.forEach(player => {
                if(player.id == message.author.id) {
                    let m = `<@${message.author.id}>` + "\nWins: " + player.wins + "\n";
                    let i = 0;
                    regions.forEach(region => {
                        m += region + ": " + player.regionWins[i] + "\n"
                        i++;
                    })
                    message.channel.send(m);
                }
            })
        });
        return;
    }
    if(message.content.startsWith('stats')) {
        message.mentions.users.forEach(user => {
            // Optionally, you can get more information about the user
            // For example, fetch the member object if you need more details in a guild
            if (message.guild) {
                message.guild.members.fetch(user.id).then(member => {
                    console.log(`Username: ${member.user.username}`);
                    getData().then(x => {
                        found = false;
                        x.forEach(player => {
                            if(player.id == user.id) {
                                console.log("match!");
                                found = true;
                                let m = `<@${user.id}>` + "\nWins: " + player.wins + "\n";
                                let i = 0;
                                regions.forEach(region => {
                                    m += region + ": " + player.regionWins[i] + "\n"
                                    i++;
                                });
                                message.channel.send(m);
                                return;
                            }
                        });
                        if(!found) {
                            message.channel.send("There are no stats for this person yet");
                        }
                    });
                }).catch(console.error);
            }
        });
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
            sendRegion(i, message);
        }
    }
});



let messageCache;
let userCache = [];
let regionCache;

function sendRegion(id, message) {
    userCache = [];
    regionCache = id;
    message.channel.send({
        content: regions[id], files: [`./images/${images[id]}`]
    }).then(sendMessage => {
        sendMessage.react('✅');
        messageCache = sendMessage;
    });
}

async function ChallengeWon(sentMessage, message) {
    if(messageCache == null || userCache.length == null || regionCache == null) {
        console.log("no game is currently running");
        message.channel.send("There currently is no game running");
        return;
    }
    const reaction = sentMessage.reactions.cache.get('✅');
    if (reaction) {
        try {
            // Fetch the users who reacted with that emoji and wait for it to complete
            const users = await reaction.users.fetch();
            let m = "The Users: ";
            for (const user of users.values()) {
                // Exclude the bot's own reaction
                if (user.id !== client.user.id) {
                    console.log(`User ${user.id} reacted with ✅`);
                    
                    // If you need to perform an asynchronous operation, you can use await here
                    let guild = message.guild;
                    const member = await guild.members.fetch(user.id);
            
                    userCache.push(user.id);
                    m += `<@${user.id}>` + ", ";
                }
            }
            message.channel.send(m + "won");
        } catch (error) {
            console.error(error);
        }
    }

    let jsonObject;
    let jsonString;

    jsonObject = await getData();


    class Person {
        constructor(id, wins, regionWins) {
            this.id = id;
            this.wins = wins;
            this.regionWins = regionWins; // array
        }
    }

    let exists = false;
    userCache.forEach(element => {
        exists = false;
        if(jsonObject == undefined) return;
        jsonObject.forEach(player => {
            //if the user does exist in the saved data
            if(player.id == element) {
                player.wins++;
                player.regionWins[regionCache]++;
                exists = true;
            }
            
        });
        if(!exists) {
            const person = new Person(element, 1, [0,0,0,0,0,0,0,0,0,0,0,0,0]);
            person.regionWins[regionCache]++;
            jsonObject.push(person);
            console.log("added person");
        }
    });

    jsonString = JSON.stringify(jsonObject, null, 4);

    //console.log(jsonString);
    
    fs.writeFile('./data.txt', jsonString, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('File written successfully');
    });





    userCache = [];
    regionCache = null;
    messageCache = null;
}



client.login(process.env.TOKEN);