//Dependencies
const { Client, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");
const axios = require("axios");

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
bot.on("ready", () => {
  console.log(`${bot.user.username} is up and running!`);
});

//Reply to user message
bot.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  //Check if bot is working
  if (message.content.startsWith("!ping")) {
    return message.reply("I am working!");
  }

  //Check crypto prices
  if (message.content.startsWith("!price")) {
    const [command, ...args] = message.content.split(" ");

    if (args.length !== 2) {
      return message.reply(
        "You must provide the crypto and the currency to compare with!"
      );
    } else {
      const [coin, vsCurrency] = args;
      try {
        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${vsCurrency}`
        );

        if (!data[coin][vsCurrency]) throw Error();

        return message.reply(
          `The current price of 1 ${coin} = ${data[coin][vsCurrency]} ${vsCurrency}`
        );
      } catch (err) {
        return message.reply(
          "Please check your inputs. For example: !price bitcoin usd"
        );
      }
    }
  }

  if (message.content.startsWith("!news")) {
    try {
      const { data } = await axios.get(
        `https://newsapi.org/v2/everything?q=crypto&apiKey=${process.env.NEWS_API_KEY}&pageSize=1&sortBy=publishedAt`
      );

      const {
        title,
        source: { name },
        description,
        url,
      } = data.articles[0];

      return message.reply(
        `Latest news related to crypto:\n
         Title: ${title}\n
         Description: ${description}\n
         Source: ${name}\n
         Link to full article: ${url}`
      );
    } catch (err) {
      return message.reply("There was an error. Please try again later");
    }
  }

  if (message.content.startsWith("!help")) {
    return message.reply(
      `I support 4 commands:\n
        !price - To check if I am working\n
        !price <coin_name> <compare_currency> - To get the price of a coin with respect to a currency\n
        !news - To get the latest news article related to crypto\n
        !help - For checking out what commands are available`
    );
  }
});
