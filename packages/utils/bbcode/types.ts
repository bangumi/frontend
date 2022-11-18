export type TextNode = string;

export interface CodeVNode {
  type: string;
  props?: Record<string, string | boolean>;
  children?: CodeNodeTypes[];
}

export type CodeNodeTypes = string | CodeVNode;

export interface VNode {
  type: string;
  props?: Record<string, string | boolean>;
  style?: Record<string, string>;
  className?: string | string[];
  children?: NodeTypes[];
}

export type NodeTypes = string | VNode;

export type ConverterFn = (node: CodeVNode) => NodeTypes;
