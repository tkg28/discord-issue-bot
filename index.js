require("dotenv").config();
const { createIssue, completeIssue, viewIssue } = require("./issueService");

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

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "todo") {
    const sub = interaction.options.getSubcommand();

    if (sub === "add") {
      const title =
        interaction.options.getString("title");

     try {
        const issue = await createIssue(title);
        await interaction.reply(
    `Issue ${issue.number} を作成しました\n${issue.html_url}`
  );
} catch (error) {
  console.error(error);

  await interaction.reply(
    "Issue作成に失敗しました"
  );
}
    }

    if (sub === "complete") {
          const title =
            interaction.options.getString("title");
      try {
            const issue = await completeIssue(title);
            await interaction.reply(
        `Issue ${issue.number} を完了しました\n${issue.html_url}`
      );
    } catch (error) {
      console.error(error);

      await interaction.reply(
        "Issue完了に失敗しました"
      );
    }
        
    }
        if (sub === "view") {

     try {
        const issue = await viewIssue();
        await interaction.reply(`${issue}view一覧を表示しました。`);
  } catch (error) {
    console.error(error);

  await interaction.reply(
    "Issue表示に失敗しました"
  );
}
    }

  }
});

client.login(process.env.DISCORD_TOKEN);