import { STICKER_DOMAIN_URL } from '@bangumi/utils/bbcode/constants.ts';
import { convert } from '@bangumi/utils/bbcode/convert.ts';
import type { CodeNodeTypes, NodeTypes, VNode } from '@bangumi/utils/bbcode/types.ts';

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
    const classicCases: Array<
      [code: string, path: string, smileid: string, width: number, height: number]
    > = [
      ['(bgm24)', '/img/smiles/tv/01.gif', '40', 21, 21],
      ["(='=)", '/img/smiles/10.gif', '10', 26, 14],
      ['(bgm124)', '/img/smiles/tv/101.gif', '140', 21, 21],
      ['(bgm125)', '/img/smiles/tv/102.gif', '141', 21, 21],
      ['(bgm200)', '/img/smiles/tv_vs/bgm_200.png', '216', 21, 21],
      ['(bgm500)', '/img/smiles/tv_500/bgm_500.gif', '516', 21, 21],
      ['(bgm1)', '/img/smiles/bgm/01.png', '17', 20, 20],
    ];

    for (const [code, path, smileid, width, height] of classicCases) {
      expect(convert({ type: 'sticker', props: { stickerId: code } }), code).toEqual({
        type: 'img',
        props: {
          alt: code,
          height: String(height),
          smileid,
          src: `${STICKER_DOMAIN_URL}${path}`,
          width: String(width),
        },
      });
    }

    for (const prefix of ['musume', 'blake']) {
      const code = `(${prefix}_03)`;
      expect(convert({ type: 'sticker', props: { stickerId: code } }), code).toEqual({
        type: 'img',
        props: {
          alt: '喜欢',
          decoding: 'async',
          height: '55',
          loading: 'lazy',
          smileid: `${prefix}_03`,
          src: `${STICKER_DOMAIN_URL}/img/smiles/${prefix}/${prefix}_03.gif`,
          width: '55',
        },
        style: {
          'max-width': '55px',
          height: 'auto',
          'vertical-align': 'bottom',
        },
      });
    }

    expect(convert({ type: 'sticker', props: { stickerId: '(bgm999)' } })).toBe('(bgm999)');
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
