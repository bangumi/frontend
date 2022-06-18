import { convert } from './convert'
import { Parser } from './parser'
import { CodeNodeTypes, NodeTypes } from './types'

const escapeHTML = (str: string): string =>
  str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#039;')

function renderProps (
  props: Record<string, string | boolean> | undefined
): string {
  if (!props) {
    return ''
  }
  return Object.keys(props).reduce((pre, key) => {
    let val: boolean | string = props[key]
    if (typeof val === 'boolean') {
      val = val ? 'key' : ''
    } else {
      val = `${key}="${escapeHTML(val)}"`
    }
    return pre + ' ' + val
  }, '')
}

function renderStyle (style: Record<string, string>): string {
  if (!style) {
    return ''
  }
  return Object.keys(style).reduce((pre, key) => {
    let val = style[key]
    val = `${key}:${escapeHTML(val)}`
    if (!pre) {
      return val
    }
    return pre + ';' + val
  }, '')
}

export function renderNode (node: NodeTypes): string {
  let result = ''
  if (typeof node === 'string') {
    result = renderText(node)
  } else {
    const { type, props, children, style, className } = node
    let propsStr = renderProps(props)
    if (style) {
      propsStr += ` style="${renderStyle(style)}"`
    }
    if (className) {
      let clsStr = ''
      if (typeof className === 'string') {
        clsStr = escapeHTML(className)
      } else {
        clsStr = escapeHTML(className.join(' '))
      }
      propsStr += ` class="${clsStr}"`
    }
    if (!children) {
      result = `<${type}${propsStr}/>`
    } else {
      result = `<${type}${propsStr}>${renderNodes(children)}</${type}>`
    }
  }
  return result
}

function renderText (str: string): string {
  return str.replace(/\n/, '<br/>')
}

export function renderNodes (nodes: NodeTypes[]): string {
  let result = ''
  nodes.forEach((node) => {
    result += renderNode(node)
  })
  return result
}

export function render (rawStr: string): string {
  let result = ''
  const nodes: CodeNodeTypes[] = new Parser(rawStr).parseNodes()
  nodes.forEach((node) => {
    result += renderNode(convert(node))
  })
  return result
}
