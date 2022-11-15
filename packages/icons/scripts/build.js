const { readdir, readFile, writeFile, mkdir, access, constants } = require('fs/promises')
const { resolve, join } = require('path')
const { transform } = require('@svgr/core')
const { rmSync } = require('fs')

const OUT_DIR = resolve('./dist')
const capitalize = (str) => str[0].toUpperCase() + str.slice(1)

async function main () {
  try {
    await access(OUT_DIR, constants.F_OK)
    rmSync(OUT_DIR, { force: true, recursive: true })
  } catch (error) {
  }

  await mkdir(OUT_DIR)

  try {
    const icons = await readdir('./assets/')
    let indexContent = ''

    for (const icon of icons) {
      const [filename] = icon.split('.')
      const defaultName = filename.split('-').map(capitalize).join('')
      const svg = (await readFile(resolve('./assets', icon))).toString()

      const svgComponents = await transform(svg)
      const svgComponentsDts = `import * as React from 'react';
declare function ${defaultName}(props: React.ComponentProps<'svg'>): JSX.Element;
export default ${defaultName};
`
      indexContent += `export { default as ${defaultName} } from "./${filename}.jsx"\n`

      // create jsx
      await writeFile(join(OUT_DIR, `${filename}.jsx`), svgComponents)
      await writeFile(join(OUT_DIR, `${filename}.d.ts`), svgComponentsDts)
    }

    // export all svg
    await writeFile(join(OUT_DIR, 'index.js'), indexContent, { encoding: 'utf-8' })
    await writeFile(join(OUT_DIR, 'index.d.ts'), indexContent, { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

main()
