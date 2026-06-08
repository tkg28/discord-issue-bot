const octokit = require("./github");

async function createIssue(title) {
  const { data } = await octokit.issues.create({
    owner: process.env.OWNER,
    repo: process.env.REPO,
    title,
  });

  return data;
}

module.exports = {
  createIssue,
};