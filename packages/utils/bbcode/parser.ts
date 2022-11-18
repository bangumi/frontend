import { BGM_STICKER_START_STR, EMOJI_ARRAY, MAX_EMOJI_LENGTH } from './constants';
import { CodeNodeTypes, CodeVNode } from './types';

const INVALID_NODE_MSG = 'invalid node';
const INVALID_STICKER_NODE = 'invalid sticker node';

type CheckCharFn = (str: string) => boolean;
type Validator = (value: any, node: CodeVNode) => boolean;

// 也许需要引入  Object schema validation
export interface CustomTag {
  name: string;
  // 校验 props
  schema: Record<string, Validator>;
}

type ITag = CustomTag | string;

// 只有一个 string child
function getStringChild(node: CodeVNode): string | undefined {
  if (!!node.children && node.children.length === 1 && typeof node.children[0] === 'string') {
    return node.children[0];
  }
}

function getNodeProp(node: CodeVNode, prop: string): string | boolean | undefined {
  const props = node.props ?? {};
  return props[prop];
}

function isValidUrl(str: string): boolean {
  try {
    // eslint-disable-next-line no-new
    new URL(str);
  } catch (e: unknown) {
    return false;
  }
  return true;
}

const DEFAULT_TAGS: ITag[] = [
  'b',
  'i',
  's',
  'u',
  'mask',
  {
    name: 'color',
    schema: {
      color: (value) => !!value,
    },
  },
  {
    name: 'size',
    schema: {
      size: (value) => /\d+/.test(value),
    },
  },
  {
    name: 'url',
    schema: {
      url: (value, node) => {
        let href = value;
        if (!href) {
          href = getStringChild(node);
        }
        return isValidUrl(href);
      },
    },
  },
  {
    name: 'img',
    schema: {
      children: (value, node) => {
        const src = getStringChild(node);
        return isValidUrl(src!);
      },
    },
  },
  'sticker',
  'left',
  'right',
  'center',
  'indent',
  'float',
  'code',
  'quote',
  {
    name: 'subject',
    schema: {
      subject: (value) => {
        return /^[1-9]\d*/.test(value);
      },
    },
  },
  'subject',
  {
    name: 'user',
    schema: {
      user: (value, node) => {
        let userId = value;
        if (!userId) {
          userId = getStringChild(node);
        }
        return !!userId;
      },
    },
  },
  {
    name: 'align',
    schema: {
      align: (value) => {
        return ['left', 'right', 'center'].includes(value);
      },
    },
  },
];

// 合并 tag 配置。新的覆盖旧的
export function mergeTags(tagList: ITag[], toMergeTags: ITag[]): ITag[] {
  const results: ITag[] = [...toMergeTags];
  tagList.forEach((tag) => {
    let name = '';
    if (typeof tag === 'string') {
      name = tag;
    } else {
      name = tag.name;
    }
    const idx = results.findIndex((t) => {
      if (typeof t === 'string') {
        return t === name;
      } else {
        return t.name === name;
      }
    });
    if (idx === -1) {
      results.push(tag);
    }
  });
  return results;
}

export class Parser {
  private readonly input: string;
  private pos: number;
  // 记录上下文
  private readonly ctxStack: Array<{ startIdx: number }>;
  private readonly tagStack: string[];
  private readonly validTags: ITag[];

  constructor(input: string, tags: ITag[] = []) {
    this.input = input;
    this.pos = 0;
    this.ctxStack = [];
    this.tagStack = [];
    // 解析器支持的 tag; sticker 用来表示 Bangumi 的表情，不是 bbcode
    this.validTags = mergeTags(DEFAULT_TAGS, tags);
  }

  parse(): CodeNodeTypes[] {
    const nodes: CodeNodeTypes[] = [];
    while (true) {
      if (this.eof() || (this.tagStack.length > 0 && this.startsWith('[/'))) {
        break;
      }
      nodes.push(this.parseNode());
    }
    return nodes;
  }

  private parseNode(): CodeNodeTypes {
    this.enterNode();
    let node: CodeNodeTypes = '';
    try {
      switch (this.curChar()) {
        case '(':
          node = this.parseStickerNode();
          break;
        case '[':
          node = this.parseBBCodeNode();
          break;
        default:
          node = this.parseText();
      }
      this.exitNode();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === INVALID_NODE_MSG || error.message === INVALID_STICKER_NODE) {
          const ctx = this.ctxStack.pop()!;
          node = this.input.slice(ctx.startIdx, this.pos);
        }
      }
      console.error('unexpected throw', error);
    }
    return node;
  }

  private parseStickerNode(): CodeNodeTypes {
    if (!this.startsWith(BGM_STICKER_START_STR)) {
      const target = this.input.slice(this.pos, this.pos + MAX_EMOJI_LENGTH);
      const emoji = EMOJI_ARRAY.find((s) => target.startsWith(s));
      if (!emoji) {
        this.consumeChar();
        throw new Error(INVALID_STICKER_NODE);
      }
      this.pos += emoji.length;
      return {
        type: 'sticker',
        props: {
          stickerId: emoji,
        },
      };
    }
    this.pos += BGM_STICKER_START_STR.length;
    const id = this.consumeWhile((c) => !isNaN(+c));
    if (!id) {
      throw new Error(INVALID_STICKER_NODE);
    }
    const c = this.consumeChar();
    if (c !== ')') {
      throw new Error(INVALID_STICKER_NODE);
    }
    return {
      type: 'sticker',
      props: {
        stickerId: `(bgm${id})`,
      },
    };
  }

  // @TODO 暂时只支持 Bangumi 的 bbcode; 不支持 [style size="30px"]Large Text[/style]
  private parseBBCodeNode(): CodeNodeTypes {
    let c = this.consumeChar();
    const openTag = this.parseTagName();
    c = this.consumeChar();
    if (![']', '='].includes(c)) {
      throw new Error(INVALID_NODE_MSG);
    }
    let prop: string = '';
    if (c === '=') {
      prop = this.consumeWhile((c) => c !== ']');
      c = this.consumeChar();
    }
    if (openTag === 'code') {
      const codeEndTag = '[/code]';
      const idx = this.input.indexOf(codeEndTag, this.pos);
      if (idx === -1) {
        throw new Error(INVALID_NODE_MSG);
      }
      const pos = this.pos;
      this.pos = idx + codeEndTag.length;
      return {
        type: 'code',
        children: [this.input.slice(pos, idx)],
      };
    }
    this.tagStack.push(openTag);
    const children = this.parse();
    this.tagStack.pop();

    this.validateStartStr('[/');
    const closeTag = this.parseTagName();
    if (openTag !== closeTag) {
      throw new Error(INVALID_NODE_MSG);
    }
    this.validateStartStr(']');
    const n: CodeNodeTypes = {
      type: openTag,
      children,
    };
    if (prop) {
      n.props = {
        [openTag]: prop,
      };
    }
    if (!this.isValidBBCode(n)) {
      throw new Error(INVALID_NODE_MSG);
    }
    return n;
  }

  private parseTagName(): string {
    const tag = this.consumeWhile((c) => /[a-zA-Z]/.test(c));
    if (!tag) {
      throw new Error(INVALID_NODE_MSG);
    }
    return tag;
  }

  private parseText(): string {
    return this.consumeWhile((c) => !['(', '['].includes(c));
  }

  private consumeWhile(checkFn: CheckCharFn): string {
    let result = '';
    while (!this.eof() && checkFn(this.curChar())) {
      result += this.consumeChar();
    }
    return result;
  }

  private consumeChar(): string {
    const cur = this.input[this.pos];
    this.pos += 1;
    return cur;
  }

  private curChar(): string {
    return this.input[this.pos];
  }

  private startsWith(pattern: string): boolean {
    return this.input.slice(this.pos).startsWith(pattern);
  }

  private eof(): boolean {
    return this.pos >= this.input.length;
  }

  private enterNode(): void {
    this.ctxStack.push({
      startIdx: this.pos,
    });
  }

  private exitNode(): void {
    this.ctxStack.pop();
  }

  private validateStartStr(str: string): boolean {
    let count = 0;
    while (count < str.length) {
      if (this.consumeChar() !== str[count]) {
        throw new Error(INVALID_NODE_MSG);
      }
      count++;
    }
    return true;
  }

  isValidBBCode(node: CodeVNode): boolean {
    const idx = this.findTag(node.type);
    if (idx === -1) {
      return false;
    }
    const tag = this.validTags[idx];
    // [b][/b] 内部为空的也识别成无效 tag
    if (!node.children || node.children.length === 0) {
      return false;
    }
    if (typeof tag === 'string') {
      return true;
    }
    for (const [key, validateFn] of Object.entries(tag.schema)) {
      const prop = getNodeProp(node, key);
      if (!validateFn(prop, node)) {
        return false;
      }
    }
    return true;
  }

  private findTag(name: string): number {
    return this.validTags.findIndex((tag) => {
      if (typeof tag === 'string') {
        return tag === name;
      } else {
        return tag.name === name;
      }
    });
  }
}
