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
      referrerPolicy: 'no-referrer',
      rel: 'noreferrer',
    };
  }
  return vnode;
}

function setVNodeChildren(vnode: VNode, node: CodeVNode): void {
  if (node.children) {
    vnode.children = node.children.map((c) => convert(c));
  }
}

function convertUrlNode(node: CodeVNode): VNode {
  let href = node.props?.url;
  if (!href) {
    href = node.children![0] as string;
  }
  const vnode: VNode = {
    type: 'a',
    props: {
      href,
    },
    className: 'bgm-link',
  };
  if (node.children) {
    vnode.children = node.children.map((c) => convert(c));
  }
  if (isExternalLink(href)) {
    vnode.props = {
      ...vnode.props,
      target: '_blank',
      rel: 'nofollow external noopener noreferrer',
    };
  }
  return vnode;
}

function convertStickerNode(node: CodeVNode): VNode | string {
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
    return {
      type: 'img',
      props: {
        src: `${STICKER_DOMAIN_URL}/img/smiles/${id}.gif`,
        smileid: `${id}`,
        alt: stickerId,
      },
    };
  }

  if (id >= 17 && id < 39) {
    const m = stickerId.match(/\d+/)?.[0];

    if (m) {
      if (m === '11') {
        return {
          type: 'img',
          props: {
            src: `${STICKER_DOMAIN_URL}/img/smiles/bgm/11.gif`,
            smileid: `${id}`,
            alt: stickerId,
          },
        };
      }

      return {
        type: 'img',
        props: {
          src: `${STICKER_DOMAIN_URL}/img/smiles/bgm/${m}.png`,
          smileid: `${id}`,
          alt: stickerId,
        },
      };
    }

    throw new UnreadableCodeError('BUG: unexpected match result', stickerId);
  }

  if (id === 39) {
    return {
      type: 'img',
      props: {
        src: `${STICKER_DOMAIN_URL}/img/smiles/bgm/23.gif`,
        smileid: '39',
        alt: '(bgm23)',
      },
    };
  }

  if (id >= 40 && id < 140) {
    let tvId: string | number = id - 39;
    if (tvId < 10) {
      tvId = `0${tvId}`;
    }
    return {
      type: 'img',
      props: {
        src: `${STICKER_DOMAIN_URL}/img/smiles/tv/${tvId}.gif`,
        smileid: `${id}`,
        alt: stickerId,
      },
    };
  }

  return stickerId;
}

function convertQuote(node: CodeVNode): VNode {
  const q: VNode = {
    type: 'q',
  };
  setVNodeChildren(q, node);
  return {
    type: 'div',
    className: 'quote',
    children: [q],
  };
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

function toVNode(
  node: CodeVNode,
  type: string,
  props: Pick<VNode, 'style' | 'className'> = {},
): VNode {
  const vnode: VNode = {
    type,
    ...props,
  };
  setVNodeChildren(vnode, node);
  return vnode;
}

const CONVERTER_FN_MAP: Record<string, ConverterFn> = {
  b: (node) => toVNode(node, 'strong'),
  i: (node) => toVNode(node, 'em'),
  u: (node) =>
    toVNode(node, 'span', {
      style: {
        'text-decoration': 'underline',
      },
    }),
  s: (node) =>
    toVNode(node, 'span', {
      style: {
        'text-decoration': 'line-through',
      },
    }),
  mask: (node) =>
    toVNode(node, 'span', {
      className: 'bgm-mask',
    }),
  color: (node) =>
    toVNode(node, 'span', {
      style: {
        color: node.props!.color!,
      },
    }),
  size: (node) =>
    toVNode(node, 'span', {
      style: {
        'font-size': node.props!.size! + 'px',
        'line-height': node.props!.size! + 'px',
      },
    }),
  url: convertUrlNode,
  img: convertImgNode,
  sticker: convertStickerNode,
  quote: convertQuote,
  code: (node) => ({
    type: 'pre',
    children: node.children,
  }),
  left: (node) =>
    toVNode(node, 'p', {
      style: {
        'text-align': 'left',
      },
    }),
  right: (node) =>
    toVNode(node, 'p', {
      style: {
        'text-align': 'right',
      },
    }),
  center: (node) =>
    toVNode(node, 'p', {
      style: {
        'text-align': 'center',
      },
    }),
  indent: (node) => toVNode(node, 'blockquote', {}),
  align: (node) =>
    toVNode(node, 'p', {
      style: {
        'text-align': node.props!.align!,
      },
    }),
  float: (node) =>
    toVNode(node, 'span', {
      style: {
        float: node.props!.float!,
      },
    }),
  subject: (node) =>
    toVNode(node, 'a', {
      className: 'l',
    }),
  user: convertUser,
};

export function convert(
  node: CodeNodeTypes,
  converterMap: Record<string, ConverterFn> = {},
): NodeTypes {
  if (typeof node === 'string') {
    return node;
  }
  let converterFn = converterMap[node.type];
  if (!converterFn) {
    converterFn = CONVERTER_FN_MAP[node.type];
  }
  if (converterFn) {
    return converterFn(node);
  }
  const vnode: VNode = {
    type: node.type,
  };
  setVNodeChildren(vnode, node);
  return vnode;
}
