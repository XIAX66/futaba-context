import path from 'node:path';
import { copySkills, readCombinedMarkdown, writeManagedMarkdown } from '../core/files.js';

export async function compileCodex(context, target) {
  const rules = await readCombinedMarkdown(context.rules);
  const entry = path.join(target, 'AGENTS.md');
  await writeManagedMarkdown(entry, 'Futaba shared rules', rules || 'No shared rules configured.');

  return [
    entry,
    ...await copySkills(context.skills, path.join(target, '.agents', 'skills')),
  ];
}
