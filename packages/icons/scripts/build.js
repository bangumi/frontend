const { readdir, readFile, writeFile, mkdir, access, constants } = require('fs/promises')
const { resolve, join } = require('path')
const { transform } = require('@svgr/core')
const { rmSync } = require('fs')

const OUT_DIR = resolve('./dist')
const upperCaseFirst = (str) => str[0].toUpperCase() + str.slice(1)

async function main () {
  try {
    await access(OUT_DIR, constants.F_OK)
    rmSync(OUT_DIR, { force: true, recursive: true })
  } catch (error) {
  }

  await mkdir(OUT_DIR)

  try {
    const icons = await readdir('./assets/')
    for (const icon of icons) {
      const [filename] = icon.split('.')
      const defaultName = filename.split('-').map(upperCaseFirst).join('')
      const svg = (await readFile(resolve('./assets', icon))).toString()

      const svgComponents = await transform(svg)
      const svgComponentsDts = `import * as React from 'react';
declare function ${defaultName}(props: React.ComponentProps<'svg'>): JSX.Element;
export default ${defaultName};
`
      await writeFile(join(OUT_DIR, `${filename}.jsx`), svgComponents)
      await writeFile(join(OUT_DIR, `${filename}.d.ts`), svgComponentsDts)
    }

    const indexContent = icons.map((icon) => {
      const [filename] = icon.split('.')
      const defaultName = filename.split('-').map(upperCaseFirst).join('')
      return `export { default as ${defaultName} } from "./${filename}.jsx"`
    }).join('\n')

    await writeFile(join(OUT_DIR, 'index.js'), indexContent, { encoding: 'utf-8' })
    await writeFile(join(OUT_DIR, 'index.d.ts'), indexContent, { encoding: 'utf-8' })
  } catch (error) {
    console.error(error)
  }
}

main()
