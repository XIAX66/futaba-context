# Contributing

Keep Futaba small and deterministic. Context should be Markdown-first, scripts
should use stable CLI entry points, and adapters should avoid changing files
outside their documented output paths.

Before opening a pull request, run:

```bash
npm run check
npm pack --dry-run
```
