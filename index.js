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
    GatewayIntentBits.GuildMembers,
  ],
});
//Log in bot
bot.login(process.env.DISCORD_BOT_TOKEN);

//Bot working message
bot.on('ready', () => {
  console.log(`${bot.user.username} is up and running!`);
});

//Reply to user message
bot.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!ping")) {
    return message.reply("I am working!");
  }
});
