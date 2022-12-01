import { UnreadableCodeError } from '../index';
import { convert } from './convert';
import { Parser } from './parser';
import type { CodeNodeTypes, ConverterFn, NodeTypes, VNode } from './types';

const escapeHTML = (str: string): string =>
  str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/&/g, '&amp;')
    .replace(/'/g, '&#039;');

function renderProps(props: Record<string, string | boolean> | undefined): string {
  if (!props) {
    return '';
  }
  return Object.keys(props).reduce((pre, key) => {
    let val = props[key];
    if (val === undefined) {
      throw new UnreadableCodeError('BUG: unexpected undefined');
    } else if (typeof val === 'boolean') {
      val = val ? key : '';
    } else {
      val = `${key}="${escapeHTML(val)}"`;
    }
    return pre + ' ' + val;
  }, '');
}

function renderStyle(style: Record<string, string>): string {
  return Object.entries(style)
    .map(([key, value]) => `${key}:${escapeHTML(value)}`)
    .join(';');
}

export function renderNode(node: NodeTypes, parentNode?: VNode): string {
  let result = '';
  if (typeof node === 'string') {
    if (parentNode && parentNode.type === 'pre') {
      return node;
    }
    return renderText(node);
  }
  const { type, props, children, style, className } = node;
  let propsStr = renderProps(props);
  if (style) {
    propsStr += ` style="${renderStyle(style)}"`;
  }
  if (className !== undefined && className !== '') {
    let clsStr = '';
    if (typeof className === 'string') {
      clsStr = escapeHTML(className);
    } else {
      clsStr = escapeHTML(className.join(' '));
    }
    propsStr += ` class="${clsStr}"`;
  }
  if (!children) {
    result = `<${type}${propsStr}/>`;
  } else {
    let childrenStr = '';
    if (type === 'pre') {
      childrenStr = children.join('');
    } else {
      childrenStr = renderNodes(children, parentNode);
    }
    result = `<${type}${propsStr}>${childrenStr}</${type}>`;
  }

  return result;
}

function renderText(str: string): string {
  return str.replace(/\n/g, '<br/>');
}

export function renderNodes(nodes: NodeTypes[], parentNode?: VNode): string {
  let result = '';
  nodes.forEach((node) => {
    result += renderNode(node, parentNode);
  });
  return result;
}

export function render(rawStr: string, converterMap: Record<string, ConverterFn> = {}): string {
  return renderWithParser(new Parser(rawStr), converterMap);
}

export function renderWithParser(
  parser: Parser,
  converterMap: Record<string, ConverterFn> = {},
): string {
  let result = '';
  const nodes: CodeNodeTypes[] = parser.parse();
  nodes.forEach((node) => {
    result += renderNode(convert(node, converterMap));
  });
  return result;
}
