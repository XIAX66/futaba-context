import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { packageRoot } from '../core/paths.js';

export async function runTool(args) {
  const [name, ...toolArgs] = args;
  if (!name) throw new Error('usage: futaba run <tool-name> [...arguments]');
  if (!/^[a-z0-9][a-z0-9-]*$/.test(name)) throw new Error(`invalid tool name: ${name}`);

  const toolDirectory = path.join(packageRoot, '.futaba', 'tools', name);
  const manifestFile = path.join(toolDirectory, 'tool.json');
  const manifest = JSON.parse(await fs.readFile(manifestFile, 'utf8').catch((error) => {
    if (error.code === 'ENOENT') throw new Error(`unknown tool: ${name}`);
    throw error;
  }));
  const entry = path.resolve(toolDirectory, manifest.entry);
  if (!entry.startsWith(`${toolDirectory}${path.sep}`)) throw new Error(`invalid entry for tool: ${name}`);

  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [entry, ...toolArgs], { cwd: process.cwd(), stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', (code, signal) => {
      if (signal) reject(new Error(`tool ${name} stopped by ${signal}`));
      else if (code !== 0) reject(new Error(`tool ${name} exited with code ${code}`));
      else resolve();
    });
  });
}
