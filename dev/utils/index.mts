import * as fs from 'node:fs';
import * as path from 'node:path';

export async function* walk(dir: string): AsyncIterableIterator<string> {
  for await (const d of await fs.promises.opendir(dir)) {
    const entry = path.join(dir, d.name);
    if (d.isDirectory()) {
      yield* walk(entry);
    } else if (d.isFile()) yield entry;
  }
}
