const { EmbedBuilder } = require("discord.js");

function buildIssueListEmbed(issues) {
  const embed = new EmbedBuilder()
    .setTitle("📋 未完了のTodoリスト")
    .setColor(0x2ecc71);

  if (issues.length === 0) {
    embed.setDescription("Issueはありません。");
  } else {
    embed.setDescription(
      issues.map(issue => `**#${issue.number}** ${issue.title}`).join("\n")
    );
  }

  return embed;
}

module.exports = { buildIssueListEmbed };
