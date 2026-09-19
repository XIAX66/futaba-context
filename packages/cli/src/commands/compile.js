import { parseCompileArgs } from '../core/args.js';
import { compileProject } from '../core/compiler.js';

export async function runCompile(args) {
  const options = parseCompileArgs(args);
  const outputs = await compileProject(options);
  console.log(`Compiled ${outputs.length} file${outputs.length === 1 ? '' : 's'} into ${options.target}`);
}
