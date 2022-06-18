export type TextNode = string

export const OPEN_BRACKET = '['
export const CLOSE_BRACKET = ']'
export const OPEN_PAREN = '('
export const CLOSE_PAREN = ')'
export const ASSIGN = '='
export const LINE_BREAK = '\n'
export const SLASH = '/'
export const EOF = 'EOF'

export const EMOJI_ARRAY = [
  '(=A=)',
  '(=w=)',
  '(-w=)',
  '(S_S)',
  '(=v=)',
  '(@_@)',
  '(=W=)',
  '(TAT)',
  '(T_T)',
  "(='=)",
  '(=3=)',
  "(= =')",
  '(=///=)',
  '(=.,=)',
  '(:P)',
  '(LOL)'
]

export type TokenType =
  | TextNode
  | typeof OPEN_BRACKET
  | typeof CLOSE_BRACKET
  | typeof OPEN_PAREN
  | typeof CLOSE_PAREN
  | typeof ASSIGN
  | typeof LINE_BREAK
  | typeof SLASH
  | typeof EOF

export interface CodeVNode {
  type: string
  props?: Record<string, string | boolean>
  children?: CodeNodeTypes[]
}

export type CodeNodeTypes = string | CodeVNode

export interface VNode {
  type: string
  props?: Record<string, string | boolean>
  style?: Record<string, string>
  className?: string | string[]
  children?: NodeTypes[]
}

export type NodeTypes = string | VNode
