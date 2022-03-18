import { Wiki, WikiArrayItem, WikiItem, WikiItemType } from './types'
import {
  ArrayItemWrappedError,
  ArrayNoCloseError,
  ExpectingNewFieldError,
  ExpectingSignEqualError,
  GlobalPrefixError,
  GlobalSuffixError,
  WikiSyntaxError
} from './error'

/* should start with `{{Infobox` and end with `}}` */
const prefix = '{{Infobox'
const suffix = '}}'

export default function parse (s: string): Wiki {
  const wiki: Wiki = { type: '', data: [] }

  const strTrim = s.trim().replace(/\r\n/g, '\n')

  if (!strTrim.startsWith(prefix)) {
    throw new WikiSyntaxError(null, null, GlobalPrefixError)
  }
  if (!strTrim.endsWith(suffix)) {
    throw new WikiSyntaxError(null, null, GlobalSuffixError)
  }

  wiki.type = parseType(strTrim)

  /* split content between {{Infobox xxx and }} */
  const fields = strTrim.split('\n').slice(1, -1)

  let inArray = false
  for (let i = 0; i < fields.length; ++i) {
    const line = fields[i].trim()
    const lino = i + 1

    if (line === '') {
      continue
    }
    /* new field */
    if (line[0] === '|') {
      if (inArray) {
        throw new WikiSyntaxError(lino, line, ArrayNoCloseError)
      }
      const meta = parseNewField(lino, line)
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
        throw new WikiSyntaxError(lino, line, ArrayNoCloseError)
      }
      wiki.data[wiki.data.length - 1]!.values!.push(
        new WikiArrayItem(
          ...parseArrayItem(lino, line)
        )
      )
    } else {
      throw new WikiSyntaxError(lino, line, ExpectingNewFieldError)
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

const parseNewField = (lino: number, line: string): [string, string, WikiItemType] => {
  const str = line.slice(1)
  const index = str.indexOf('=')

  if (index === -1) {
    throw new WikiSyntaxError(lino, line, ExpectingSignEqualError)
  }

  const key = str.slice(0, index).trim()
  const value = str.slice(index + 1).trim()
  switch (value) {
    case '{':
      return [key, '', 'array']
    default :
      return [key, value, 'object']
  }
}

const parseArrayItem = (lino: number, line: string): [string, string] => {
  if (line[0] !== '[' || line[line.length - 1] !== ']') {
    throw new WikiSyntaxError(lino, line, ArrayItemWrappedError)
  }
  const content = line.slice(1, line.length - 1)
  const index = content.indexOf('|')
  if (index === -1) {
    return ['', content.trim()]
  }
  return [content.slice(0, index).trim(), content.slice(index + 1).trim()]
}
