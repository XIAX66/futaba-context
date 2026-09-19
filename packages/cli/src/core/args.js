import path from 'node:path';

export function parseCompileArgs(args) {
  let target = process.cwd();
  let agents = ['codex', 'claude'];

  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (argument === '--target') {
      target = path.resolve(requireValue(args, ++index, '--target'));
    } else if (argument === '--agent') {
      agents = requireValue(args, ++index, '--agent')
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
    } else {
      throw new Error(`unknown option: ${argument}`);
    }
  }

  const supported = new Set(['codex', 'claude']);
  for (const agent of agents) {
    if (!supported.has(agent)) {
      throw new Error(`unsupported agent: ${agent}`);
    }
  }

  return { target, agents: [...new Set(agents)] };
}

export function parseTargetArg(args) {
  let target = process.cwd();
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] !== '--target') {
      throw new Error(`unknown option: ${args[index]}`);
    }
    target = path.resolve(requireValue(args, ++index, '--target'));
  }
  return { target };
}

function requireValue(args, index, option) {
  const value = args[index];
  if (!value || value.startsWith('--')) {
    throw new Error(`${option} requires a value`);
  }
  return value;
}
