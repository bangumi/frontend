import React, { useState } from 'react';

import { css } from '@bangumi/styled-system/css';
import { BBCodePreset } from '@bangumi/utils/bbcode/presets';
import { render } from '@bangumi/utils/bbcode/react';
import Helmet from '@bangumi/website/components/Helmet';
import PageContainer from '@bangumi/website/components/PageContainer';

interface SyntaxItem {
  name: string;
  examples: string[];
  description: string;
}

// 仅收录 @bangumi/utils 的 bbcode parser（packages/utils/bbcode/parser.ts）实际支持的语法
const SYNTAX_ITEMS: SyntaxItem[] = [
  {
    name: '粗体',
    examples: ['[b]粗体[/b]'],
    description: '将文字加粗显示。',
  },
  {
    name: '斜体',
    examples: ['[i]斜体[/i]'],
    description: '将文字显示为斜体。',
  },
  {
    name: '下划线',
    examples: ['[u]下划线[/u]'],
    description: '为文字添加下划线。',
  },
  {
    name: '删除线',
    examples: ['[s]删除线[/s]'],
    description: '为文字添加删除线。',
  },
  {
    name: '颜色',
    examples: ['[color=red]红色[/color]', '[color=#ff6600]橙色[/color]'],
    description: '设置文字颜色，支持 CSS 颜色名和十六进制颜色值。',
  },
  {
    name: '字号',
    examples: ['[size=18]大号文字[/size]'],
    description: '设置文字大小，数字表示字体像素大小。',
  },
  {
    name: '链接',
    examples: ['[url=https://bgm.tv]Bangumi[/url]', '[url]https://bgm.tv[/url]'],
    description: '为文字添加超链接；不指定地址时以内容本身作为链接地址。',
  },
  {
    name: '图片',
    examples: ['[img]https://example.com/image.png[/img]'],
    description: '插入网络图片，需要使用图片的直链地址。',
  },
  {
    name: '引用',
    examples: ['[quote]引用内容[/quote]'],
    description: '将内容显示为引用块。',
  },
  {
    name: '代码',
    examples: ['[code]const a = 1;[/code]'],
    description: '以代码块显示内容，代码内部的其他 BBCode 不会被解析。',
  },
  {
    name: '剧透',
    examples: ['[mask]隐藏内容[/mask]'],
    description: '隐藏文字，鼠标选中文字即可查看内容。',
  },
  {
    name: '对齐',
    examples: ['[left]左对齐[/left]', '[center]居中[/center]', '[right]右对齐[/right]'],
    description: '设置内容的对齐方式，也可以使用 [align=center] 等写法。',
  },
  {
    name: '缩进',
    examples: ['[indent]缩进内容[/indent]'],
    description: '将内容作为缩进段落显示。',
  },
  {
    name: '提及',
    examples: ['[user]用户名[/user]'],
    description: '提及站内用户，会生成指向该用户的链接。',
  },
];

const DEFAULT_DEMO = `[center][b]Bangumi 番组计划[/b][/center]

[color=red]红色文字[/color] [size=18]大号文字[/size]

[url=https://bgm.tv]bangumi.tv[/url]

[quote]欢迎使用 BBCode 语法！[/quote]`;

const title = css({ fontSize: '24px', fontWeight: '600', margin: '0 0 24px' });

const wrapper = css({
  display: 'flex',
  gap: '40px',
  alignItems: 'flex-start',
  mdDown: { flexDirection: 'column', gap: '32px' },
});

const syntax = css({ flex: '1 1 40%', minWidth: '0' });

const demo = css({ flex: '1 1 60%', minWidth: '0' });

const sectionTitle = css({ fontSize: '18px', fontWeight: '600', margin: '0 0 16px' });

const syntaxList = css({ margin: '0', padding: '0' });

const syntaxItem = css({
  padding: '12px 0',
  borderBottom: '1px solid #eee',
  _last: { borderBottom: 'none' },
});

const syntaxTerm = css({
  display: 'flex',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '12px',
  fontWeight: 'normal',
  margin: '0 0 6px',
});

const tagName = css({ fontSize: '16px', fontWeight: '600' });

const example = css({
  fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
  fontSize: '13px',
  color: '#d6336c',
  background: '#f4f4f4',
  border: '1px solid #e6e6e6',
  borderRadius: '4px',
  padding: '2px 6px',
});

const syntaxDesc = css({ margin: '0', fontSize: '13px', lineHeight: '1.8', color: '#666' });

const note = css({ margin: '16px 0 0', fontSize: '13px', color: '#999' });

const demoHint = css({ margin: '0 0 12px', fontSize: '13px', color: '#666' });

const demoTextarea = css({
  width: '100%',
  boxSizing: 'border-box',
  minHeight: '180px',
  padding: '12px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
  fontSize: '13px',
  lineHeight: '1.6',
  resize: 'vertical',
  outline: 'none',
  _focus: { borderColor: '#888' },
});

const preview = css({
  marginTop: '16px',
  minHeight: '120px',
  padding: '16px',
  border: '1px solid #e6e6e6',
  borderRadius: '4px',
  background: '#fafafa',
  lineHeight: '1.8',
  overflowWrap: 'break-word',
});

const previewEmpty = css({ margin: '0', fontSize: '13px', color: '#999' });

const BBCodeHelp: React.FC = () => {
  const [value, setValue] = useState(DEFAULT_DEMO);

  return (
    <>
      <Helmet title='BBCode 帮助' />
      <PageContainer>
        <h1 className={title}>BBCode 帮助</h1>
        <div className={wrapper}>
          <section className={syntax}>
            <h2 className={sectionTitle}>语法说明</h2>
            <dl className={syntaxList}>
              {SYNTAX_ITEMS.map((item) => (
                <div className={syntaxItem} key={item.name}>
                  <dt className={syntaxTerm}>
                    <span className={tagName}>{item.name}</span>
                    {item.examples.map((exampleText) => (
                      <code className={example} key={exampleText}>
                        {exampleText}
                      </code>
                    ))}
                  </dt>
                  <dd className={syntaxDesc}>{item.description}</dd>
                </div>
              ))}
            </dl>
            <p className={note}>小提示：输入 (bgm38) 等表情代码可以插入 Bangumi 表情。</p>
          </section>
          <section className={demo}>
            <h2 className={sectionTitle}>交互式示例</h2>
            <p className={demoHint}>在下方输入 BBCode，预览区会实时显示渲染效果。</p>
            <textarea
              className={demoTextarea}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={12}
              placeholder='输入 BBCode，例如 [b]粗体[/b]'
            />
            <div className={preview}>
              {value.trim() === '' ? (
                <p className={previewEmpty}>输入内容后，这里会显示渲染效果。</p>
              ) : (
                render(value, BBCodePreset.topic)
              )}
            </div>
          </section>
        </div>
      </PageContainer>
    </>
  );
};

export default BBCodeHelp;
