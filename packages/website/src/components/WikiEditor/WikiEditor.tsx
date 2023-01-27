import * as monaco from 'monaco-editor';
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

        tokenizer: {
          root: [[/{{Infobox/, 'metatag', '@doctype']],

          doctype: [
            [/[^|]*$/, 'string'],
            [/\|[^=]+/, 'variable', '@field'],
            [/\|[^=]+/, 'variable', '@field'],
            [/}}/, { token: 'metatag', next: '@pop' }],
          ],

          field: [
            [/=/, { token: 'delimiter' }],
            [/{/, 'delimiter', '@array'],
            [/[^{n]+/, { token: 'string', next: '@pop' }],
          ],

          array: [
            [/\[/, { token: 'delimiter', next: '@arrayItem' }],
            [/}/, { token: '@rematch', next: '@doctype' }],
          ],

          // `日文名|ワンピース]`
          // `航海王]`
          arrayItem: [
            [/(.+)(\|)([^\]]*)/, ['identify', 'delimiter', 'string']],
            [/[^\]]+/, { token: 'string' }],
            [/]$/, { token: 'delimiter', next: '@pop' }],
          ],
        },
      });

      instance.current = monaco.editor.create(editor.current, {
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
