//Dependencies
const { Client, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");

//Load environment variables
dotenv.config();

//Create bot instance
const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
})
//Log in bot
bot.login(process.env.DISCORD_BOT_TOKEN);
