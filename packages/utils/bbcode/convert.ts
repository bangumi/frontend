import { UnreadableCodeError } from '../index';
import { BGM_STICKER_START_STR, EMOJI_ARRAY, STICKER_DOMAIN_URL } from './constants';
import type { CodeNodeTypes, CodeVNode, ConverterFn, NodeTypes, VNode } from './types';

const BGM_HOST_ARR = [
  'chii.in',
  'bangumi.tv',
  'www.chii.in',
  'www.bangumi.tv',
  'bgm.tv',
  'www.bgm.tv',
];

function isExternalLink(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return !BGM_HOST_ARR.includes(urlObj.host);
  } catch {
    return true;
  }
}

function convertImgNode(node: CodeVNode): VNode {
  const src = node.children![0] as string;
  const vnode: VNode = {
    type: 'img',
    props: {
      src,
    },
    className: 'code',
  };
  if (isExternalLink(src)) {
    vnode.props = {
      ...vnode.props,
      referrerpolicy: 'no-referrer',
      ref: 'noreferrer',
    };
  }
  return vnode;
}

function convertStickerNode(node: CodeVNode): string {
  const stickerId = node.props!.stickerId!;
  let id = -1;
  if (stickerId.startsWith(BGM_STICKER_START_STR)) {
    const m = stickerId.match(/\d+/)?.[0];
    if (m) {
      id = parseInt(m) + EMOJI_ARRAY.length;
    } else {
      throw new UnreadableCodeError('BUG: unexpected match result', stickerId);
    }
  } else {
    id = EMOJI_ARRAY.indexOf(stickerId) + 1;
  }

  if (id >= 1 && id < 17) {
    return `<img src="${STICKER_DOMAIN_URL}/img/smiles/${id}.gif" smileid="${id}" alt="${stickerId}" />`;
  }

  if (id >= 17 && id < 39) {
    const m = stickerId.match(/\d+/)?.[0];

    if (m) {
      if (m === '11') {
        return `<img src="${STICKER_DOMAIN_URL}/img/smiles/bgm/11.gif" smileid="${id}" alt="${stickerId}" />`;
      }

      return `<img src="${STICKER_DOMAIN_URL}/img/smiles/bgm/${m}.png" smileid="${id}" alt="${stickerId}" />`;
    }

    throw new UnreadableCodeError('BUG: unexpected match result', stickerId);
  }

  if (id === 39) {
    return `<img src="${STICKER_DOMAIN_URL}/img/smiles/bgm/23.gif" smileid="39" alt="(bgm23)" />`;
  }

  if (id >= 40 && id < 140) {
    let tvId: string | number = id - 39;
    if (tvId < 10) {
      tvId = `0${tvId}`;
    }
    return `<img src="${STICKER_DOMAIN_URL}/img/smiles/tv/${tvId}.gif" smileid="${id}" alt="${stickerId}" />`;
  }

  return stickerId;
}

function convertUser(node: CodeVNode): VNode {
  let userId = node.props?.user;
  if (!userId) {
    userId = node.children![0] as string;
  }
  return {
    type: 'a',
    props: {
      href: `/user/${userId}`,
    },
    className: 'l',
    children: [`@${node.children![0] as string}`],
  };
}

export function convert(
  node: CodeNodeTypes,
  converterMap: Record<string, ConverterFn> = {},
): NodeTypes {
  const converter = new Converter(converterMap);
  return converter.convert(node);
}

export class Converter {
  readonly fnMap: Record<string, ConverterFn> = {};
  readonly defaultFnMap: Record<string, ConverterFn> = {
    b: (node) => this.toVNode(node, 'strong'),
    i: (node) => this.toVNode(node, 'em'),
    u: (node) =>
      this.toVNode(node, 'span', {
        style: {
          'text-decoration': 'underline',
        },
      }),
    s: (node) =>
      this.toVNode(node, 'span', {
        style: {
          'text-decoration': 'line-through',
        },
      }),
    mask: (node) =>
      this.toVNode(node, 'span', {
        style: {
          'background-color': '#555',
          color: '#555',
          border: '1px solid #555',
        },
      }),
    color: (node) =>
      this.toVNode(node, 'span', {
        style: {
          color: node.props!.color!,
        },
      }),
    size: (node) =>
      this.toVNode(node, 'span', {
        style: {
          'font-size': node.props!.size! + 'px',
          'line-height': node.props!.size! + 'px',
        },
      }),
    url: (node) => this.convertUrlNode(node),
    img: convertImgNode,
    sticker: convertStickerNode,
    quote: (node) => this.convertQuote(node),
    code: (node) => ({
      type: 'pre',
      children: node.children,
    }),
    left: (node) =>
      this.toVNode(node, 'p', {
        style: {
          'text-align': 'left',
        },
      }),
    right: (node) =>
      this.toVNode(node, 'p', {
        style: {
          'text-align': 'right',
        },
      }),
    center: (node) =>
      this.toVNode(node, 'p', {
        style: {
          'text-align': 'center',
        },
      }),
    indent: (node) => this.toVNode(node, 'blockquote', {}),
    align: (node) =>
      this.toVNode(node, 'p', {
        style: {
          'text-align': node.props!.align!,
        },
      }),
    float: (node) =>
      this.toVNode(node, 'span', {
        style: {
          float: node.props!.float!,
        },
      }),
    subject: (node) =>
      this.toVNode(node, 'a', {
        className: 'l',
      }),
    user: convertUser,
  };

  constructor(converterMap: Record<string, ConverterFn>) {
    this.fnMap = converterMap;
  }

  convert(node: CodeNodeTypes): NodeTypes {
    if (typeof node === 'string') {
      return node;
    }
    const converterFn = this.getConvertFn(node.type);
    if (converterFn) {
      return converterFn(node);
    }
    const vnode: VNode = {
      type: node.type,
    };
    this.setVNodeChildren(vnode, node);
    return vnode;
  }

  getConvertFn(type: string): ConverterFn | undefined {
    let converterFn = this.fnMap[type];
    if (!converterFn) {
      converterFn = this.defaultFnMap[type];
    }
    return converterFn;
  }

  toVNode(node: CodeVNode, type: string, props: Pick<VNode, 'style' | 'className'> = {}): VNode {
    const vnode: VNode = {
      type,
      ...props,
    };
    this.setVNodeChildren(vnode, node);
    return vnode;
  }

  setVNodeChildren(vnode: VNode, node: CodeVNode): void {
    if (node.children) {
      vnode.children = node.children.map((c) => this.convert(c));
    }
  }

  convertQuote(node: CodeVNode): VNode {
    const q: VNode = {
      type: 'q',
    };
    this.setVNodeChildren(q, node);
    return {
      type: 'div',
      className: 'quote',
      children: [q],
    };
  }

  convertUrlNode(node: CodeVNode): VNode {
    let href = node.props?.url;
    if (!href) {
      href = node.children![0] as string;
    }
    const vnode: VNode = {
      type: 'a',
      props: {
        href,
      },
      className: 'l',
    };
    if (node.children) {
      vnode.children = node.children.map((c) => this.convert(c));
    }
    if (isExternalLink(href)) {
      vnode.props = {
        ...vnode.props,
        target: '_blank',
        ref: 'nofollow external noopener noreferrer',
      };
    }
    return vnode;
  }
}
