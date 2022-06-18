import { BBCODE_REGEXP, mergeTags, Parser } from '../parser'
import { CodeNodeTypes } from '../types'

function getNodes (input: string): CodeNodeTypes[] {
  const p = new Parser(input)
  return p.parse()
}

describe('bbcode parser', () => {
  test('bbcode regexp', () => {
    const url = '[url=http://chii.in]bgm[/url]'
    expect(url).toMatch(BBCODE_REGEXP)
    let m = url.match(BBCODE_REGEXP)!
    expect(m[1]).toBe('url')
    expect(m[2]).toBe('=http://chii.in')
    expect(m[3]).toBe('bgm')
    expect(m[4]).toBe('url')

    const bolded = '[b]粗体字[/b]'
    expect(bolded).toMatch(BBCODE_REGEXP)
    m = bolded.match(BBCODE_REGEXP)!
    expect(m[1]).toBe('b')
    expect(m[2]).toBeUndefined()
    expect(m[3]).toBe('粗体字')
    expect(m[4]).toBe('b')
  })
  test('text', () => {
    const input = '啊aあ\n)[bs][/bs]222'
    const tests: CodeNodeTypes[] = ['啊aあ\n)', '[bs][/bs]', '222']
    expect(getNodes(input)).toEqual(expect.arrayContaining(tests))
  })
  test('bangumi sticker', () => {
    const input = '[(bgm38)[/(=A=)]'
    const tests: CodeNodeTypes[] = [
      '[',
      {
        type: 'sticker',
        props: {
          stickerId: '(bgm38)'
        }
      },
      '[',
      '/',
      {
        type: 'sticker',
        props: {
          stickerId: '(=A=)'
        }
      },
      ']'
    ]
    const nodes = getNodes(input)
    for (let i = 0; i < nodes.length; i++) {
      expect(nodes[i]).toEqual(tests[i])
    }
    // expect(getNodes(input)).toEqual(expect.arrayContaining(tests));
  })
  test('bold bbcode', () => {
    const input = '[b]bgm[/b]'
    const tests: CodeNodeTypes[] = [
      {
        type: 'b',
        children: ['bgm']
      }
    ]
    expect(getNodes(input)).toEqual(expect.arrayContaining(tests))
  })
  test('url bbcode', () => {
    const input = '[url=http://chii.in]bgm[/url]'
    const tests: CodeNodeTypes[] = [
      {
        type: 'url',
        props: {
          url: 'http://chii.in'
        },
        children: ['bgm']
      }
    ]
    expect(getNodes(input)).toEqual(expect.arrayContaining(tests))
  })
  test('url bbcode; type 2', () => {
    const input = ' [url]http://chii.in/[/url]'
    const tests: CodeNodeTypes[] = [
      {
        type: 'url',
        children: ['http://chii.in/']
      }
    ]
    expect(getNodes(input)).toEqual(expect.arrayContaining(tests))
  })
  test('invalid bbcode', () => {
    const input = '[ba测试]bgm[/b](bg38)[b]加粗[b]'
    // const input = `[b]bgm[url]sss[/ual][/b](bg38)`;
    expect(getNodes(input).join('')).toEqual(input)
  })
  test('img bbcode', () => {
    const input = `存放于其他网络服务器的图片：
[img]http://chii.in/img/ico/bgm88-31.gif[/img]`
    const tests: CodeNodeTypes[] = [
      '存放于其他网络服务器的图片：\n',
      {
        type: 'img',
        children: ['http://chii.in/img/ico/bgm88-31.gif']
      }
    ]
    expect(getNodes(input)).toEqual(expect.arrayContaining(tests))
  })
  test('simple bbcode', () => {
    const input = `我是[mask]马赛克文字[/mask]
[s]删除线文字[/s]
[u]下划线文字[/u]
[i]斜体字[/i]
[b]粗体字[/b]
[color=red]彩[/color][color=green]色[/color][color=blue]的[/color][color=orange]哟[/color]
`
    const tests: CodeNodeTypes[] = [
      '我是',
      {
        type: 'mask',
        children: ['马赛克文字']
      },
      '\n',
      {
        type: 's',
        children: ['删除线文字']
      },
      '\n',
      {
        type: 'u',
        children: ['下划线文字']
      },
      '\n',
      {
        type: 'i',
        children: ['斜体字']
      },
      '\n',
      {
        type: 'b',
        children: ['粗体字']
      },
      '\n',
      {
        type: 'color',
        props: {
          color: 'red'
        },
        children: ['彩']
      },
      {
        type: 'color',
        props: {
          color: 'green'
        },
        children: ['色']
      },
      {
        type: 'color',
        props: {
          color: 'blue'
        },
        children: ['的']
      },
      {
        type: 'color',
        props: {
          color: 'orange'
        },
        children: ['哟']
      },
      '\n'
    ]
    const nodes = getNodes(input)
    for (let i = 0; i < nodes.length; i++) {
      expect(nodes[i]).toEqual(tests[i])
    }
  })
  test('nest bbcode', () => {
    const input = '[color=green]nest[size=16]更新：[/size][/color]'
    const tests: CodeNodeTypes[] = [
      {
        type: 'color',
        props: { color: 'green' },
        children: [
          'nest',
          {
            type: 'size',
            props: {
              size: '16'
            },
            children: ['更新：']
          }
        ]
      }
    ]
    expect(getNodes(input)).toEqual(expect.arrayContaining(tests))
  })
  test('nest same bbcode', () => {
    const input = '[color=green][color=blue]更新：[/color][/color]'
    const tests: CodeNodeTypes[] = [
      {
        type: 'color',
        props: { color: 'green' },
        children: [
          {
            type: 'color',
            props: {
              color: 'blue'
            },
            children: ['更新：']
          }
        ]
      }
    ]
    expect(getNodes(input)).toEqual(expect.arrayContaining(tests))
  })
  test('code bbcode', () => {
    const input = '[code]afafaf[b]bbbbb[/b][/code]'
    const tests: CodeNodeTypes[] = [
      {
        type: 'code',
        children: ['afafaf[b]bbbbb[/b]']
      }
    ]
    expect(getNodes(input)).toEqual(expect.arrayContaining(tests))
  })
  test('invalid basic bbcode', () => {
    const input = '[b][/b][mask][/mask][s][/]'
    expect(getNodes(input).join('')).toEqual(input)
  })
  test('invalid url bbcode', () => {
    const input =
      '[url]Bangumi 番组计划[/url][url=sfaf]番组计划[/url][url][/url]'
    const tests: CodeNodeTypes[] = [
      '[url]Bangumi 番组计划[/url]',
      '[url=sfaf]番组计划[/url]',
      '[url][/url]'
    ]
    expect(getNodes(input)).toEqual(expect.arrayContaining(tests))
  })
  test('invalid sticker bbcode', () => {
    const input = '(bgmab)(bgm38a'
    const tests: CodeNodeTypes[] = ['(bgm', 'ab)', '(bgm38a']
    expect(getNodes(input)).toEqual(expect.arrayContaining(tests))
  })
  test('invalid [code] /code] bbcode', () => {
    const input = '[code]测试中/code]'
    expect(getNodes(input).join('')).toEqual(input)
  })
  test('custom bbcode', () => {
    const input = '[mybbcode]测试自定义tag[/mybbcode]'
    const nodes = new Parser(input, ['mybbcode']).parse()
    expect(nodes).toEqual([{
      type: 'mybbcode',
      children: ['测试自定义tag']
    }])
  })
  test('merge tags', () => {
    const fn = (): boolean => true
    const tags = mergeTags(['i', 'b', {
      name: 's',
      schema: {
        s: fn
      }
    }], [{
      name: 'i',
      schema: {
        i: fn
      }
    }, 's', 'mybbcode'])
    expect(tags).toEqual(expect.arrayContaining(['b', 's', 'mybbcode', {
      name: 'i',
      schema: {
        i: fn
      }
    }]))
  })
})
