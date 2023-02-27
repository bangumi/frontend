import { STICKER_DOMAIN_URL } from '../constants';
import { convert } from '../convert';
import type { CodeNodeTypes, NodeTypes, VNode } from '../types';

describe('convert bbcode to html vnode', () => {
  test('basic bbcode', () => {
    const tests: Array<[CodeNodeTypes, NodeTypes]> = [
      ['啊aあ\n)', '啊aあ\n)'],
      [
        {
          type: 'b',
          children: ['加粗'],
        },
        {
          type: 'strong',
          children: ['加粗'],
        },
      ],
      [
        {
          type: 'i',
          children: ['斜体'],
        },
        {
          type: 'em',
          children: ['斜体'],
        },
      ],
      [
        {
          type: 'u',
          children: ['下划线'],
        },
        {
          type: 'span',
          style: {
            'text-decoration': 'underline',
          },
          children: ['下划线'],
        },
      ],
      [
        {
          type: 's',
          children: ['删除线'],
        },
        {
          type: 'span',
          style: {
            'text-decoration': 'line-through',
          },
          children: ['删除线'],
        },
      ],
      [
        {
          type: 'mask',
          children: ['mask'],
        },
        {
          type: 'span',
          className: 'bgm-mask',
          children: ['mask'],
        },
      ],
      [
        {
          type: 'color',
          props: {
            color: 'red',
          },
          children: ['红'],
        },
        {
          type: 'span',
          style: {
            color: 'red',
          },
          children: ['红'],
        },
      ],
      [
        {
          type: 'size',
          props: {
            size: '18',
          },
          children: ['大小'],
        },
        {
          type: 'span',
          style: {
            'font-size': '18px',
            'line-height': '18px',
          },
          children: ['大小'],
        },
      ],
    ];
    for (const [input, expected] of tests) {
      expect(convert(input)).toEqual(expected);
    }
  });
  test('url bbcode', () => {
    const tests: Array<[CodeNodeTypes, NodeTypes]> = [
      [
        {
          type: 'url',
          props: {
            url: 'http://chii.in/',
          },
          children: ['http://chii.in/'],
        },
        {
          type: 'a',
          props: {
            href: 'http://chii.in/',
          },
          className: 'bgm-link',
          children: ['http://chii.in/'],
        },
      ],
      [
        {
          type: 'url',
          props: {
            url: 'http://test.com/',
          },
          children: ['测试'],
        },
        {
          type: 'a',
          props: {
            href: 'http://test.com/',
            target: '_blank',
            rel: 'nofollow external noopener noreferrer',
          },
          className: 'bgm-link',
          children: ['测试'],
        },
      ],
    ];
    for (const [input, expected] of tests) {
      expect(convert(input)).toEqual(expected);
    }
  });
  test('img bbcode', () => {
    const tests: Array<[CodeNodeTypes, NodeTypes]> = [
      [
        {
          type: 'img',
          children: ['http://chii.in/img/ico/bgm88-31.gif'],
        },
        {
          type: 'img',
          props: {
            src: 'http://chii.in/img/ico/bgm88-31.gif',
          },
          className: 'code',
        },
      ],
      [
        {
          type: 'img',
          children: ['http://test.com/xx.png'],
        },
        {
          type: 'img',
          props: {
            src: 'http://test.com/xx.png',
            referrerPolicy: 'no-referrer',
            rel: 'noreferrer',
          },
          className: 'code',
        },
      ],
      [
        {
          type: 'img',
          children: ['not-a-website'],
        },
        {
          type: 'img',
          props: {
            src: 'not-a-website',
            referrerPolicy: 'no-referrer',
            rel: 'noreferrer',
          },
          className: 'code',
        },
      ],
    ];
    for (const [input, expected] of tests) {
      expect(convert(input)).toEqual(expected);
    }
  });
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
                  children: ['测试文字'],
                },
              ],
            },
          ],
        },
      ],
    };
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
                  children: ['测试文字'],
                },
              ],
            },
          ],
        },
      ],
    };
    expect(convert(node)).toEqual(vnode);
  });
  test('sticker', () => {
    const tests: Array<[CodeNodeTypes, NodeTypes]> = [
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm33)',
          },
        },
        {
          props: {
            alt: '(bgm33)',
            smileid: '49',
            src: `${STICKER_DOMAIN_URL}/img/smiles/tv/10.gif`,
          },
          type: 'img',
        },
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm32)',
          },
        },
        {
          props: {
            alt: '(bgm32)',
            smileid: '48',
            src: `${STICKER_DOMAIN_URL}/img/smiles/tv/09.gif`,
          },
          type: 'img',
        },
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm24)',
          },
        },
        {
          props: {
            alt: '(bgm24)',
            smileid: '40',
            src: `${STICKER_DOMAIN_URL}/img/smiles/tv/01.gif`,
          },
          type: 'img',
        },
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm114)',
          },
        },
        {
          props: {
            alt: '(bgm114)',
            smileid: '130',
            src: `${STICKER_DOMAIN_URL}/img/smiles/tv/91.gif`,
          },
          type: 'img',
        },
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm38)',
          },
        },
        {
          props: {
            alt: '(bgm38)',
            smileid: '54',
            src: `${STICKER_DOMAIN_URL}/img/smiles/tv/15.gif`,
          },
          type: 'img',
        },
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm23)',
          },
        },
        {
          props: {
            alt: '(bgm23)',
            smileid: '39',
            src: `${STICKER_DOMAIN_URL}/img/smiles/bgm/23.gif`,
          },
          type: 'img',
        },
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm01)',
          },
        },
        {
          props: {
            alt: '(bgm01)',
            smileid: '17',
            src: `${STICKER_DOMAIN_URL}/img/smiles/bgm/01.png`,
          },
          type: 'img',
        },
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: "(='=)",
          },
        },
        {
          props: { alt: "(='=)", smileid: '10', src: `${STICKER_DOMAIN_URL}/img/smiles/10.gif` },
          type: 'img',
        },
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(=///=)',
          },
        },
        {
          props: { alt: '(=///=)', smileid: '13', src: `${STICKER_DOMAIN_URL}/img/smiles/13.gif` },
          type: 'img',
        },
      ],
      [
        {
          type: 'sticker',
          props: {
            stickerId: '(bgm233)',
          },
        },
        '(bgm233)',
      ],
    ];
    for (const [input, expected] of tests) {
      expect(convert(input)).toEqual(expected);
    }
  });
  test('unknown bbcode', () => {
    const node: CodeNodeTypes = {
      type: 'unknown',
      children: [
        {
          type: 'i',
          children: [
            {
              type: 'u',
              children: [
                {
                  type: 's',
                  children: [
                    {
                      type: 'output',
                      children: ['测试文字'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    const vnode: VNode = {
      type: 'unknown',
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
                  children: [
                    {
                      type: 'output',
                      children: ['测试文字'],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
    expect(convert(node)).toEqual(vnode);
  });
});
