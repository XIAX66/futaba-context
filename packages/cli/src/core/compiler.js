import path from 'node:path';
import { compileClaude } from '../adapters/claude.js';
import { compileCodex } from '../adapters/codex.js';
import { packageRoot } from './paths.js';

export async function compileProject({ target, agents, sourceRoot = packageRoot }) {
  const context = {
    sourceRoot,
    rules: path.join(sourceRoot, '.futaba', 'shared-rules'),
    workflows: path.join(sourceRoot, '.futaba', 'workflows'),
    skills: path.join(sourceRoot, 'framework-src', 'skills'),
    agentDefinitions: path.join(sourceRoot, 'framework-src', 'agents'),
  };

  const outputs = [];
  if (agents.includes('codex')) outputs.push(...await compileCodex(context, target));
  if (agents.includes('claude')) outputs.push(...await compileClaude(context, target));
  return outputs;
}
