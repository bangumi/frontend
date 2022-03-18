import path from 'path'
import fs from 'fs'
import parse from '../parser'
import yaml from 'js-yaml'

const files = fs.readdirSync(path.resolve(__dirname, './wiki-syntax-spec/tests/valid'))

describe('Wiki syntax parser', () => {
  files.forEach(file => {
    const prefix = file.split('.')[0]
    const suffix = file.split('.')[1]
    if (suffix === 'yaml') {
      return
    }
    it(`should parse ${prefix}`, () => {
      const testFilePath = path.resolve(__dirname, './wiki-syntax-spec/tests/valid', file)
      const expectedFilePath = path.resolve(__dirname, './wiki-syntax-spec/tests/valid', `${prefix}.yaml`)
      const testContent = fs.readFileSync(testFilePath, 'utf8')
      const expectedContent = fs.readFileSync(expectedFilePath, 'utf8')
      const result = parse(testContent)
      const expected = yaml.load(expectedContent)
      expect(result).toEqual(expected)
    })
  })
})
