# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Discord bot that manages a single GitHub repository's issues as a TODO list, via slash commands. It's a thin bridge: Discord slash command → `issueService.js` → Octokit → GitHub Issues API.

## Commands

```
npm install              # install dependencies
node deploy-commands.js  # register/update the /todo slash command with Discord (run once, or after changing command definitions)
node index.js            # start the bot
```

There is no test suite (`npm test` is a stub) and no lint/build step configured.

## Environment

Configuration is via a `.env` file (gitignored, not present in repo — must be created locally):

- `DISCORD_TOKEN` — bot token, used by both `index.js` (login) and `deploy-commands.js` (command registration)
- `CLIENT_ID` — Discord application ID, used only by `deploy-commands.js`
- `GITHUB_TOKEN` — GitHub personal access token, used by `github.js` (Octokit auth)
- `OWNER` / `REPO` — the single GitHub repo (owner/name) that all issue operations target, used by `issueService.js`

## Architecture

- [github.js](github.js) — creates and exports a single authenticated Octokit instance.
- [issueService.js](issueService.js) — all GitHub issue operations (`createIssue`, `completeIssue`, `viewIssue`). `completeIssue` accepts either an issue number (digits-only string) or an exact title match against open issues, then closes it. `viewIssue` returns open issues sorted ascending by issue number.
- [embeds.js](embeds.js) — builds the Discord Embed used to render the current open-issue list (`buildIssueListEmbed`).
- [deploy-commands.js](deploy-commands.js) — one-time/on-change script that registers the `/todo` slash command (with subcommands `add`, `complete`, `view`) with Discord's REST API. Run this separately from the bot process whenever the command shape changes.
- [index.js](index.js) — the running bot process. Logs in, listens for `InteractionCreate`, dispatches on `interaction.options.getSubcommand()` for the `todo` command (`add`/`complete`/`view`), and replies in Japanese. `add` and `complete` also re-fetch and show the current issue list (via `buildIssueListEmbed`) alongside the result, so users always see the current TODO state without a separate `view` call.

Command definitions in `deploy-commands.js` and the dispatch logic in `index.js` must be kept in sync manually — subcommand names/options are duplicated between the two files with nothing enforcing consistency (e.g. the `complete` subcommand's option is named `target` in both).

Since `completeIssue` falls back to title match only when the input isn't all digits, issue titles used with `/todo complete` must exactly match the title used in `/todo add`, and purely numeric titles cannot be targeted by title (they'll be treated as an issue number).

# Language Rules

回答には日本語を使用してください(use japanese)
