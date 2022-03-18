import { Wiki, WikiArrayItem, WikiItem, WikiItemType } from './types'

/* should start with `{{Infobox` and end with `}}` */
const prefix = '{{Infobox'
const suffix = '}}'

export default function parse (s: string): Wiki {
  const wiki: Wiki = { type: '', data: [] }

  const strTrim = s.trim()

  if (!strTrim.startsWith(prefix)) {
    throw (new Error('missing prefix \'{{Infobox\' at the start'))
  }
  if (!strTrim.endsWith(suffix)) {
    throw (new Error('missing \'}}\' at the end'))
  }

  wiki.type = parseType(strTrim)

  const fields = strTrim.slice(prefix.length, strTrim.length - suffix.length).trim().split('\n')

  let inArray = false
  for (let line of fields) {
    line = line.trim()
    if (line === '') {
      continue
    }
    /* new field */
    if (line[0] === '|') {
      if (inArray) {
        throw (new Error("array should be closed by '}'"))
      }
      const meta = parseNewField(line)
      inArray = meta[2] === 'array'
      const field = new WikiItem(...meta)
      wiki.data.push(field)
    } else if (inArray) {
      if (line[0] === '}') {
        inArray = false
        continue
      }
      wiki.data[wiki.data.length - 1]!.values!.push(
        new WikiArrayItem(
          ...parseArrayItem(line)
        )
      )
    }
  }
  console.log(JSON.stringify(wiki, null, 2))
  return wiki
}

const parseType = (s: string): string => {
  let index = s.indexOf('\n')
  if (index === -1) {
    index = s.indexOf('}') // {{Infobox Crt}}
  }
  return s.slice(prefix.length, index).trim()
}

const parseNewField = (line: string): [string, string, WikiItemType] => {
  const str = line.slice(1)
  const index = str.indexOf('=')
  const key = str.slice(0, index).trim()
  const value = str.slice(index + 1).trim()
  switch (value) {
    case '':
      return [key, '', 'null']
    case '{':
      return [key, '', 'array']
    default :
      return [key, value, 'object']
  }
}

const parseArrayItem = (line: string): [string, string] => {
  if (line[0] !== '[' || line[line.length - 1] !== ']') {
    throw (new Error('array item should be wrapped by \'[]\''))
  }
  const content = line.slice(1, line.length - 1)
  const index = content.indexOf('|')
  if (index === -1) {
    return ['', content]
  }
  return [content.slice(0, index).trim(), content.slice(index + 1).trim()]
}
