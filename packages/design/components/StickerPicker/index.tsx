import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Clock } from '@bangumi/icons/index.tsx';
import { css, cx } from '@bangumi/styled-system/css';
import type { Sticker, StickerSet } from '@bangumi/utils/stickers.ts';
import { getSticker, STICKER_SETS } from '@bangumi/utils/stickers.ts';

import type { StickerNavId } from './categories.ts';
import {
  CHARACTER_CELL_SIZE,
  CLASSIC_CELL_SIZE,
  NAV_HEIGHT,
  RECENT_NAV_ID,
  RECENT_NAV_LABEL,
  SET_NAV_ICON,
} from './categories.ts';
import { useRecentStickers } from './useRecentStickers.ts';

export interface StickerPickerProps {
  /** 选中表情后的回调，参数为表情代码，如 `(bgm38)` */
  onSelect: (code: string) => void;
  className?: string;
}

/**
 * 裁剪框。滚动条画在滚动元素的 border box 里，不会被它自己的 `border-radius` 裁掉，
 * 所以方角会捅出 Popover 的圆角；套一层 `overflow: hidden` 才能把滚动条一起裁进圆角。
 */
const pickerFrame = css({
  // 旧站桌面端 450px 宽，窄屏收缩到视口内。
  // Panda 构建期静态提取，这里只能是字面量，不能引用常量
  width: 'min(450px, calc(100vw - 24px))',
  borderRadius: 'inherit',
  overflow: 'hidden',
});

const scroller = css({
  // 分节用 offsetTop 定位，offsetParent 必须是滚动容器自己
  position: 'relative',
  width: '100%',
  height: '320px',
  overflowY: 'auto',
  overscrollBehavior: 'contain',
  boxSizing: 'border-box',
});

const nav = css({
  position: 'sticky',
  top: '0',
  zIndex: '2',
  display: 'flex',
  alignItems: 'center',
  gap: '0',
  padding: '4px 5px',
  // 半透明 + 毛玻璃，滚动时下方表情透上来
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  backdropFilter: 'blur(8px)',
});

const navButton = css({
  flex: '0 0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '32px',
  padding: '3px',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  boxSizing: 'border-box',
  transition: 'background 0.2s linear',
  _hover: { backgroundColor: 'rgba(54, 156, 248, 0.14)' },
  _focusVisible: { outline: '2px solid #369cf8', outlineOffset: '-2px' },
  '& img': { maxWidth: '22px', maxHeight: '22px', width: 'auto', height: 'auto' },
});

// 首尾各圆一边，整排导航看起来是一枚胶囊
const navFirst = css({ borderTopLeftRadius: '9px', borderBottomLeftRadius: '9px' });
const navLast = css({ borderTopRightRadius: '9px', borderBottomRightRadius: '9px' });
const navActive = css({ backgroundColor: 'rgba(54, 156, 248, 0.14)' });

const setTitle = css({
  margin: '0',
  padding: '10px 0 0 5px',
  fontSize: '11px',
  fontWeight: 'normal',
  lineHeight: '1.4',
  color: '#888',
});

const groupTitle = css({
  margin: '0',
  padding: '8px 10px 4px',
  fontSize: '12px',
  fontWeight: 'bold',
  lineHeight: '1.4',
  letterSpacing: '0.04em',
  color: '#1f1c1c',
});

const grid = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: '8px 12px',
  gap: '4px',
});

const cellButton = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0',
  border: 'none',
  borderRadius: '6px',
  background: 'transparent',
  cursor: 'pointer',
  boxSizing: 'border-box',
  transition: 'background 0.2s linear',
  // 方向键移动焦点时浏览器会自动滚动容器，留出吸顶导航的高度（同 NAV_HEIGHT）
  scrollMarginTop: '40px',
  _hover: { backgroundColor: '#369cf8' },
  _focusVisible: { outline: '2px solid #369cf8', outlineOffset: '-2px' },
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
  },
});

const cell = css({ display: 'flex' });

// 「最近使用」没有代表表情，用时钟图标；颜色与分节标题一致
const clockIcon = css({ width: '18px', height: '18px', color: '#888' });

// 经典表情是像素画，缩放时保持硬边缘；角色贴纸是插画，走正常插值
const pixelated = css({ '& img': { imageRendering: 'pixelated' } });

interface RenderGroup {
  readonly name?: string;
  readonly codes: readonly string[];
}

interface Section {
  readonly id: StickerNavId;
  readonly label: string;
  /** 导航图标用的表情代码；「最近使用」没有代表表情，改用时钟图标 */
  readonly iconCode: string | undefined;
  readonly large: boolean;
  readonly groups: readonly RenderGroup[];
}

function toSection(set: StickerSet): Section {
  return {
    id: set.id,
    label: set.label,
    iconCode: SET_NAV_ICON[set.id],
    large: set.large,
    groups: set.sections ?? [{ codes: set.codes }],
  };
}

type VerticalDirection = -1 | 1;

/** 按实际布局寻找正上方或正下方、水平距离最近的格子。 */
function findVerticalNeighbor(
  cells: readonly (HTMLButtonElement | null)[],
  currentIndex: number,
  direction: VerticalDirection,
): number | undefined {
  const current = cells[currentIndex];
  if (!current) {
    return undefined;
  }
  const currentRect = current.getBoundingClientRect();
  if (currentRect.width === 0 && currentRect.height === 0) {
    return undefined;
  }
  const currentX = currentRect.left + currentRect.width / 2;
  const currentY = currentRect.top + currentRect.height / 2;
  let bestIndex: number | undefined;
  let bestVerticalDistance = Number.POSITIVE_INFINITY;
  let bestHorizontalDistance = Number.POSITIVE_INFINITY;

  cells.forEach((candidate, index) => {
    if (!candidate || index === currentIndex) {
      return;
    }
    const rect = candidate.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      return;
    }
    const verticalDistance = (rect.top + rect.height / 2 - currentY) * direction;
    // 同一视觉行可能存在亚像素误差，不应被当成下一行。
    if (verticalDistance <= 1) {
      return;
    }
    const horizontalDistance = Math.abs(rect.left + rect.width / 2 - currentX);
    if (
      verticalDistance < bestVerticalDistance ||
      (verticalDistance === bestVerticalDistance && horizontalDistance < bestHorizontalDistance)
    ) {
      bestIndex = index;
      bestVerticalDistance = verticalDistance;
      bestHorizontalDistance = horizontalDistance;
    }
  });

  return bestIndex;
}

const StickerPicker = ({ onSelect, className }: StickerPickerProps) => {
  const { recent, push } = useRecentStickers();
  const [focusIndex, setFocusIndex] = useState(0);
  const [activeId, setActiveId] = useState<StickerNavId | undefined>(undefined);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const sectionRefs = useRef(new Map<StickerNavId, HTMLElement>());

  const sections = useMemo<Section[]>(() => {
    const list = STICKER_SETS.map(toSection);
    if (recent.length > 0) {
      list.unshift({
        id: RECENT_NAV_ID,
        label: RECENT_NAV_LABEL,
        iconCode: undefined,
        large: false,
        groups: [{ codes: recent }],
      });
    }
    return list;
  }, [recent]);

  /** 全部分节拉平后的顺序，方向键与 roving tabindex 都按这个序号走 */
  const flatCodes = useMemo(
    () => sections.flatMap((section) => section.groups.flatMap((group) => group.codes)),
    [sections],
  );

  /**
   * 「最近使用」会在头部插入或重排格子。DOM 焦点仍留在原按钮上，按当前 activeElement
   * 重新定位索引，避免 roving tabindex 与真实焦点错位。
   */
  useLayoutEffect(() => {
    cellRefs.current.length = flatCodes.length;
    const activeIndex = cellRefs.current.findIndex((cell) => cell === document.activeElement);
    setFocusIndex((current) => {
      if (activeIndex >= 0) {
        return activeIndex;
      }
      return Math.min(current, Math.max(0, flatCodes.length - 1));
    });
  }, [flatCodes]);

  const focusCell = useCallback((index: number): void => {
    setFocusIndex(index);
    cellRefs.current[index]?.focus();
  }, []);

  const handleSelect = useCallback(
    (code: string): void => {
      push(code);
      onSelect(code);
    },
    [push, onSelect],
  );

  /**
   * 跳到某个分类。
   *
   * 只能滚容器自己：`scrollIntoView` 会把所有可滚动祖先一起滚，
   * 面板嵌在长页面里时会把整页也带着跑。分节的 `offsetTop` 相对面板
   * （面板是 `position: relative`，即它们的 offsetParent），减去吸顶导航
   * 的高度，标题正好落在导航下沿。
   */
  const scrollToSection = useCallback((id: StickerNavId): void => {
    setActiveId(id);
    const scroller = scrollerRef.current;
    const section = sectionRefs.current.get(id);
    if (!scroller || !section) {
      return;
    }
    const top = Math.max(0, section.offsetTop - NAV_HEIGHT);
    // 类型上 scrollTo 必然存在，但 jsdom 没实现它，运行时判一下再退回直接赋值
    if (typeof scroller.scrollTo === 'function') {
      scroller.scrollTo({ top, behavior: 'smooth' });
    } else {
      scroller.scrollTop = top;
    }
  }, []);

  /** 滚动时高亮当前所在分类。旧站没有这个高亮，是本次补的 */
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }
    const handleScroll = (): void => {
      let current: StickerNavId | undefined;
      for (const [id, el] of sectionRefs.current) {
        if (el.offsetTop - scroller.scrollTop <= NAV_HEIGHT + 1) {
          current = id;
        }
      }
      setActiveId(current);
    };
    handleScroll();
    scroller.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      scroller.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  const handleGridKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      const last = flatCodes.length - 1;
      const eventIndex = cellRefs.current.indexOf(event.target as HTMLButtonElement);
      const currentIndex = eventIndex >= 0 ? eventIndex : focusIndex;
      let next: number | undefined;

      if (event.key === 'ArrowLeft') {
        next = currentIndex - 1;
      } else if (event.key === 'ArrowRight') {
        next = currentIndex + 1;
      } else if (event.key === 'ArrowUp') {
        next = findVerticalNeighbor(cellRefs.current, currentIndex, -1);
      } else if (event.key === 'ArrowDown') {
        next = findVerticalNeighbor(cellRefs.current, currentIndex, 1);
      } else if (event.key === 'Home') {
        next = 0;
      } else if (event.key === 'End') {
        next = last;
      } else {
        return;
      }

      event.preventDefault();
      if (next !== undefined && next >= 0 && next <= last) {
        focusCell(next);
      }
    },
    [flatCodes.length, focusIndex, focusCell],
  );

  let cursor = -1;

  return (
    <div className={cx('bgm-sticker-picker', pickerFrame, className)}>
      <div
        ref={scrollerRef}
        className={cx('bgm-sticker-picker__scroller', scroller)}
        onKeyDown={handleGridKeyDown}
      >
        <div className={nav} role='navigation' aria-label='表情分类'>
          {sections.map((section, index) => {
            const icon = section.iconCode === undefined ? undefined : getSticker(section.iconCode);
            return (
              <button
                key={section.id}
                type='button'
                title={section.label}
                aria-label={section.label}
                aria-current={section.id === activeId ? true : undefined}
                className={cx(
                  navButton,
                  index === 0 && navFirst,
                  index === sections.length - 1 && navLast,
                  section.id === activeId && navActive,
                  !section.large && pixelated,
                )}
                onClick={() => {
                  scrollToSection(section.id);
                }}
              >
                {icon ? (
                  <img src={icon.url} alt='' aria-hidden='true' width={24} height={24} />
                ) : (
                  <Clock className={clockIcon} aria-hidden='true' />
                )}
              </button>
            );
          })}
        </div>

        {sections.map((section) => {
          return (
            <section
              key={section.id}
              aria-label={section.label}
              ref={(el) => {
                if (el) {
                  sectionRefs.current.set(section.id, el);
                } else {
                  sectionRefs.current.delete(section.id);
                }
              }}
            >
              <h3 className={setTitle}>{section.label}</h3>
              {section.groups.map((group, groupIndex) => (
                <div key={group.name ?? groupIndex}>
                  {group.name ? <h4 className={groupTitle}>{group.name}</h4> : null}
                  <div role='grid' aria-label={group.name ?? section.label}>
                    <div role='row' className={grid}>
                      {group.codes.map((code) => {
                        cursor += 1;
                        const index = cursor;
                        const sticker = getSticker(code);
                        if (!sticker) {
                          return null;
                        }
                        const cellSize = sticker.large ? CHARACTER_CELL_SIZE : CLASSIC_CELL_SIZE;
                        return (
                          <StickerCell
                            key={code}
                            sticker={sticker}
                            size={cellSize}
                            focused={index === focusIndex}
                            onSelect={handleSelect}
                            registerRef={(el) => {
                              cellRefs.current[index] = el;
                            }}
                            onFocus={() => {
                              setFocusIndex(index);
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
};

interface StickerCellProps {
  sticker: Sticker;
  size: number;
  focused: boolean;
  onSelect: (code: string) => void;
  registerRef: (el: HTMLButtonElement | null) => void;
  onFocus: () => void;
}

const StickerCell = ({
  sticker,
  size,
  focused,
  onSelect,
  registerRef,
  onFocus,
}: StickerCellProps) => {
  const name = sticker.name ?? sticker.code;
  // 角色贴纸原图 240x240，按格子留白后的尺寸显示；经典表情用原始像素尺寸
  const imageWidth = sticker.large ? size - 8 : sticker.width;
  const imageHeight = sticker.large ? size - 8 : sticker.height;
  return (
    <span role='gridcell' className={cell}>
      <button
        type='button'
        data-sticker-cell=''
        ref={registerRef}
        className={cx(cellButton, !sticker.large && pixelated)}
        style={{ width: `${size}px`, height: `${size}px` }}
        tabIndex={focused ? 0 : -1}
        title={name}
        aria-label={name}
        onFocus={onFocus}
        onClick={() => {
          onSelect(sticker.code);
        }}
      >
        <img
          src={sticker.url}
          alt=''
          aria-hidden='true'
          // 显式宽高，懒加载才能正确预留空间
          width={imageWidth}
          height={imageHeight}
          // 部分高清表情的固有尺寸是目录尺寸的两倍，需要用 CSS 固定显示尺寸
          style={{ width: imageWidth, height: imageHeight }}
          // 全部分类同时在 DOM 里，靠原生懒加载只拉取视口附近的图
          loading='lazy'
          decoding='async'
        />
      </button>
    </span>
  );
};

export default StickerPicker;
