//　コマンドの関数を定義をするファイル
const octokit = require("./github");

async function createIssue(title) {
  const { data } = await octokit.issues.create({
    owner: process.env.OWNER,
    repo: process.env.REPO,
    title,
  });

  return data;
}

async function viewIssue() {
  const { data } = await octokit.issues.listForRepo({
    owner: process.env.OWNER,
    repo: process.env.REPO,
    state: "open",
    per_page: 100,
  });

  return data;
}

async function completeIssue(title) {
  const { data: issues } = await octokit.issues.listForRepo({//リポジトリ内のisuueの一覧を取得
    owner: process.env.OWNER,
    repo: process.env.REPO,
    state: "open", //未完了のissueのみを取得
    per_page: 100, //1度に100件まで
  });

  const issue = issues.find(issueItem => issueItem.title === title);
  if (!issue) {
    throw new Error(`Issue not found: ${title}`);
  }

  const { data } = await octokit.issues.update({
    owner: process.env.OWNER,
    repo: process.env.REPO,
    issue_number: issue.number,
    state: "closed",
  });

  return data;
}

module.exports = {
  createIssue,
  completeIssue,
  viewIssue,
};