import cn from 'classnames';
import { cloneDeep, concat, filter, isArray, isNumber, set } from 'lodash';
import { nanoid } from 'nanoid';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { DraggableProvided, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { Input } from '@bangumi/design';
import { Cursor, Minus, Plus } from '@bangumi/icons';
import { WikiElement } from '@bangumi/utils';
import { reorder } from '@bangumi/website/utils';

import style from './WikiBeginnerEditor.module.less';

type WikiInfoItemProps = JSX.IntrinsicElements['div'] & {
  index: number;
  item: WikiElement;
  /**
   * 一级索引.二级索引（若存在，比如二级项目是一个数组，则有这个二级索引）
   * [index].[index]
   */
  path: string;
  level?: number;
  draggableProvided: DraggableProvided;
};

interface IWikiInfoContext {
  elements: WikiElement[];
  addOneWikiElement: (path?: string) => void;
  removeOneWikiElement: (path: string) => void;
  editOneWikiElement: (path: string, target: 'value' | 'key', value: string) => void;
  switchWikiElementToArray: (idx: number) => void;
}

export const WikiInfoContext = createContext<IWikiInfoContext | null>(null);

const WikiInfoItem = ({
  item,
  level = 1,
  draggableProvided,
  path,
  index,
  ...rest
}: WikiInfoItemProps) => {
  const { editOneWikiElement, removeOneWikiElement, switchWikiElementToArray } =
    useContext(WikiInfoContext) ?? {};

  return (
    <div
      className={style.editorItem}
      onKeyDown={(e) => {
        if (e.ctrlKey && e.key === 'Enter') {
          level === 1 && switchWikiElementToArray?.(index); /** 只对一级菜单有效 */
        }
        if (e.ctrlKey && e.code === 'KeyX') {
          removeOneWikiElement?.(path);
        }
      }}
      {...rest}
    >
      <div
        {...draggableProvided.dragHandleProps}
        /**
         * dragHandleProps 中会设置 tabIndex = 0，导致当激活上面的输入框时，按下 Tab
         * 无法 focus 下一个输入框，而是 focus 该 Icon，这里将 tabIndex 复写为 -1，
         * 这样下一个输入框由于有更高的优先级就可以被 focus 了。
         */
        tabIndex={-1}
      >
        <Cursor className={style.editorItemCursor} />
      </div>

      <Input.Group
        className={cn(
          style.editorItemInputGroup,
          level === 2 && style.editorItemInputGroupSecondary,
        )}
        onKeyDown={(e) => {
          if (e.ctrlKey && e.key === 'Enter') {
            level === 1 && switchWikiElementToArray?.(index); /** 只对一级菜单有效 */
          }
          if (e.ctrlKey && e.code === 'KeyX') {
            removeOneWikiElement?.(path);
          }
          // 阻止回车提交表单
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      >
        <Input
          wrapperStyle={{
            width: '170px',
          }}
          //   一级菜单的第一项，上圆角
          wrapperClass={cn(
            style.editorItemInput,
            level === 1 && index === 0 && style.editorItemTopRadius,
          )}
          align={level === 2 ? 'right' : undefined}
          defaultValue={item.key}
          onChange={(v) => editOneWikiElement?.(path, 'key', v.target.value)}
        />
        <Input
          id={item._id}
          wrapperClass={cn(
            style.editorItemInput,
            //   一级菜单的第一项，上圆角
            level === 1 && index === 0 && style.editorItemTopRadius,
          )}
          defaultValue={typeof item.value === 'string' ? item.value : ''}
          disabled={isArray(item.value)}
          onChange={(v) => editOneWikiElement?.(path, 'value', v.target.value)}
        />
      </Input.Group>

      <Minus
        className={style.editorItemMinus}
        title='删除一项'
        onClick={() => removeOneWikiElement?.(path)}
      />
    </div>
  );
};

function WikiBeginnerEditorBlock({
  elements,
  level = 1,
  path = '',
  onDragEnd,
}: {
  elements: WikiElement[];
  level?: number;
  path?: string;
  onDragEnd: (path: string, result: DropResult, provided: ResponderProvided) => void;
}) {
  //   const { elements } = useContext(WikiInfoContext) ?? {};

  return (
    <DragDropContext
      onDragEnd={(res, provided) => {
        onDragEnd(path, res, provided);
      }}
    >
      <Droppable droppableId={`list-${level}`}>
        {(droppableProvided) => (
          <div ref={droppableProvided.innerRef}>
            {elements?.map((el, idx) => {
              return (
                <Draggable key={el._id} index={idx} draggableId={el._id}>
                  {(draggableProvided) => (
                    <div ref={draggableProvided.innerRef} {...draggableProvided.draggableProps}>
                      <WikiInfoItem
                        index={idx}
                        item={el}
                        level={level}
                        path={level === 1 ? idx.toString() : `${path}.${idx}`}
                        draggableProvided={draggableProvided}
                      />

                      {/* subList */}
                      {isArray(el.value) && (
                        <WikiBeginnerEditorBlock
                          elements={el.value}
                          level={level + 1}
                          onDragEnd={onDragEnd}
                          path={level === 1 ? idx.toString() : `${path}.${idx}`}
                        />
                      )}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

function WikiBeginnerEditor({
  elements,
  onChange,
}: {
  elements: WikiElement[];
  onChange: (elements: WikiElement[]) => void;
}) {
  const [inputFocusToId, setInputFocusToId] = useState('');
  useEffect(() => {
    const input = document.getElementById(inputFocusToId);
    if (input) {
      input.focus();
    }
    setInputFocusToId('');
  }, [inputFocusToId]);

  const onDragEnd = (path: string, result: DropResult, provided: ResponderProvided) => {
    const { destination, source } = result;
    const [idx] = path.split('.').map((v) => parseInt(v));
    if (!destination) return;
    const level = parseInt(source.droppableId.split('-')[1] ?? '-1');
    if (level === 1) {
      onChange(reorder(elements, source.index, destination.index));
    } else if (level === 2 && isNumber(idx)) {
      onChange(
        elements.map((el, i) => {
          if (i === idx && isArray(el.value)) {
            return {
              ...el,
              value: reorder(el.value, source.index, destination.index),
            };
          }
          return el;
        }),
      );
    }
  };

  const addOneWikiElement = (path?: string) => {
    if (path) {
      const [idx] = path.split('.').map((v) => parseInt(v));
      // 深拷贝 WikiElements
      const newEls = cloneDeep(elements);
      if (isNumber(idx) && !isNaN(idx)) {
        const preValue = newEls[idx]?.value as WikiElement[];
        // 给二级菜单新增项目
        onChange(set(newEls, `${idx}.value`, concat(preValue, new WikiElement())));
        return;
      }
    }

    onChange(concat(elements, new WikiElement()));
  };

  const removeOneWikiElement = (path: string) => {
    const [idx, subIdx] = path.split('.').map((v) => parseInt(v));
    const id = nanoid();
    if (!isNumber(idx)) return;
    onChange(
      ((preEl) => {
        if (isNumber(subIdx)) {
          return preEl.map((el, i) => {
            if (i === idx && isArray(el.value)) {
              return {
                ...el,
                _id: id,
                value:
                  el.value.length === 1
                    ? el.value[0]?.value
                    : filter(el.value, (_, i) => i !== subIdx),
              };
            }
            return el;
          });
        }
        return filter(preEl, (_, i) => i !== idx);
      })(elements),
    );
    setInputFocusToId(id);
  };

  const editOneWikiElement = (path: string, target: 'key' | 'value', value: string) => {
    const [idx, subIdx] = path.split('.').map((v) => parseInt(v));
    if (!isNumber(idx)) return;
    onChange(
      ((preEls) => {
        if (isNumber(subIdx)) {
          return set(preEls, `${idx}.value.${subIdx}.${target}`, value);
        }
        return set(preEls, `${idx}.${target}`, value);
      })(elements),
    );
  };

  const convertToNestedWikiElement = (idx: number) => {
    const id = nanoid();
    onChange(
      ((preEls) => {
        const newEls = [...preEls];
        return set(
          newEls,
          idx,
          new WikiElement({
            key: preEls[idx]?.key,
            value: [
              new WikiElement({
                id,
                value: preEls[idx]?.value ?? '',
              }),
            ],
          }),
        );
      })(elements),
    );
    setInputFocusToId(id);
  };

  return (
    <WikiInfoContext.Provider
      value={{
        elements,
        addOneWikiElement,
        removeOneWikiElement,
        editOneWikiElement,
        switchWikiElementToArray,
      }}
    >
      <div className={style.wikiEditor}>
        <div className={style.tips}>
          <div>Tips:</div>
          <div>可拖拽改变行顺序</div>
          <div>
            按<kbd>Ctrl</kbd>+<kbd>Enter</kbd>切换为二级项目
          </div>
          <div>
            按<kbd>Ctrl</kbd>+<kbd>X</kbd>可删除项目
          </div>
        </div>
        <WikiBeginnerEditorBlock elements={elements} onDragEnd={onDragEnd} />
        <div className={style.footer}>
          {/* place holder */}
          <Cursor className={style.footerPlaceholder} />

          <button
            className={style.footerBtn}
            onClick={() => {
              // 永远新增一级项目，即使上面是一个二级项目
              addOneWikiElement?.();
            }}
            type='button'
          >
            <Plus />
            <span>新增一级项目</span>
          </button>
          <button
            className={style.footerBtn}
            onClick={() => {
              const lastEls = elements[elements.length - 1];
              // 如果最后一个元素就是一个二级菜单，新增二级项目
              if (lastEls && isArray(lastEls?.value)) {
                addOneWikiElement?.((elements.length - 1).toString());
                return;
              }
              // 否则将其继续转为二级菜单
              switchWikiElementToArray(elements.length - 1);
            }}
            type='button'
          >
            <Plus />
            <span>新增二级项目</span>
          </button>

          {/* place holder */}
          <Minus className={style.footerPlaceholder} />
        </div>
      </div>
    </WikiInfoContext.Provider>
  );
}

export default WikiBeginnerEditor;
