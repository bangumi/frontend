import type { DraggableProvided, DropResult, ResponderProvided } from '@hello-pangea/dnd';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import cn from 'classnames';
import { concat, filter, isArray, isNumber, set } from 'lodash-es';
import { nanoid } from 'nanoid';
import type { JSX } from 'react';
import React, { createContext, useContext } from 'react';

import { Input } from '@bangumi/design';
import { Cursor, Minus, Plus, VerticalLeft, VerticalRight } from '@bangumi/icons';
import { css } from '@bangumi/styled-system/css';
import { WikiElement } from '@bangumi/utils';
import { reorder } from '@bangumi/website/utils';

const splitPath = (path: string) =>
  path.split('.').map((v) => {
    const idx = parseInt(v);
    if (!isNumber(idx) || isNaN(idx)) {
      throw Error('path must be like [number].[number]');
    }
    return idx;
  });

// 编辑器样式，保持原 less 的多 class 选择器优先级，覆盖 Input 组件内部的 .bgm-input__wrapper
const editorItem = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const editorItemInput = css({
  '&.bgm-input__wrapper': {
    borderRadius: '0',
    borderBottom: '0',
    '&:last-child': { flex: '1' },
  },
});

const editorItemInputGroup = css({
  display: 'flex',
  flex: '1',
});

const editorItemInputGroupSecondary = css({
  '&.bgm-input-group *': { background: '#fcfcfc' },
});

const editorItemMinus = css({
  opacity: '0.3',
  _hover: { opacity: '1' },
  cursor: 'pointer',
});

const editorItemConvertHandler = css({
  opacity: '0',
  color: '#9f9b9b',
  // 需要胜过 .bgm-input__prefix svg 的 19px 尺寸，用 [class] 提升优先级
  '&[class]': { width: '20px', height: '20px' },
  _hover: { cursor: 'pointer', opacity: '1' },
});

const editorItemTopRadius = css({
  '&.bgm-input__wrapper:first-of-type': { borderRadius: '12px 0 0' },
  '&.bgm-input__wrapper:last-of-type': { borderRadius: '0 12px 0 0' },
});

// 编辑器底部按钮样式
const footer = css({
  display: 'flex',
  gap: '4px',
});

const footerBtn = css({
  border: '2px dashed #e8e3e3',
  flex: '1',
  height: '44px',
  fontSize: '1rem',
  color: '#9f9b9b',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
  '&:first-of-type': { borderRadius: '0 0 0 12px' },
  '&:last-of-type': { borderLeft: 'unset', borderRadius: '0 0 12px' },
});

const footerPlaceholder = css({
  visibility: 'hidden',
});

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
  convertToNestedWikiElement: (idx: number) => void;
  hoistOneWikiElement: (path: string, key?: string, value?: string) => void;
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
  const {
    editOneWikiElement,
    removeOneWikiElement,
    convertToNestedWikiElement,
    hoistOneWikiElement,
  } = useContext(WikiInfoContext) ?? {};

  return (
    <div
      className={editorItem}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
          level === 1 && convertToNestedWikiElement?.(index); /** 只对一级菜单有效 */
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
        <Cursor />
      </div>

      <Input.Group
        className={cn(editorItemInputGroup, level === 2 && editorItemInputGroupSecondary)}
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.ctrlKey && e.key === 'Enter') {
            level === 1 && convertToNestedWikiElement?.(index);
            level === 2 && hoistOneWikiElement?.(path, item.key, item.value as string);
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
          wrapperClass={cn(editorItemInput, level === 1 && index === 0 && editorItemTopRadius)}
          // 切回一级功能先不做
          prefix={
            level === 2 ? (
              <VerticalLeft
                className={editorItemConvertHandler}
                onClick={() => {
                  // 现在最多只有二级，所以二级项一定是 string
                  hoistOneWikiElement?.(path, item.key, item.value as string);
                }}
              />
            ) : undefined
          }
          suffix={
            level === 1 &&
            !isArray(item.value) && (
              <VerticalRight
                className={editorItemConvertHandler}
                onClick={() => {
                  convertToNestedWikiElement?.(index);
                }}
              />
            )
          }
          align={level === 2 ? 'right' : undefined}
          defaultValue={item.key}
          onChange={(v: React.ChangeEvent<HTMLInputElement>) =>
            editOneWikiElement?.(path, 'key', v.target.value)
          }
        />
        <Input
          id={item._id}
          wrapperClass={cn(
            editorItemInput,
            //   一级菜单的第一项，上圆角
            level === 1 && index === 0 && editorItemTopRadius,
          )}
          defaultValue={typeof item.value === 'string' ? item.value : ''}
          disabled={isArray(item.value)}
          onChange={(v: React.ChangeEvent<HTMLInputElement>) =>
            editOneWikiElement?.(path, 'value', v.target.value)
          }
        />
      </Input.Group>

      <Minus
        className={editorItemMinus}
        title='删除一项'
        onClick={() => removeOneWikiElement?.(path)}
      />
    </div>
  );
};

function WikiBeginnerEditorBlock({
  elements,
  level = 1,
  path = '0',
  onDragEnd,
}: {
  elements: WikiElement[];
  level?: number;
  path?: string;
  onDragEnd: (path: string, result: DropResult, provided: ResponderProvided) => void;
}) {
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
  const focusToElement = (id: string) => {
    const input = document.getElementById(id);
    input?.focus();
  };

  const onDragEnd = (path: string, result: DropResult, provided: ResponderProvided) => {
    const { destination, source } = result;
    const [idx] = splitPath(path);
    if (!destination) return;
    const level = parseInt(source.droppableId.split('-')[1] ?? '-1');
    if (level === 1) {
      // reorder root element.
      onChange(reorder(elements, source.index, destination.index));
    } else if (level === 2 && isNumber(idx)) {
      // reorder nested element.
      onChange(
        elements.map((el, i) =>
          i === idx && isArray(el.value)
            ? new WikiElement({
                ...el,
                value: reorder(el.value, source.index, destination.index),
              })
            : el,
        ),
      );
    }
  };

  const addOneWikiElement = (path?: string) => {
    if (path) {
      // add nested element
      const [idx] = splitPath(path);
      if (isNumber(idx) && !isNaN(idx)) {
        onChange(
          elements.map((el, i) =>
            i === idx && isArray(el.value)
              ? new WikiElement({
                  ...el,
                  // 二级菜单新增项目
                  value: concat(el.value, new WikiElement()),
                })
              : el,
          ),
        );
        return;
      }
    }

    // add root element
    onChange(concat(elements, new WikiElement()));
  };

  const removeOneWikiElement = (path: string) => {
    const [idx, subIdx] = splitPath(path);
    const id = nanoid();
    onChange(
      isNumber(subIdx)
        ? // remove nested WikiElement
          elements.map((el, i) => {
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
          })
        : // remove root WikiElement
          filter(elements, (_, i) => i !== idx),
    );
    focusToElement(id);
  };

  const editOneWikiElement = (path: string, target: 'key' | 'value', value: string) => {
    const [idx, subIdx] = splitPath(path);
    if (!isNumber(idx)) return;
    onChange(
      isNumber(subIdx)
        ? set(elements, `${idx}.value.${subIdx}.${target}`, value)
        : set(elements, `${idx}.${target}`, value),
    );
  };

  const convertToNestedWikiElement = (idx: number) => {
    const id = nanoid();
    onChange(
      set(
        // shallow copy
        [...elements],
        idx,
        new WikiElement({
          key: elements[idx]?.key,
          value: [
            new WikiElement({
              id,
              // Copy the root element value to the first child
              value: elements[idx]?.value ?? '',
            }),
          ],
        }),
      ),
    );
    focusToElement(id);
  };

  const hoistOneWikiElement = (path: string, key = '', value = '') => {
    const [idx, subIdx] = splitPath(path);
    if (!isNumber(idx)) return;
    onChange([
      // 取出包括索引为 idx 的子数组
      ...elements.slice(0, idx + 1).map((el, rootIndex) =>
        rootIndex === idx && isArray(el.value)
          ? new WikiElement({
              ...el,
              // 有子项移除 subIdx 对应的子项，无子项变为可编辑
              value: el.value.length === 1 ? '' : filter(el.value, (_, index) => index !== subIdx),
            })
          : el,
      ),
      // 插入该子项
      new WikiElement({ key, value }),
      ...elements.slice(idx + 1, elements.length),
    ]);
  };

  return (
    <WikiInfoContext.Provider
      value={{
        elements,
        addOneWikiElement,
        removeOneWikiElement,
        editOneWikiElement,
        convertToNestedWikiElement,
        hoistOneWikiElement,
      }}
    >
      <div>
        <WikiBeginnerEditorBlock elements={elements} onDragEnd={onDragEnd} />
        <div className={footer}>
          {/* place holder */}
          <Cursor className={footerPlaceholder} />

          <button
            className={footerBtn}
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
            className={footerBtn}
            onClick={() => {
              const lastEls = elements[elements.length - 1];
              // 如果最后一个元素就是一个二级菜单，新增二级项目
              if (lastEls && isArray(lastEls?.value)) {
                addOneWikiElement?.((elements.length - 1).toString());
                return;
              }
              // 否则将其继续转为二级菜单
              convertToNestedWikiElement(elements.length - 1);
            }}
            type='button'
          >
            <Plus />
            <span>新增二级项目</span>
          </button>

          {/* place holder */}
          <Minus className={footerPlaceholder} />
        </div>
      </div>
    </WikiInfoContext.Provider>
  );
}

export default WikiBeginnerEditor;
