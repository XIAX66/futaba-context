import fs from 'node:fs/promises';
import { parseCompileArgs } from '../core/args.js';
import { compileProject } from '../core/compiler.js';

export async function runInit(args) {
  const options = parseCompileArgs(args);
  await fs.mkdir(options.target, { recursive: true });
  const outputs = await compileProject(options);
  console.log(`Futaba initialized ${options.agents.join(' + ')} in ${options.target}`);
  console.log(`Generated ${outputs.length} file${outputs.length === 1 ? '' : 's'}.`);
}
