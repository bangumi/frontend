import fs from 'node:fs';
import path from 'node:path';

import fse from 'fs-extra';

const uploadedFunctions = path.resolve('sites', 'functions');
fs.rmSync(uploadedFunctions, { force: true, recursive: true });
fse.copySync('packages/website/public/functions', uploadedFunctions);
