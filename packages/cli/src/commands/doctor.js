import fs from 'node:fs/promises';
import path from 'node:path';
import { parseTargetArg } from '../core/args.js';

export async function runDoctor(args) {
  const { target } = parseTargetArg(args);
  const checks = [
    ['Codex rules', path.join(target, 'AGENTS.md')],
    ['Codex skills', path.join(target, '.agents', 'skills')],
    ['Claude rules', path.join(target, 'CLAUDE.md')],
    ['Claude skills', path.join(target, '.claude', 'skills')],
  ];

  let found = 0;
  for (const [label, file] of checks) {
    const exists = await fs.access(file).then(() => true, () => false);
    console.log(`${exists ? 'ok' : '--'}  ${label}: ${file}`);
    if (exists) found += 1;
  }

  if (found === 0) {
    throw new Error('no Futaba installation found; run `futaba init` first');
  }
}
