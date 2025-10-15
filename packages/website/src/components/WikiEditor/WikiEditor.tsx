// 导入控件和功能，但不包含内置语言
import 'monaco-editor/esm/vs/editor/edcore.main.js';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import type { MutableRefObject } from 'react';
import React, { useEffect, useRef } from 'react';

import style from './WikiEditor.module.less';

interface WikiEditorProps {
  defaultValue?: string;
  instanceRef: MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
}

const WikiEditor = ({ defaultValue, instanceRef: instance }: WikiEditorProps) => {
  const editor = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (editor.current) {
      monaco.languages.register({ id: 'wiki' });

      monaco.languages.setLanguageConfiguration('wiki', {
        brackets: [
          ['{', '}'],
          ['[', ']'],
          ['{{', '}}'],
        ],

        autoClosingPairs: [
          { open: '{', close: '}' },
          { open: '[', close: ']' },
        ],
      });

      monaco.languages.setMonarchTokensProvider('wiki', {
        default: 'invalid',
        tokenPostfix: '.wiki',
        brackets: [
          // @ts-expect-error IMonarchLanguageBracket interface problems
          // https://microsoft.github.io/monaco-editor/api/interfaces/monaco.languages.IMonarchLanguageBracket.html
          ['{', '}', 'delimiter.curly'],
          // @ts-expect-error
          ['[', ']', 'delimiter.square'],
          // @ts-expect-error
          ['{{', '}}', 'delimiter.doubleCurly'],
        ],
        keywords: ['Infobox'],
        operators: ['='],
        prefix: /Infobox/,
        nbstr: /[^|]+?/,
        nsstr: /[^\s]+?/,
        str: /.+?/,
        all: /.*?/,
        W: /\s+/,
        w: /\s*/,
        tokenizer: {
          root: [
            [
              /({{)(@prefix)(@W?)(@nsstr?)(@w)$/,
              [
                'delimiter.bracket',
                { token: 'keyword', next: '@superblock' },
                '',
                'type.identifier',
                '',
              ],
            ],
            [/@all/, 'invaild'],
          ],
          superblock: [
            [/^@w(}})@w$/, 'delimiter.bracket', '@pop'],
            [
              /^(@w)(\|)(@w)(@str?)(@w)(=)(@w)(@all)(@w)$/,
              [
                '',
                'delimiter',
                '',
                'identifier',
                '',
                'operator.symbol',
                '',
                {
                  cases: {
                    '{': { token: 'delimiter.curly', next: '@array' },
                    '@default': { token: 'string.unquoted' },
                  },
                },
                '',
              ],
            ],
            [/@all/, 'invaild'],
          ],
          array: [
            [/^@w(})@w$/, 'delimiter.curly', '@pop'],
            [/^(@w)(\[)(@w)(\])\s*$/, ['', 'delimiter.square', '', 'delimiter.square']],
            [
              /^(@w)(\[)(@w)(@nbstr?)(@w)(\])@w$/,
              ['', 'delimiter.square', '', 'string.unquoted', '', 'delimiter.square'],
            ],
            [
              /^(@w)(\[)(@w)(@nbstr?)(@w)(\|)(@w)(\])@w$/,
              [
                '',
                'delimiter.square',
                '',
                'identifier',
                '',
                'delimiter.squarekey',
                '',
                'delimiter.square',
              ],
            ],
            [
              /^(@w)(\[)(@w)(@nbstr?)(@w)(\|)(@w)(@str?)(@w)(\])@w$/,
              [
                '',
                'delimiter.square',
                '',
                'identifier',
                '',
                'delimiter.squarekey',
                '',
                'string.unquoted',
                '',
                'delimiter.square',
              ],
            ],
            [/@all/, 'invaild'],
          ],
        },
      });

      monaco.editor.defineTheme('wiki', {
        base: 'vs',
        inherit: true,
        colors: {},
        rules: [
          { token: 'delimiter.bracket', foreground: '#ca565f' },
          { token: 'keyword', foreground: '#ca565f' },
          { token: 'delimiter', foreground: '#004dc0' },
          { token: 'operator', foreground: '#004dc0' },
          { token: 'type.identifier', foreground: '#2dabff' },
          { token: 'identifier', foreground: '#7839af' },
          { token: 'string', foreground: '#339900' },
        ],
      });
      monaco.editor.defineTheme('wiki-dark', {
        base: 'vs-dark',
        inherit: true,
        colors: {},
        rules: [
          { token: 'delimiter.bracket', foreground: '#f09199' },
          { token: 'keyword', foreground: '#f09199' },
          { token: 'delimiter', foreground: '#7bb0ff' },
          { token: 'operator', foreground: '#7bb0ff' },
          { token: 'type.identifier', foreground: '#aaddff' },
          { token: 'identifier', foreground: '#ca9ce6' },
          { token: 'string', foreground: '#a9d861' },
        ],
      });

      monaco.languages.setLanguageConfiguration('bangumi-wiki', {
        folding: {
          markers: { start: /{/, end: /}/ },
        },
      });
      instance.current = monaco.editor.create(editor.current, {
        theme: 'wiki',
        value: defaultValue,
        language: 'wiki',
        automaticLayout: true,
        wordWrap: 'on',
        minimap: {
          enabled: false,
        },
      });
    }
    return () => {
      if (instance.current) {
        instance.current.dispose();
      }
    };
  }, [defaultValue, instance]);

  useEffect(() => {
    if (instance.current) {
      instance.current.setValue(defaultValue ?? '');
    }
  }, [defaultValue, instance]);

  return <div id='bgm-wiki-editor' ref={editor} className={style.editor} />;
};

export default WikiEditor;
