import { getSticker } from '@bangumi/utils/stickers.ts';

import type {
  BBCodeConverterContext,
  BBCodeOptions,
  BBCodeRenderOptions,
  CodeNodeTypes,
  CodeVNode,
  ConverterFn,
  NodeTypes,
  VNode,
} from './types.ts';

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

function convertImgNode(node: CodeVNode, options: BBCodeOptions): VNode {
  const src = node.children![0] as string;
  if (options.images === 'link') {
    return convertLink(src, [src]);
  }

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

function setVNodeChildren(vnode: VNode, node: CodeVNode, context: BBCodeConverterContext): void {
  if (node.children) {
    vnode.children = node.children.map(context.convert);
  }
}

function convertLink(href: string, children: NodeTypes[]): VNode {
  const vnode: VNode = {
    type: 'a',
    props: {
      href,
    },
    className: 'bgm-link',
    children,
  };
  if (isExternalLink(href)) {
    vnode.props = {
      ...vnode.props,
      target: '_blank',
      rel: 'nofollow external noopener noreferrer',
    };
  }
  return vnode;
}

function convertUrlNode(node: CodeVNode, context: BBCodeConverterContext): VNode {
  const href = node.props?.url ?? (node.children![0] as string);
  const children = node.children?.map(context.convert) ?? [];
  return convertLink(href, children);
}

/** 角色贴纸原图为 240x240，正文中统一按此宽度显示 */
const CHARACTER_STICKER_DISPLAY_SIZE = 55;

function convertStickerNode(node: CodeVNode): VNode | string {
  const stickerId = node.props!.stickerId!;
  const sticker = getSticker(stickerId);
  if (!sticker) {
    // 未知表情代码按纯文本输出。解析器已经过滤过一轮，这里是防御性分支
    return stickerId;
  }
  const [width, height] = sticker.large
    ? [CHARACTER_STICKER_DISPLAY_SIZE, CHARACTER_STICKER_DISPLAY_SIZE]
    : [sticker.width, sticker.height];
  const vnode: VNode = {
    type: 'img',
    props: {
      src: sticker.url,
      smileid: sticker.smileid,
      // 角色贴纸有官方中文名，经典表情只有代码本身
      alt: sticker.name ?? stickerId,
      // 显式宽高让浏览器在图片加载前预留空间，避免布局抖动
      width: String(width),
      height: String(height),
    },
  };
  if (sticker.large) {
    // 单张约 180KB，必须懒加载
    vnode.props = {
      ...vnode.props,
      loading: 'lazy',
      decoding: 'async',
    };
    vnode.style = {
      'max-width': `${CHARACTER_STICKER_DISPLAY_SIZE}px`,
      height: 'auto',
      'vertical-align': 'bottom',
    };
  }
  return vnode;
}

function convertQuote(node: CodeVNode, context: BBCodeConverterContext): VNode {
  const q: VNode = {
    type: 'q',
  };
  setVNodeChildren(q, node, context);
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
  context: BBCodeConverterContext,
  props: Pick<VNode, 'style' | 'className'> = {},
): VNode {
  const vnode: VNode = {
    type,
    ...props,
  };
  setVNodeChildren(vnode, node, context);
  return vnode;
}

const CONVERTER_FN_MAP: Record<string, ConverterFn> = {
  b: (node, context) => toVNode(node, 'strong', context),
  i: (node, context) => toVNode(node, 'em', context),
  u: (node, context) =>
    toVNode(node, 'span', context, {
      style: {
        'text-decoration': 'underline',
      },
    }),
  s: (node, context) =>
    toVNode(node, 'span', context, {
      style: {
        'text-decoration': 'line-through',
      },
    }),
  mask: (node, context) =>
    toVNode(node, 'span', context, {
      className: 'bgm-mask',
    }),
  color: (node, context) =>
    toVNode(node, 'span', context, {
      style: {
        color: node.props!.color!,
      },
    }),
  size: (node, context) =>
    toVNode(node, 'span', context, {
      style: {
        'font-size': node.props!.size! + 'px',
        'line-height': node.props!.size! + 'px',
      },
    }),
  url: convertUrlNode,
  img: (node, context) => convertImgNode(node, context.options),
  sticker: convertStickerNode,
  quote: convertQuote,
  code: (node) => ({
    type: 'pre',
    children: node.children,
  }),
  left: (node, context) =>
    toVNode(node, 'p', context, {
      style: {
        'text-align': 'left',
      },
    }),
  right: (node, context) =>
    toVNode(node, 'p', context, {
      style: {
        'text-align': 'right',
      },
    }),
  center: (node, context) =>
    toVNode(node, 'p', context, {
      style: {
        'text-align': 'center',
      },
    }),
  indent: (node, context) => toVNode(node, 'blockquote', context),
  align: (node, context) =>
    toVNode(node, 'p', context, {
      style: {
        'text-align': node.props!.align!,
      },
    }),
  float: (node, context) =>
    toVNode(node, 'span', context, {
      style: {
        float: node.props!.float!,
      },
    }),
  subject: (node, context) =>
    toVNode(node, 'a', context, {
      className: 'l',
    }),
  user: convertUser,
};

export function convert(node: CodeNodeTypes, options: BBCodeRenderOptions = {}): NodeTypes {
  if (typeof node === 'string') {
    return node;
  }

  const context: BBCodeConverterContext = {
    options,
    convert: (child) => convert(child, options),
  };
  const converterFn = options.converters?.[node.type] ?? CONVERTER_FN_MAP[node.type];
  if (converterFn) {
    return converterFn(node, context);
  }
  const vnode: VNode = {
    type: node.type,
  };
  setVNodeChildren(vnode, node, context);
  return vnode;
}
