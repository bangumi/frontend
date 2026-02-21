// 导入控件和功能，但不包含内置语言
import 'monaco-editor/esm/vs/editor/edcore.main.js';

import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import type { MutableRefObject } from 'react';
import React, { useEffect, useRef } from 'react';

import style from './WikiEditor.module.less';

interface WikiEditorProps {
  defaultValue?: string;
  instanceRef: MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
}

function validate(model: monaco.editor.ITextModel) {
  const text = model.getValue();
  const markers = [];

  const lines = text.split(/\r?\n/);
  let cnt = 0;
  let superblock = null;
  let array = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';
    if (/^\s*$/.test(line)) continue;
    const startLineNumber = i + 1;
    const block = /^\s*{{\s*Infobox(?<type>\s+\S+)?\s*$/.exec(line);
    if (block) {
      const startColumn = line.indexOf('{{') + 1;
      if (!superblock) {
        superblock = {
          startLineNumber,
          startColumn,
          endLineNumber: startLineNumber,
          endColumn: startColumn + 9,
        };
        if (!block.groups?.type) {
          markers.push({
            severity: monaco.MarkerSeverity.Warning,
            message: '没有类型',
            ...superblock,
          });
        }

        cnt++;
        if (cnt > 1) {
          markers.push({
            severity: monaco.MarkerSeverity.Error,
            message: "只允许一个 '{{Infobox'",
            ...superblock,
          });
        }
        continue;
      } else {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "没有匹配的 '}}'",
          ...superblock,
        });
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "意外的 '{{Infobox'\n上一个 '{{Infobox' 没有匹配的 '}}'",
          startLineNumber,
          startColumn,
          endLineNumber: startLineNumber,
          endColumn: startColumn + 9,
        });
      }
      continue;
    }
    if (/^\s*}}\s*$/.test(line)) {
      if (!superblock) {
        const startColumn = line.indexOf('}}') + 1;
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "多余的 '}}'\n可能是漏了 '{{Infobox'",
          startLineNumber,
          startColumn,
          endLineNumber: startLineNumber,
          endColumn: startColumn + 2,
        });
      } else {
        superblock = null;
      }
      continue;
    }
    if (/^\s*\|/.test(line)) {
      const field = /^(?<start>\s*\|\s*)(?<key>[^=]+?)?(?<operator>\s*=\s*)(?<value>.+?)?\s*$/.exec(
        line,
      );
      if (!field) {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: '错误的字段格式',
          startLineNumber,
          startColumn: line.search(/\S/) + 1,
          endLineNumber: startLineNumber,
          endColumn: line.length,
        });
        continue;
      }
      if (array) {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "缺少匹配的 '}'",
          ...array,
        });
        array = null;
      }
      const { start, key, operator, value } = field.groups ?? {};
      if (value && value.trim() === '{') {
        const startColumn = (start?.length ?? 0) + (key?.length ?? 0) + (operator?.length ?? 0) + 1;
        array = {
          startLineNumber,
          startColumn,
          endLineNumber: startLineNumber,
          endColumn: startColumn + 1,
        };
      }
      continue;
    }
    if (/^\s*}\s*$/.test(line)) {
      if (!array) {
        const startColumn = line.indexOf('}') + 1;
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "多余的 '}'\n可能是漏了 '{'",
          startLineNumber,
          startColumn,
          endLineNumber: startLineNumber,
          endColumn: startColumn + 1,
        });
      } else {
        array = null;
      }
      continue;
    }
    const item = /^(?<start>\s*)(?<open>\[)?(?<content>.*?)(?<close>\])?\s*$/.exec(line);
    if (item) {
      if (!array) {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "意外的数组项\n可能是漏了 '{'",
          startLineNumber,
          startColumn: line.search(/\S/) + 1,
          endLineNumber: startLineNumber,
          endColumn: line.length,
        });
      }
      if (!item.groups?.open) {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "缺少 '['",
          startLineNumber,
          startColumn: (item.groups?.start?.length ?? 0) + 1,
          endLineNumber: startLineNumber,
          endColumn: line.length,
        });
      }
      if (!item.groups?.close) {
        markers.push({
          severity: monaco.MarkerSeverity.Error,
          message: "缺少 ']'",
          startLineNumber,
          startColumn: (item.groups?.start?.length ?? 0) + 1,
          endLineNumber: startLineNumber,
          endColumn: line.length,
        });
      }
      continue;
    }
    markers.push({
      severity: monaco.MarkerSeverity.Error,
      message: '未知内容',
      startLineNumber,
      startColumn: line.search(/\S/) + 1,
      endLineNumber: startLineNumber,
      endColumn: line.length,
    });
  }
  if (superblock) {
    markers.push({
      severity: monaco.MarkerSeverity.Error,
      message: "缺少匹配的 '}}'",
      ...superblock,
    });
  }
  monaco.editor.setModelMarkers(model, 'wiki-check', markers);
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
        defaultToken: 'invalid',
        tokenPostfix: '.wiki',
        brackets: [
          { open: '{', close: '}', token: 'delimiter.bracket' },
          { open: '[', close: ']', token: 'delimiter.square' },
          { open: '{{', close: '}}', token: 'delimiter.doubleCurly' },
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
            [/.*/, 'invalid'],
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
            [/.*/, 'invalid'],
          ],
          array: [
            [/^@w(})@w$/, 'delimiter.curly', '@pop'],
            [/^(@w)(\[)(@w)(\])(@w)$/, ['', 'delimiter.square', '', 'delimiter.square', '']],
            [
              /^(@w)(\[)(@w)(@nbstr?)(@w)(\])(@w)$/,
              ['', 'delimiter.square', '', 'string.unquoted', '', 'delimiter.square', ''],
            ],
            [
              /^(@w)(\[)(@w)(@nbstr?)(@w)(\|)(@w)(\])(@w)$/,
              [
                '',
                'delimiter.square',
                '',
                'identifier',
                '',
                'delimiter.squarekey',
                '',
                'delimiter.square',
                '',
              ],
            ],
            [
              /^(@w)(\[)(@w)(@nbstr?)(@w)(\|)(@w)(@str?)(@w)(\])(@w)$/,
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
                '',
              ],
            ],
            [/.*/, 'invalid'],
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

      monaco.languages.setLanguageConfiguration('wiki', {
        folding: {
          markers: { start: /{/, end: /}/ },
        },
      });

      const uri = monaco.Uri.parse('inmemory://infobox.wiki');
      const model = monaco.editor.createModel(defaultValue ?? '', 'wiki', uri);

      instance.current = monaco.editor.create(editor.current, {
        theme: 'wiki',
        model,
        language: 'wiki',
        automaticLayout: true,
        wordWrap: 'on',
        minimap: {
          enabled: false,
          showRegionSectionHeaders: false,
        },
      });
      validate(model);
      model.onDidChangeContent(() => {
        validate(model);
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
