import * as fs from 'node:fs/promises';
import { join, sep } from 'node:path';
import * as process from 'node:process';
import url from 'node:url';

import { minimatch } from 'minimatch';

import { walk } from '../utils/index.mts';
import { generateDeclaration } from './gen.mts';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const cssModulePattern = new minimatch.Minimatch('**/*.module.less');
const dtsPattern = new minimatch.Minimatch('**/*.module.less.d.ts');

async function fileExist(p: string): Promise<boolean> {
  try {
    await fs.stat(p);
    return true;
  } catch (err: unknown) {
    // @ts-expect-error
    if (err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
}

async function generateForCssModuleFile(p: string) {
  const dstPath = p + '.d.ts';
  let write = false;
  const src = await fs.readFile(p);
  const generated = await generateDeclaration(p, src.toString('utf-8'));
  if (await fileExist(dstPath)) {
    const dst = (await fs.readFile(dstPath)).toString('utf-8');
    if (dst !== generated) {
      write = true;
      console.log('updating', dstPath);
      await fs.writeFile(dstPath, generated);
    }
  } else {
    write = true;
    console.log('create', dstPath);
    await fs.writeFile(dstPath, generated);
  }

  return { dstPath, write };
}

async function main() {
  const dir = join(__dirname, '../..', 'packages/website');

  const expectedDST = new Set<string>();
  for await (const p of walk(dir)) {
    if (p.includes(`${sep}node_modules${sep}`)) {
      continue;
    }

    if (cssModulePattern.match(p)) {
      const { dstPath } = await generateForCssModuleFile(p);
      expectedDST.add(dstPath);
    }
  }

  // remove orphan
  for await (const p of walk(dir)) {
    if (p.includes(`${sep}node_modules${sep}`)) {
      continue;
    }

    if (dtsPattern.match(p)) {
      if (!expectedDST.has(p)) {
        console.log('remove orphan dts', p);
        await fs.unlink(p);
      }
    }
  }
}

async function onFiles(files: string[]) {
  for (const file of files) {
    if (cssModulePattern.match(file)) {
      const { write } = await generateForCssModuleFile(file);
      if (write) {
        console.error(`${file}.d.ts is updated, try again`);
        process.exit(1);
      }
    } else if (dtsPattern.match(file)) {
      const sourceFileExist = await fileExist(file.slice(0, file.length - '.d.ts'.length));
      if (!sourceFileExist) {
        console.error('please remove file ' + file);
        process.exit(1);
      }
    }
  }
}

if (process.argv.length === 2) {
  // @ts-expect-error
  await main();
} else {
  // with filenames
  // @ts-expect-error
  await onFiles(process.argv.slice(2));
}
