# Architecture

Futaba has three layers:

1. **Context sources** live in `framework-src` and `.futaba`.
2. **The compiler** lives in `packages/cli`.
3. **Agent-native output** is written into a target repository.

## Source responsibilities

| Source | Responsibility |
| --- | --- |
| `framework-src/skills` | Reusable, task-specific agent capabilities |
| `framework-src/agents` | Canonical specialized-agent definitions |
| `.futaba/shared-rules` | Small rules that apply to every task |
| `.futaba/workflows` | Multi-step processes composed from skills and tools |
| `.futaba/tools` | Scripts exposed through `futaba run` |
| `.futaba/hooks` | Lifecycle automation compiled for capable agents |

Long reference material should live beside the skill that uses it. Keeping it
out of shared rules prevents every session from loading unnecessary context.

## Compilation

The compiler first loads all canonical sources into a small intermediate model.
Each adapter then renders that model into native files.

```text
framework-src + .futaba
          |
    intermediate model
       /          \
  Codex adapter   Claude Code adapter
```

The first release compiles shared rules and skills for both agents. Claude Code
agent definitions are also copied to `.claude/agents`. Workflows, tools, hooks,
and richer subagent conversion can be added without changing the source model.

Generated sections use `futaba:start` and `futaba:end` markers. The compiler
updates only the managed section and preserves project-owned content around it.
