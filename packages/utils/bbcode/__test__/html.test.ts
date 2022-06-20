import { STICKER_DOMAIN_URL } from '../constants'
import { renderNodes, renderNode, render } from '../html'
import { VNode } from '../types'

describe('html render vnode', () => {
  test('render multi style', () => {
    const vnode: VNode = {
      type: 'span',
      style: {
        'font-size': '18px',
        'line-height': '18px'
      },
      className: 'l',
      children: ['文字\n换行了']
    }
    expect(renderNode(vnode)).toBe(
      '<span style="font-size:18px;line-height:18px" class="l">文字<br/>换行了</span>'
    )
  })
  test('render link', () => {
    const vnode = {
      type: 'a',
      props: {
        href: 'http://chii.in/',
        target: '_blank',
        ref: 'nofollow external noopener noreferrer'
      },
      className: ['l', 'test']
    }
    expect(renderNode(vnode)).toBe(
      '<a href="http://chii.in/" target="_blank" ref="nofollow external noopener noreferrer" class="l test"/>'
    )
  })
  test('render boolean props node', () => {
    const vnode = {
      type: 'input',
      props: {
        type: 'text',
        disabled: true
      }
    }
    expect(renderNode(vnode)).toBe('<input type="text" disabled/>')
  })
  test('render sticker node', () => {
    const id = '38'
    const vnode = {
      type: 'img',
      props: {
        'sticker-id': id,
        smileid: id,
        alt: `(bgm${id})`
      }
    }
    expect(renderNode(vnode)).toBe(
      '<img sticker-id="38" smileid="38" alt="(bgm38)"/>'
    )
  })
  test('render nodes', () => {
    const vnodes: VNode[] = [
      {
        type: 'strong',
        children: ['粗体字']
      },
      {
        type: 'em',
        children: ['斜体字']
      },
      {
        type: 'span',
        style: {
          'text-decoration': 'underline'
        },
        children: ['下划线文字']
      },
      {
        type: 'span',
        style: {
          'text-decoration': 'line-through'
        },
        children: ['删除线文字']
      },
      {
        type: 'span',
        style: {
          color: 'red'
        },
        children: ['红']
      },
      {
        type: 'span',
        style: {
          'font-size': '18pt'
        },
        children: ['文字']
      }
    ]
    expect(renderNodes(vnodes)).toBe(
      '<strong>粗体字</strong><em>斜体字</em><span style="text-decoration:underline">下划线文字</span><span style="text-decoration:line-through">删除线文字</span><span style="color:red">红</span><span style="font-size:18pt">文字</span>'
    )
  })
  test('render nest', () => {
    const sizeNode: VNode = {
      type: 'span',
      style: {
        'font-size': '18pt'
      },
      children: [
        {
          type: 'a',
          props: {
            href: 'http://chii.in/'
          },
          className: ['l']
        }
      ]
    }
    const vnode: VNode = {
      type: 'span',
      style: {
        color: 'red'
      },
      children: [sizeNode]
    }
    expect(renderNode(sizeNode)).toBe(
      '<span style="font-size:18pt"><a href="http://chii.in/" class="l"/></span>'
    )
    expect(renderNode(vnode)).toBe(
      '<span style="color:red"><span style="font-size:18pt"><a href="http://chii.in/" class="l"/></span></span>'
    )
  })
  test('render mask', () => {
    const vnode: VNode = {
      type: 'span',
      style: {
        'background-color': '#555',
        color: '#555',
        border: '1px solid #555'
      },
      className: 'l',
      children: ['文字\n换行']
    }
    expect(renderNode(vnode)).toBe(
      '<span style="background-color:#555;color:#555;border:1px solid #555" class="l">文字<br/>换行</span>'
    )
  })
})

describe('html render bbcode string', () => {
  test('render color size', () => {
    const input =
      '[color=red][size=18]一般[b]粗[/b]\n   [s]删除[/s][/size][/color]'
    expect(render(input)).toBe(
      '<span style="color:red"><span style="font-size:18px;line-height:18px">一般<strong>粗</strong><br/>   <span style="text-decoration:line-through">删除</span></span></span>'
    )
  })
  test('render mask', () => {
    const input = '我是[mask]马赛克文字[/mask]'
    expect(render(input)).toBe(
      '我是<span style="background-color:#555;color:#555;border:1px solid #555">马赛克文字</span>'
    )
  })
  test('render color', () => {
    const input = `我是
[color=red]彩[/color][color=green]色[/color][color=blue]的[/color][color=orange]哟[/color]。`
    expect(render(input)).toBe(
      '我是<br/><span style="color:red">彩</span><span style="color:green">色</span><span style="color:blue">的</span><span style="color:orange">哟</span>。'
    )
  })
  test('render size', () => {
    const input =
      '[size=10]不同[/size][size=14]大小的[/size][size=18]文字[/size]效果也可实现。'
    expect(render(input)).toBe(
      '<span style="font-size:10px;line-height:10px">不同</span><span style="font-size:14px;line-height:14px">大小的</span><span style="font-size:18px;line-height:18px">文字</span>效果也可实现。'
    )
  })
  test('render url', () => {
    const input = 'Bangumi 番组计划: [url]http://chii.in/[/url]'
    expect(render(input)).toBe(
      'Bangumi 番组计划: <a href="http://chii.in/" class="l">http://chii.in/</a>'
    )
    const input2 = `带文字说明的网站链接：
[url=http://chii.in]Bangumi 番组计划[/url]`
    expect(render(input2)).toBe(
      '带文字说明的网站链接：<br/><a href="http://chii.in" class="l">Bangumi 番组计划</a>'
    )
  })
  test('render img', () => {
    const input = `存放于其他网络服务器的图片：
[img]http://chii.in/img/ico/bgm88-31.gif[/img]`
    expect(render(input)).toBe(
      '存放于其他网络服务器的图片：<br/><img src="http://chii.in/img/ico/bgm88-31.gif" class="code"/>'
    )
  })
  test('render sticker', () => {
    const input = '(bgm38)(bgm23)(=///=)'
    expect(render(input)).toBe(
      `<img src="${STICKER_DOMAIN_URL}/img/smiles/tv/15.gif" smileid="54" alt="(bgm38)" /><img src="${STICKER_DOMAIN_URL}/img/smiles/bgm/23.gif" smileid="39" alt="(bgm23)" /><img src="${STICKER_DOMAIN_URL}/img/smiles/13.gif" smileid="13" alt="(=///=)" />`
    )
  })
  test('render quote', () => {
    const input = '[quote]ss[b]加粗[/b][/quote]'
    expect(render(input)).toBe(
      '<div class="quote"><q>ss<strong>加粗</strong></q></div>'
    )
  })
  test('render code', () => {
    const input = '[code]ss[b]加粗\n换行了[/b](bgm38) [/fafa [code][/code]'
    expect(render(input)).toBe(
      '<pre>ss[b]加粗\n换行了[/b](bgm38) [/fafa [code]</pre>'
    )
  })
  test('render code by custom converter', () => {
    const input = '[code]ss[b]加粗\n换行了[/b](bgm38) [/fafa [code][/code]'
    expect(render(input, {
      code: (node) => ({
        type: 'div',
        className: 'codeHighlight',
        children: [
          {
            type: 'pre',
            children: node.children
          }
        ]
      })
    })).toBe(
      '<div class="codeHighlight"><pre>ss[b]加粗\n换行了[/b](bgm38) [/fafa [code]</pre></div>'
    )
  })
})
