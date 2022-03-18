import { Wiki, WikiArrayItem, WikiItem, WikiItemType } from './types'
import {
  ArrayItemWrappedError,
  ArrayNoCloseError,
  ExpectingSignEqualError,
  GlobalPrefixError,
  GlobalSuffixError, WikiSyntaxError
} from './error'

/* should start with `{{Infobox` and end with `}}` */
const prefix = '{{Infobox'
const suffix = '}}'

export default function parse (s: string): Wiki {
  const wiki: Wiki = { type: '', data: [] }

  const strTrim = s.trim().replace(/\r\n/g, '\n')

  if (!strTrim.startsWith(prefix)) {
    throw new WikiSyntaxError(strTrim[0], 0, GlobalPrefixError)
  }
  if (!strTrim.endsWith(suffix)) {
    throw new WikiSyntaxError(strTrim[strTrim.length - 1], strTrim.length - 1, GlobalSuffixError)
  }

  wiki.type = parseType(strTrim)

  /* split content between {{Infobox xxx and }} */
  const fields = strTrim.split('\n').slice(1, -1)

  let inArray = false
  for (let i = 0; i < fields.length; ++i) {
    const line = fields[i].trim()

    if (line === '') {
      continue
    }
    /* new field */
    if (line[0] === '|') {
      if (inArray) {
        throw new WikiSyntaxError(line, i, ArrayNoCloseError)
      }
      const meta = parseNewField(line)
      inArray = meta[2] === 'array'
      const field = new WikiItem(...meta)
      wiki.data.push(field)
      /* is Array item */
    } else if (inArray) {
      if (line[0] === '}') {
        inArray = false
        continue
      }
      if (i === fields.length - 1) {
        throw new WikiSyntaxError(line, i, ArrayNoCloseError)
      }
      wiki.data[wiki.data.length - 1]!.values!.push(
        new WikiArrayItem(
          ...parseArrayItem(line, i)
        )
      )
    } else {
      throw new WikiSyntaxError(line, i, ExpectingSignEqualError)
    }
  }
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
    case '{':
      return [key, '', 'array']
    default :
      return [key, value, 'object']
  }
}

const parseArrayItem = (line: string, lino: number): [string, string] => {
  if (line[0] !== '[' || line[line.length - 1] !== ']') {
    throw new WikiSyntaxError(line, lino, ArrayItemWrappedError)
  }
  const content = line.slice(1, line.length - 1)
  const index = content.indexOf('|')
  if (index === -1) {
    return ['', content.trim()]
  }
  return [content.slice(0, index).trim(), content.slice(index + 1).trim()]
}
