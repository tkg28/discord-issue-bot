require("dotenv").config();
const { createIssue } = require("./issueService");

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

     try {
  const issue = await createIssue(title);

  await interaction.reply(
    `Issue #${issue.number} を作成しました\n${issue.html_url}`
  );
} catch (error) {
  console.error(error);

  await interaction.reply(
    "Issue作成に失敗しました"
  );
}
    }
  }
});

client.login(process.env.DISCORD_TOKEN);