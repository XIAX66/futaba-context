import path from 'node:path';
import {
  copyAgentDefinitions,
  copySkills,
  readCombinedMarkdown,
  writeManagedMarkdown,
} from '../core/files.js';

export async function compileClaude(context, target) {
  const rules = await readCombinedMarkdown(context.rules);
  const entry = path.join(target, 'CLAUDE.md');
  await writeManagedMarkdown(entry, 'Futaba shared rules', rules || 'No shared rules configured.');

  return [
    entry,
    ...await copySkills(context.skills, path.join(target, '.claude', 'skills')),
    ...await copyAgentDefinitions(context.agentDefinitions, path.join(target, '.claude', 'agents')),
  ];
}
