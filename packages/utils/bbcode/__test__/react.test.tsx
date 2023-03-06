import { render, renderNode } from '../react';
import type { VNode } from '../types';

describe('react render vnode', () => {
  test('render multi style', () => {
    const vnode: VNode = {
      type: 'span',
      style: {
        'font-size': '18px',
        'line-height': '18px',
      },
      className: 'l',
      children: ['文字\n换行了'],
    };
    expect(renderNode(vnode)).toMatchSnapshot();
  });

  test('render link', () => {
    const vnode = {
      type: 'a',
      props: {
        href: 'http://chii.in/',
        target: '_blank',
        rel: 'nofollow external noopener noreferrer',
      },
      className: ['l', 'test'],
    };
    expect(renderNode(vnode)).toMatchSnapshot();
  });
  test('render boolean props node', () => {
    const vnode = {
      type: 'input',
      props: {
        type: 'text',
        disabled: true,
      },
    };
    expect(renderNode(vnode)).toMatchSnapshot();
  });
  test('render sticker node', () => {
    const id = '38';
    const vnode = {
      type: 'img',
      props: {
        'sticker-id': id,
        smileid: id,
        alt: `(bgm${id})`,
      },
    };
    expect(renderNode(vnode)).toMatchSnapshot();
  });
  test('render nest', () => {
    const sizeNode: VNode = {
      type: 'span',
      style: {
        'font-size': '18pt',
      },
      children: [
        {
          type: 'a',
          props: {
            href: 'http://chii.in/',
          },
          className: ['l'],
        },
      ],
    };
    const vnode: VNode = {
      type: 'span',
      style: {
        color: 'red',
      },
      children: [sizeNode],
    };
    expect(renderNode(sizeNode)).toMatchSnapshot();
    expect(renderNode(vnode)).toMatchSnapshot();
  });
  test('render mask', () => {
    const vnode: VNode = {
      type: 'span',
      style: {
        'background-color': '#555',
        color: '#555',
        border: '1px solid #555',
      },
      className: 'l',
      children: ['文字\n换行'],
    };
    expect(renderNode(vnode)).toMatchSnapshot();
  });
  test('render pre children', () => {
    const vnode: VNode = {
      type: 'pre',
      children: ['文字\n换行'],
    };
    expect(renderNode(vnode)).toMatchSnapshot();
  });
});

describe('html render bbcode string', () => {
  test('render color size', () => {
    const input = '[color=red][size=18]一般[b]粗[/b]\n   [s]删除[/s][/size][/color]';
    expect(render(input)).toMatchSnapshot();
  });
  test('render mask', () => {
    const input = '我是[mask]马赛克文字[/mask]';
    expect(render(input)).toMatchSnapshot();
  });
  test('render color', () => {
    const input = `我是
[color=red]彩[/color][color=green]色[/color][color=blue]的[/color][color=orange]哟[/color]。`;
    expect(render(input)).toMatchSnapshot();
  });
  test('render size', () => {
    const input = '[size=10]不同[/size][size=14]大小的[/size][size=18]文字[/size]效果也可实现。';
    expect(render(input)).toMatchSnapshot();
  });
  test('render url', () => {
    const input = 'Bangumi 番组计划: [url]http://chii.in/[/url]';
    expect(render(input)).toMatchSnapshot();

    const input2 = `带文字说明的网站链接：
[url=http://chii.in]Bangumi 番组计划[/url]`;
    expect(render(input2)).toMatchSnapshot();
  });

  test('render img', () => {
    const input = `存放于其他网络服务器的图片：
[img]http://chii.in/img/ico/bgm88-31.gif[/img]`;
    expect(render(input)).toMatchSnapshot();
  });
  test('render sticker', () => {
    const input = '(bgm38)(bgm23)(=///=)';
    expect(render(input)).toMatchSnapshot();
  });
  test('render quote', () => {
    const input = '[quote]ss[b]加粗[/b][/quote]';
    expect(render(input)).toMatchSnapshot();
  });
  test('render align', () => {
    const input = '[align=right]右[/align][center]中[/center][left]左[/left]';
    expect(render(input)).toMatchSnapshot();
  });
  test('render @user', () => {
    const input = '[user=1]sai[/user][user]a_little[/user]';
    expect(render(input)).toMatchSnapshot();
  });
  test('render code', () => {
    const input = '[code]ss[b]加粗\n换行了[/b](bgm38) [/fafa [code][/code]';
    expect(render(input)).toMatchSnapshot();
  });
  test('should render sticker', () => {
    expect(render('(bgm01)')).toMatchSnapshot();
    expect(render('(bgm38)')).toMatchSnapshot();
    expect(render('(bgm11)')).toMatchSnapshot();
  });
  test('should render br', () => {
    const input = `
    又名：CUP人生茶话会

    1.上班的时候想要回家的。
    2.学校课上打瞌睡的。(bgm38)
    2.学校课上打瞌睡的。(bgm11)
    2.学校课上打瞌睡的。(bgm12)


    `;

    expect(render(input)).toMatchSnapshot();
  });
  test('should produce unique react keys', () => {
    const checkUniqueKeys = (item: Array<string | React.ReactElement>) => {
      const keys = new Set<React.Key>();
      item.forEach((i) => {
        if (typeof i === 'string') {
          return;
        }
        if (i.key !== null) {
          expect(keys.has(i.key)).toBe(false);
          keys.add(i.key);
        }
        const props = i.props as Record<string, any>;
        if (typeof props.children === 'object') {
          checkUniqueKeys(i.props.children);
        }
      });
    };

    const input = '(bgm38)\n(bgm38)\n';
    const result = render(input);
    checkUniqueKeys(result);
  });
});
