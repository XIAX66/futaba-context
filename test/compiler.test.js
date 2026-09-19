import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { compileProject } from '../packages/cli/src/core/compiler.js';

test('compiles Codex and Claude files without copying .futaba', async () => {
  const target = await fs.mkdtemp(path.join(os.tmpdir(), 'futaba-'));
  const outputs = await compileProject({ target, agents: ['codex', 'claude'] });

  assert.ok(outputs.includes(path.join(target, 'AGENTS.md')));
  assert.ok(outputs.includes(path.join(target, 'CLAUDE.md')));
  assert.match(await fs.readFile(path.join(target, 'AGENTS.md'), 'utf8'), /Futaba shared rules/);
  await fs.access(path.join(target, '.agents', 'skills'));
  await fs.access(path.join(target, '.claude', 'skills'));
  await assert.rejects(fs.access(path.join(target, '.futaba')));
});

test('preserves project-owned content around the managed block', async () => {
  const target = await fs.mkdtemp(path.join(os.tmpdir(), 'futaba-'));
  const agentsFile = path.join(target, 'AGENTS.md');
  await fs.writeFile(agentsFile, '# Project instructions\n\nKeep this text.\n');

  await compileProject({ target, agents: ['codex'] });
  await compileProject({ target, agents: ['codex'] });

  const result = await fs.readFile(agentsFile, 'utf8');
  assert.match(result, /Keep this text\./);
  assert.equal((result.match(/<!-- futaba:start -->/g) || []).length, 1);
});
