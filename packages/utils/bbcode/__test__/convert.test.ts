import { convert } from '../convert'
import { CodeNodeTypes, NodeTypes, VNode } from '../types'

describe('convert bbcode to html vnode', () => {
  test('basic bbcode', () => {
    const tests: Array<[CodeNodeTypes, NodeTypes]> = [
      ['啊aあ\n)', '啊aあ\n)'],
      [
        {
          type: 'b',
          children: ['加粗']
        },
        {
          type: 'strong',
          children: ['加粗']
        }
      ],
      [
        {
          type: 'i',
          children: ['斜体']
        },
        {
          type: 'em',
          children: ['斜体']
        }
      ],
      [
        {
          type: 'u',
          children: ['下划线']
        },
        {
          type: 'span',
          style: {
            'text-decoration': 'underline'
          },
          children: ['下划线']
        }
      ],
      [
        {
          type: 's',
          children: ['删除线']
        },
        {
          type: 'span',
          style: {
            'text-decoration': 'line-through'
          },
          children: ['删除线']
        }
      ],
      [
        {
          type: 'mask',
          children: ['mask']
        },
        {
          type: 'span',
          style: {
            'background-color': '#555',
            color: '#555',
            border: '1px solid #555'
          },
          children: ['mask']
        }
      ],
      [
        {
          type: 'color',
          props: {
            color: 'red'
          },
          children: ['红']
        },
        {
          type: 'span',
          style: {
            color: 'red'
          },
          children: ['红']
        }
      ],
      [
        {
          type: 'size',
          props: {
            size: '18'
          },
          children: ['大小']
        },
        {
          type: 'span',
          style: {
            'font-size': '18px',
            'line-height': '18px'
          },
          children: ['大小']
        }
      ]
    ]
    for (const [input, expected] of tests) {
      expect(convert(input)).toEqual(expected)
    }
  })
  test('url bbcode', () => {
    const tests: Array<[CodeNodeTypes, NodeTypes]> = [
      [
        {
          type: 'url',
          props: {
            url: 'http://chii.in/'
          },
          children: ['http://chii.in/']
        },
        {
          type: 'a',
          props: {
            href: 'http://chii.in/'
          },
          className: 'l',
          children: ['http://chii.in/']
        }
      ],
      [
        {
          type: 'url',
          props: {
            url: 'http://test.com/'
          },
          children: ['测试']
        },
        {
          type: 'a',
          props: {
            href: 'http://test.com/',
            target: '_blank',
            ref: 'nofollow external noopener noreferrer'
          },
          className: 'l',
          children: ['测试']
        }
      ]
    ]
    for (const [input, expected] of tests) {
      expect(convert(input)).toEqual(expected)
    }
  })
  test('img bbcode', () => {
    const tests: Array<[CodeNodeTypes, NodeTypes]> = [
      [
        {
          type: 'img',
          children: ['http://chii.in/img/ico/bgm88-31.gif']
        },
        {
          type: 'img',
          props: {
            src: 'http://chii.in/img/ico/bgm88-31.gif'
          },
          className: 'code'
        }
      ],
      [
        {
          type: 'img',
          children: ['http://test.com/xx.png']
        },
        {
          type: 'img',
          props: {
            src: 'http://test.com/xx.png',
            referrerpolicy: 'no-referrer',
            ref: 'noreferrer'
          },
          className: 'code'
        }
      ],
      [
        {
          type: 'img',
          children: ['not-a-website']
        },
        {
          type: 'img',
          props: {
            src: 'not-a-website',
            referrerpolicy: 'no-referrer',
            ref: 'noreferrer'
          },
          className: 'code'
        }
      ]
    ]
    for (const [input, expected] of tests) {
      expect(convert(input)).toEqual(expected)
    }
  })
  test('nest bbcode', () => {
    const node: CodeNodeTypes = {
      type: 'b',
      children: [
        {
          type: 'i',
          children: [
            {
              type: 'u',
              children: [
                {
                  type: 's',
                  children: ['测试文字']
                }
              ]
            }
          ]
        }
      ]
    }
    const vnode: VNode = {
      type: 'strong',
      children: [
        {
          type: 'em',
          children: [
            {
              type: 'span',
              style: { 'text-decoration': 'underline' },
              children: [
                {
                  type: 'span',
                  style: { 'text-decoration': 'line-through' },
                  children: ['测试文字']
                }
              ]
            }
          ]
        }
      ]
    }
    expect(convert(node)).toEqual(vnode)
  })
  test('sticker', () => {
    const tests: Array<[CodeNodeTypes, NodeTypes]> = [
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm114)'
          }
        },
        '<img src="https://lain.bgm.tv/img/smiles/tv/91.gif" smileid="130" alt="(bgm114)" />'
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm38)'
          }
        },
        '<img src="https://lain.bgm.tv/img/smiles/tv/15.gif" smileid="54" alt="(bgm38)" />'
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm23)'
          }
        },
        '<img src="https://lain.bgm.tv/img/smiles/bgm/23.gif" smileid="39" alt="(bgm23)" />'
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm01)'
          }
        },
        '<img src="https://lain.bgm.tv/img/smiles/bgm/01.png" smileid="17" alt="(bgm01)" />'
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: "(='=)"
          }
        },
        '<img src="https://lain.bgm.tv/img/smiles/10.gif" smileid="10" alt="(=\'=)" />'
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(=///=)'
          }
        },
        '<img src="https://lain.bgm.tv/img/smiles/13.gif" smileid="13" alt="(=///=)" />'
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm233)'
          }
        },
        '(bgm233)'
      ]
    ]
    for (const [input, expected] of tests) {
      expect(convert(input)).toEqual(expected)
    }
  })
})
