# Futaba Context

Futaba is a lightweight context compiler for coding agents. It keeps shared
rules, skills, workflows, agent definitions, tools, and hooks in one package,
then compiles them into the native layout expected by each agent.

The initial adapters target Codex and Claude Code.

## Quick start

```bash
npx futaba-context init
```

Choose an adapter explicitly when needed:

```bash
npx futaba-context init --agent codex
npx futaba-context init --agent claude
npx futaba-context init --agent codex,claude
```

Futaba writes only native agent files into the target repository:

```text
AGENTS.md
.agents/skills/
CLAUDE.md
.claude/skills/
.claude/agents/
```

It does not copy its own `.futaba` directory into the target repository.

## Repository layout

```text
packages/cli/       CLI, compiler, and agent adapters
framework-src/      Canonical skills and agent definitions
.futaba/            Shared rules, workflows, tools, hooks, and manifest
```

`framework-src` and `.futaba` are authoring inputs. Both are included in the
published npm package. `futaba init` compiles them into agent-native files.

## Commands

```text
futaba init       Compile context into a repository
futaba compile    Recompile context after an update
futaba doctor     Inspect the generated installation
futaba run        Run a tool shipped with Futaba
```

Run `futaba help` for command options.

## Development

```bash
npm test
npm run check
npm pack --dry-run
```

See [docs/architecture.md](docs/architecture.md) for the compilation model.
See [docs/external-cli.md](docs/external-cli.md) for public CLI tools that
agents can use for source control, CI, deployments, and logs.
