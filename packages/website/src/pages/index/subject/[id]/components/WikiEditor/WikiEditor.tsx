import * as monaco from 'monaco-editor';
import React, { useEffect, useRef } from 'react';

import style from './WikiEditor.module.less';

interface WikiEditorProps {
  defaultValue?: string;
}

const WikiEditor = ({ defaultValue }: WikiEditorProps) => {
  const editor = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let instance: monaco.editor.IStandaloneCodeEditor | undefined;
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
          ['{', '}', 'delimiter.curly'] as any,
          ['[', ']', 'delimiter.square'],
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

      instance = monaco.editor.create(editor.current, {
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
      if (instance) {
        instance.dispose();
      }
    };
  }, []);

  return <div id='bgm-wiki-editor' ref={editor} className={style.editor} />;
};

export default WikiEditor;
