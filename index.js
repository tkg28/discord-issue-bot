require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Events
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, () => {
  console.log("Bot起動");
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "todo") {
    const sub = interaction.options.getSubcommand();

    if (sub === "add") {
      const title =
        interaction.options.getString("title");

      await interaction.reply(
        `受け取りました: ${title}`
      );
    }
  }
});

client.login(process.env.DISCORD_TOKEN);