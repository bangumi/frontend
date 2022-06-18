import { CodeNodeTypes, CodeVNode, EMOJI_ARRAY } from './types'

const INVALID_NODE_MSG = 'invalid node'
const INVALID_STICKER_NODE = 'invalid sticker node'

export const BBCODE_REGEXP = /^\[([a-z]+)(=.+?)?\](.+?)\[\/([a-z]+)\]/

type CheckCharFn = (str: string) => boolean

export class Parser {
  private pos: number
  // 记录上下文
  private readonly ctxStack: Array<{ startIdx: number }>
  private readonly tagStack: string[]
  private readonly validTags: string[]
  constructor (private readonly input: string, tags: string[] = []) {
    this.pos = 0
    this.ctxStack = []
    this.tagStack = []
    // 默认支持的 tag; sticker 为自定义
    const defaultTags = [
      'b',
      'i',
      's',
      'u',
      'mask',
      'color',
      'size',
      'url',
      'img',
      'code',
      'quote',
      'sticker'
    ]
    this.validTags = [...defaultTags, ...tags]
  }

  parseNodes (): CodeNodeTypes[] {
    const nodes: CodeNodeTypes[] = []
    while (true) {
      if (this.eof() || (this.tagStack.length > 0 && this.startsWith('[/'))) {
        break
      }
      nodes.push(this.parseNode())
    }
    return nodes
  }

  parseNode (): CodeNodeTypes {
    this.enterNode()
    let node: CodeNodeTypes = ''
    try {
      switch (this.curChar()) {
        case '(':
          node = this.parseStickerNode()
          break
        case '[':
          node = this.parseBBCodeNode()
          break
        default:
          node = this.parseText()
      }
      this.exitNode()
    } catch (error: any) {
      // console.log(this.input.slice(this.pos), this.curChar());
      // console.log(error);
      if (
        error.message === INVALID_NODE_MSG ||
        error.message === INVALID_STICKER_NODE
      ) {
        const ctx = this.ctxStack.pop()!
        node = this.input.slice(ctx.startIdx, this.pos)
      }
    }
    return node
  }

  // 解析 (bgm38) (bgm1)
  parseStickerNode (): CodeNodeTypes {
    if (!this.startsWith('(bgm')) {
      // 1-16号表情最长为7
      const target = this.input.slice(this.pos, this.pos + 8)
      const emoji = EMOJI_ARRAY.find((s) => target.startsWith(s))
      if (!emoji) {
        this.consumeChar()
        throw new Error(INVALID_STICKER_NODE)
      }
      this.pos += emoji.length
      return {
        type: 'sticker',
        props: {
          stickerId: emoji
        }
      }
    }
    this.pos += 4
    const id = this.consumeWhile((c) => !isNaN(+c))
    if (!id) {
      throw new Error(INVALID_STICKER_NODE)
    }
    const c = this.consumeChar()
    if (c !== ')') {
      throw new Error(INVALID_STICKER_NODE)
    }
    return {
      type: 'sticker',
      props: {
        stickerId: `(bgm${id})`
      }
    }
  }

  // @TODO 暂时只支持 Bangumi 的 bbcode; 不支持 [style size="30px"]Large Text[/style]
  parseBBCodeNode (): CodeNodeTypes {
    let c = this.consumeChar()
    const openTag = this.parseTagName()
    c = this.consumeChar()
    if (![']', '='].includes(c)) {
      throw new Error(INVALID_NODE_MSG)
    }
    let prop: string = ''
    if (c === '=') {
      prop = this.consumeWhile((c) => c !== ']')
      c = this.consumeChar()
    }
    if (openTag === 'code') {
      const idx = this.input.lastIndexOf('[/code]')
      if (idx === -1) {
        throw new Error(INVALID_NODE_MSG)
      }
      const pos = this.pos
      this.pos = idx + 7
      return {
        type: 'code',
        children: [this.input.slice(pos, idx)]
      }
    }
    this.tagStack.push(openTag)
    const children = this.parseNodes()
    this.tagStack.pop()

    this.validateStartStr('[/')
    const closeTag = this.parseTagName()
    if (openTag !== closeTag) {
      throw new Error(INVALID_NODE_MSG)
    }
    this.validateStartStr(']')
    const n: CodeNodeTypes = {
      type: openTag,
      children
    }
    if (prop) {
      n.props = {
        [openTag]: prop
      }
    }
    if (!this.isValidateBBCode(n)) {
      throw new Error(INVALID_NODE_MSG)
    }
    return n
  }

  parseTagName (): string {
    const tag = this.consumeWhile((c) => /[a-zA-Z]/.test(c))
    if (!tag) {
      throw new Error(INVALID_NODE_MSG)
    }
    return tag
  }

  parseText (): string {
    return this.consumeWhile((c) => !['(', '['].includes(c))
  }

  consumeWhile (checkFn: CheckCharFn): string {
    let result = ''
    while (!this.eof() && checkFn(this.curChar())) {
      result += this.consumeChar()
    }
    return result
  }

  consumeChar (): string {
    const cur = this.input[this.pos]
    this.pos += 1
    return cur
  }

  getChildrenStr (tag: string): string {
    let result = ''
    while (!this.eof()) {
      result += this.consumeChar()
    }
    return result
  }

  curChar (): string {
    return this.input[this.pos]
  }

  startsWith (pattern: string | RegExp): boolean {
    if (typeof pattern === 'string') {
      return this.input.slice(this.pos).startsWith(pattern)
    } else {
      return pattern.test(this.input.slice(this.pos))
    }
  }

  eof (): boolean {
    return this.pos >= this.input.length
  }

  enterNode (): void {
    this.ctxStack.push({
      startIdx: this.pos
    })
  }

  exitNode (): void {
    this.ctxStack.pop()
  }

  validateStartStr (str: string): boolean {
    let count = 0
    while (count < str.length) {
      if (this.consumeChar() !== str[count]) {
        throw new Error(INVALID_NODE_MSG)
      }
      count++
    }
    return true
  }

  isValidateBBCode (node: CodeVNode): boolean {
    if (!this.validTags.includes(node.type)) {
      return false
    }
    switch (node.type) {
      case 'img':
        if (!node.children) {
          return false
        }
        break
      case 'url':
        return isValidUrlNode(node)
      default:
        break
    }
    return true
  }
}

function isValidUrlNode (node: CodeVNode): boolean {
  if (node.type !== 'url') {
    return false
  }
  let href = node?.props?.url as string
  if (!href) {
    if (node.children && typeof node.children[0] === 'string') {
      href = node.children[0]
    }
  }
  if (!href) {
    return false
  }
  try {
    ;(() => new URL(href))()
  } catch (error) {
    return false
  }
  return true
}
