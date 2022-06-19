import { EMOJI_ARRAY } from './constants'
import {
  CodeNodeTypes,
  CodeVNode,
  NodeTypes,
  VNode
} from './types'

const BGM_HOST_ARR = [
  'chii.in',
  'bangumi.tv',
  'www.chii.in',
  'www.bangumi.tv',
  'bgm.tv',
  'www.bgm.tv'
]
function isExternalLink (url: string): boolean {
  try {
    const urlObj = new URL(url)
    return !BGM_HOST_ARR.includes(urlObj.host)
  } catch (error) {
    return true
  }
}

function convertImgNode (node: CodeVNode): VNode {
  const src = node.children![0] as string
  const vnode: VNode = {
    type: 'img',
    props: {
      src
    },
    className: 'code'
  }
  if (isExternalLink(src)) {
    vnode.props = {
      ...vnode.props,
      referrerpolicy: 'no-referrer',
      ref: 'noreferrer'
    }
  }
  return vnode
}

function convertUrlNode (node: CodeVNode): VNode {
  let href = node?.props?.url as string
  if (!href) {
    href = node.children![0] as string
  }
  const vnode: VNode = {
    type: 'a',
    props: {
      href
    },
    className: 'l'
  }
  if (isExternalLink(href)) {
    vnode.props = {
      ...vnode.props,
      target: '_blank',
      ref: 'nofollow external noopener noreferrer'
    }
  }
  return vnode
}

function convertStickerNode (node: CodeVNode): string {
  const stickerId = node.props!.stickerId as string
  let id = -1
  if (stickerId.startsWith('(bgm')) {
    const m = stickerId.match(/\d+/)!
    id = +m[0] + EMOJI_ARRAY.length
  } else {
    id = EMOJI_ARRAY.indexOf(stickerId) + 1
  }
  let img = ''
  if (id >= 1 && id < 17) {
    img = `<img src="https://lain.bgm.tv/img/smiles/${id}.gif" smileid="${id}" alt="${stickerId}" />`
  } else if (id >= 17 && id < 39) {
    const m = stickerId.match(/\d+/)!
    img = `<img src="https://lain.bgm.tv/img/smiles/bgm/${m[0]}.png" smileid="${id}" alt="${stickerId}" />`
  } else if (id === 39) {
    img =
      '<img src="https://lain.bgm.tv/img/smiles/bgm/23.gif" smileid="39" alt="(bgm23)" />'
  } else if (id >= 40 && id < 140) {
    let tvId: string | number = id - 39
    if (id < 10) {
      tvId = `0${tvId}`
    }
    img = `<img src="https://lain.bgm.tv/img/smiles/tv/${tvId}.gif" smileid="${id}" alt="${stickerId}" />`
  } else {
    img = stickerId
  }
  return img
}

function convertQuote (node: CodeVNode): VNode {
  const q: VNode = {
    type: 'q'
  }
  if (node.children) {
    q.children = node.children.map((c) => convert(c))
  }
  return {
    type: 'div',
    className: 'quote',
    children: [q]
  }
}

// function converUnknownNode(node: CodeVNode): NodeTypes {}

export function convert (node: CodeNodeTypes): NodeTypes {
  if (typeof node === 'string') {
    return node
  }
  const type = node.type
  let vnode: VNode = {
    type: node.type
  }
  switch (type) {
    case 'code':
      return {
        type: 'div',
        className: 'codeHighlight',
        children: [
          {
            type: 'pre',
            children: node.children
          }
        ]
      }
    case 'b':
      vnode.type = 'strong'
      break
    case 'i':
      vnode.type = 'em'
      break
    case 'u':
      vnode.type = 'span'
      vnode.style = {
        'text-decoration': 'underline'
      }
      break
    case 's':
      vnode.type = 'span'
      vnode.style = {
        'text-decoration': 'line-through'
      }
      break
    case 'mask':
      vnode.type = 'span'
      vnode.style = {
        'background-color': '#555',
        color: '#555',
        border: '1px solid #555'
      }
      break
    case 'color':
      vnode.type = 'span'
      vnode.style = {
        color: node.props!.color as string
      }
      break
    case 'size':
      vnode.type = 'span'
      vnode.style = {
        'font-size': (node.props!.size as string) + 'px',
        'line-height': (node.props!.size as string) + 'px'
      }
      break
    case 'url':
      vnode = convertUrlNode(node)
      break
    case 'img':
      return convertImgNode(node)
    case 'sticker':
      return convertStickerNode(node)
    case 'quote':
      return convertQuote(node)
    default:
      vnode = {
        ...node
      }
      break
  }
  if (node.children) {
    vnode.children = node.children.map((c) => convert(c))
  }
  return vnode
}
