import { runCompile } from './commands/compile.js';
import { runDoctor } from './commands/doctor.js';
import { runInit } from './commands/init.js';
import { runTool } from './commands/run.js';
import fs from 'node:fs/promises';
import path from 'node:path';

const HELP = `Futaba Context

Usage:
  futaba init [--agent codex|claude|codex,claude] [--target PATH]
  futaba compile [--agent codex|claude|codex,claude] [--target PATH]
  futaba doctor [--target PATH]
  futaba run <tool-name> [...arguments]
  futaba help
`;

export async function main(argv) {
  const [command = 'help', ...args] = argv;

  switch (command) {
    case 'init':
      return runInit(args);
    case 'compile':
      return runCompile(args);
    case 'doctor':
      return runDoctor(args);
    case 'run':
      return runTool(args);
    case 'help':
    case '--help':
    case '-h':
      console.log(HELP);
      return;
    case '--version':
    case '-v': {
      const { packageRoot } = await import('./core/paths.js');
      const packageJson = JSON.parse(await fs.readFile(path.join(packageRoot, 'package.json'), 'utf8'));
      console.log(packageJson.version);
      return;
    }
    default:
      throw new Error(`unknown command: ${command}\n\n${HELP}`);
  }
}
