import React from 'react';

import { convert } from './convert';
import { Parser } from './parser';
import type { CodeNodeTypes, NodeTypes, VNode } from './types';

/* eslint-disable no-useless-escape */
const toCamelCase = (s: string) => s.replace(/(\-\w)/g, (k) => k[1]?.toUpperCase() ?? '');

const joinClassName = (cls: string | string[]) => {
  if (Array.isArray(cls)) {
    return cls.join(' ');
  }
  return cls;
};

const convertToReactProps = (node: VNode, key?: string) => {
  const { props, style, className } = node;

  const transformedStyle: Record<string, string> = style
    ? Object.entries(style).reduce((pre, [key, val]) => {
        return {
          ...pre,
          [toCamelCase(key)]: val,
        };
      }, {})
    : {};

  const transformedClassName = className !== undefined ? joinClassName(className) : undefined;

  const reactProps = {
    ...props,
    style: transformedStyle,
    className: transformedClassName,
    key,
  };

  return reactProps;
};

export const renderNode = (node: NodeTypes, key?: string): React.ReactElement | string => {
  if (typeof node === 'string') {
    const splittedStr: Array<string | React.ReactElement> = node.split(/\n/g);

    if (splittedStr.length < 2) {
      return splittedStr[0] ?? '';
    }
    return splittedStr.reduce((pre, curr, idx) => {
      if (idx < splittedStr.length - 1) {
        return React.createElement(
          React.Fragment,
          null,
          pre,
          React.createElement('br', null),
          curr,
        );
      }
      return React.createElement(React.Fragment, null, pre, curr);
    }, React.createElement(React.Fragment, null));
  }

  const { type, children } = node;

  if (children) {
    return React.createElement(
      type,
      convertToReactProps(node, key),
      ...children.map((child, idx) => renderNode(child, `${idx}`)),
    );
  }
  return React.createElement(type, convertToReactProps(node));
};

export const render = (rawStr: string) => {
  const nodes: CodeNodeTypes[] = new Parser(rawStr).parse();

  return nodes.map((node) => renderNode(convert(node, {})));
};
