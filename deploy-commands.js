require("dotenv").config();

const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("todo")
    .setDescription("TODO操作")
    .addSubcommand(sub =>
      sub
        .setName("add")
        .setDescription("Issueを追加")
        .addStringOption(option =>
          option
            .setName("title")
            .setDescription("Issueタイトル")
            .setRequired(true)
        )
    )
].map(command => command.toJSON());

const rest = new REST({ version: "10" })
  .setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands }
    );

    console.log("コマンド登録完了");
  } catch (error) {
    console.error(error);
  }
})();