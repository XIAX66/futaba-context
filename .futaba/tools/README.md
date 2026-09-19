# Tools

Tools are scripts that agents invoke through a stable command:

```bash
futaba run <tool-name> [...arguments]
```

Create `.futaba/tools/<tool-name>/tool.json`:

```json
{
  "name": "tool-name",
  "entry": "index.mjs",
  "description": "What the tool does"
}
```

Place the executable module beside `tool.json`. The CLI resolves the package
path, so skills never need to know where npm installed Futaba.
