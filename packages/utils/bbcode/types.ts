export type TextNode = string;

export type BBCodeImageMode = 'display' | 'link';

export interface BBCodeOptions {
  /** 是否解析 BBCode 标签 */
  bbcode?: boolean;
  /** 是否解析 Bangumi 表情代码 */
  stickers?: boolean;
  /** 图片标签显示为图片，或降级为链接 */
  images?: BBCodeImageMode;
  /** 精确指定允许的标签集合；默认使用全部内置标签 */
  tags?: readonly BBCodeTag[];
  /** 在允许的标签集合上追加或覆盖标签定义 */
  additionalTags?: readonly BBCodeTag[];
}

export interface BBCodeRenderOptions extends BBCodeOptions {
  converters?: Record<string, ConverterFn>;
}

export type BBCodeValidator = (value: string | undefined, node: CodeVNode) => boolean;

export interface CustomBBCodeTag {
  name: string;
  schema: Record<string, BBCodeValidator>;
}

export type BBCodeTag = CustomBBCodeTag | string;

export interface CodeVNode {
  type: string;
  props?: Record<string, string>;
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

export interface BBCodeConverterContext {
  options: BBCodeRenderOptions;
  convert: (node: CodeNodeTypes) => NodeTypes;
}

export type ConverterFn = (node: CodeVNode, context: BBCodeConverterContext) => NodeTypes;
