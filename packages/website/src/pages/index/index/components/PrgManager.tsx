import { ok } from '@oazapfts/runtime';
import React, { useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type {
  Episode,
  ProgressItem,
  UpdateEpisodeProgress,
  UpdateSubjectProgress,
} from '@bangumi/client/client';
import { EpisodeCollectionStatus, EpisodeType, SubjectType } from '@bangumi/client/client';
import { toast, Typography } from '@bangumi/design';
import { GridView, ListView } from '@bangumi/icons';
import { css, cx } from '@bangumi/styled-system/css';
import { getSubjectLink, getSubjectWikiEditLink } from '@bangumi/utils/pages';
import EpisodeButton from '@bangumi/website/components/EpisodeButton';
import { useHomePage } from '@bangumi/website/hooks/use-home-page';

const block = css({
  background: '#fff',
  border: '1px solid #e8e3e3',
  borderRadius: '14px',
  margin: '0 0 20px',
  overflow: 'visible',
  boxShadow: '0 0 3px rgba(0, 0, 0, 0.1)',
});

const tabs = css({
  display: 'flex',
  alignItems: 'center',
  minHeight: '42px',
  padding: '0 8px',
  borderBottom: '1px solid #e8e3e3',
  '@media (max-width: 640px)': {
    overflowX: 'auto',
  },
});

const tab = css({
  minWidth: '62px',
  padding: '7px 14px',
  border: 'none',
  borderRadius: '18px',
  background: 'none',
  cursor: 'pointer',
  fontSize: '15px',
  color: '#9f9b9b',
  _hover: { color: '#1f1c1c' },
  '@media (max-width: 640px)': {
    minWidth: 'auto',
    paddingRight: '12px',
    paddingLeft: '12px',
  },
});

const tabActive = css({
  color: '#fff',
  background: '#f09199',
});

const viewSwitch = css({
  display: 'flex',
  alignSelf: 'stretch',
  gap: '10px',
  marginLeft: 'auto',
  paddingRight: '4px',
});

const viewBtn = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '100%',
  padding: '0',
  border: '0',
  borderBottom: '2px solid transparent',
  borderRadius: '0',
  background: 'none',
  color: '#9f9b9b',
  _hover: { color: '#1f1c1c' },
});

const viewActive = css({
  color: '#f09199',
  borderBottomColor: '#f09199',
});

const empty = css({
  margin: '0',
  padding: '16px 10px',
  color: '#9f9b9b',
  fontSize: '13px',
});

const splitView = css({
  display: 'grid',
  gridTemplateColumns: '225px minmax(0, 1fr)',
  height: '280px',
  minHeight: '0',
  '@media (max-width: 640px)': {
    gridTemplateColumns: '1fr',
    gridTemplateRows: '160px auto',
    height: 'auto',
  },
});

const subjectList = css({
  minHeight: '0',
  margin: '0',
  padding: '0',
  overflowY: 'auto',
  listStyle: 'none',
  borderRight: '1px solid #e8e3e3',
  background: '#fff',
  '@media (max-width: 640px)': {
    borderRight: 'none',
    borderBottom: '1px solid #e8e3e3',
  },
});

const navItem = css({
  borderBottom: '1px solid #e8e3e3',
});

const navButton = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  width: '100%',
  height: '36px',
  padding: '3px 8px',
  border: '0',
  background: '#fff',
  color: '#1f1c1c',
  textAlign: 'left',
  _hover: { background: '#fafafa' },
  '@media (max-width: 640px)': {
    height: '44px',
    padding: '4px 6px',
  },
});

const navButtonActive = css({
  background: '#f8f8f8',
});

const navCover = css({
  flex: 'none',
  width: '30px',
  height: '30px',
  objectFit: 'cover',
  borderRadius: '4px',
  background: '#e8e3e3',
  '@media (max-width: 640px)': {
    width: '30px',
    height: '42px',
  },
});

const navInfo = css({
  display: 'block',
  minWidth: '0',
  flex: '1',
});

const navHeader = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '4px',
  minWidth: '0',
});

const navName = css({
  minWidth: '0',
  overflow: 'hidden',
  fontSize: '14px',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const navProgressText = css({
  flex: 'none',
  color: '#2878e8',
  fontSize: '12px',
  '@media (max-width: 640px)': {
    display: 'none',
  },
});

const navProgressBar = css({
  display: 'block',
  width: '86px',
  height: '4px',
  marginTop: '5px',
  overflow: 'hidden',
  borderRadius: '2px',
  background: '#e3e7f5',
  '@media (max-width: 640px)': {
    display: 'none',
  },
});

const navProgressInner = css({
  display: 'block',
  height: '100%',
  borderRadius: 'inherit',
  background: '#b9c7e9',
});

const subjectDetail = css({
  minWidth: '0',
  margin: '0',
  padding: '0',
  overflowX: 'hidden',
  overflowY: 'auto',
  listStyle: 'none',
});

const { Link } = Typography;

const card = css({
  position: 'relative',
  display: 'flex',
  gap: '10px',
  padding: '10px',
  background: '#fff',
});

// 原 .subjectDetail .card 嵌套规则
const cardDetailed = css({
  minHeight: '100%',
  boxSizing: 'border-box',
  '@media (max-width: 640px)': {
    padding: '8px',
  },
});

// 原 .gridList .card 嵌套规则
const gridCard = css({
  gap: '14px',
  minHeight: '98px',
  minWidth: '0',
  padding: '14px 12px',
  boxSizing: 'border-box',
  border: '0',
});

const allEpisodes = css({
  position: 'absolute',
  right: '10px',
  bottom: '7px',
  paddingLeft: '8px',
  background: '#fff',
  fontSize: '14px',
});

const cardCoverLink = css({
  flex: 'none',
  position: 'relative',
  display: 'block',
});

// 原 @media 中 .subjectDetail .cardCoverLink 规则
const cardCoverLinkDetailed = css({
  '@media (max-width: 640px)': {
    display: 'none',
  },
});

const cardCover = css({
  display: 'block',
  objectFit: 'cover',
  borderRadius: '2px',
  background: '#e8e3e3',
});

const cardListCover = css({
  width: '64px',
  height: '90px',
});

const cardDetailedCover = css({
  width: '64px',
  height: '64px',
});

const gridCardCover = css({
  width: '58px',
  height: '58px',
  borderRadius: '9px',
});

const onAir = css({
  position: 'absolute',
  top: '0',
  left: '0',
  background: '#f09199',
  color: '#fff',
  fontSize: '10px',
  padding: '1px 4px',
  borderRadius: '0 0 2px',
});

const cardInfo = css({
  flex: '1',
  minWidth: '0',
});

// 原 .gridList .cardInfo 嵌套规则
const gridCardInfo = css({
  paddingTop: '2px',
});

const cardHeader = css({
  display: 'flex',
  alignItems: 'baseline',
  gap: '6px',
  marginBottom: '6px',
});

// 原 .gridList .cardHeader 嵌套规则
const gridCardHeader = css({
  gap: '4px',
  marginBottom: '6px',
});

const cardName = css({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

// 原 .subjectDetail .cardName 嵌套规则
const cardDetailedName = css({
  color: '#1f1c1c',
  fontSize: '16px',
  fontWeight: '600',
});

// 原 .gridList .cardName 嵌套规则
const gridCardName = css({
  color: '#1f1c1c',
  fontSize: '16px',
});

const percentText = css({
  flex: 'none',
  color: '#9f9b9b',
  fontSize: '12px',
});

// 原 .gridList .percentText 嵌套规则
const gridPercentText = css({
  color: '#087af5',
  fontSize: '15px',
});

const editLink = css({ flex: 'none' });

// 原 .gridList .editLink 嵌套规则
const gridEditLink = css({
  color: '#087af5',
  fontSize: '15px',
});

const watchingCount = css({
  margin: '0 0 6px',
  color: '#9f9b9b',
  fontSize: '13px',
});

const detailProgressRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  minWidth: '0',
  color: '#9f9b9b',
  fontSize: '13px',
});

// 替代 :not(.detailProgressBar) 规则
const progressTotal = css({
  whiteSpace: 'nowrap',
  flex: 'none',
});

const detailProgressInput = css({
  width: '42px',
  boxSizing: 'border-box',
  padding: '3px 5px',
  border: '1px solid #e8e3e3',
  borderRadius: '5px',
  color: '#1f1c1c',
  fontSize: '14px',
});

const visuallyHidden = css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: '0',
  overflow: 'hidden',
  clipPath: 'inset(50%)',
  border: '0',
  whiteSpace: 'nowrap',
});

const detailProgressBar = css({
  position: 'relative',
  display: 'block',
  width: '82px',
  height: '22px',
  overflow: 'hidden',
  border: '1px solid #e8e3e3',
  borderRadius: '6px',
  background: '#fff',
  '@media (max-width: 640px)': {
    width: '52px',
  },
});

const detailProgressInner = css({
  display: 'block',
  height: '100%',
  background: 'linear-gradient(#59d5f2, #00adea)',
});

const detailCheckInBtn = css({
  marginLeft: 'auto',
  padding: '5px 9px',
  border: '1px solid #e8e3e3',
  borderRadius: '8px',
  color: '#54b5df',
  fontSize: '13px',
  whiteSpace: 'nowrap',
  _hover: {
    borderColor: '#54b5df',
  },
  '@media (max-width: 640px)': {
    padding: '4px',
    fontSize: '12px',
  },
});

const subjectActions = css({
  display: 'flex',
  gap: '10px',
  marginTop: '5px',
  fontSize: '13px',
  '@media (max-width: 640px)': {
    flexWrap: 'wrap',
  },
});

const batchForm = css({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  fontSize: '12px',
  color: '#9f9b9b',
  flexWrap: 'wrap',
});

const batchLabel = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

const batchInput = css({
  width: '48px',
  padding: '2px 4px',
  border: '1px solid #e8e3e3',
  borderRadius: '2px',
  fontSize: '12px',
});

const updateBtn = css({
  border: '1px solid #54b5df',
  color: '#54b5df',
  background: '#fff',
  borderRadius: '2px',
  padding: '2px 8px',
  fontSize: '12px',
  cursor: 'pointer',
  _hover: {
    background: '#54b5df',
    color: '#fff',
  },
  _disabled: {
    borderColor: '#e8e3e3',
    color: '#9f9b9b',
    cursor: 'default',
    background: '#fff',
  },
});

const gridList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gridAutoRows: 'minmax(98px, auto)',
  background: '#fff',
  '@media (max-width: 640px)': {
    gridTemplateColumns: 'minmax(0, 1fr)',
  },
});

const epList = css({
  listStyle: 'none',
  margin: '0',
  padding: '0',
});

// 原 .subjectDetail .epList 嵌套规则
const epListDetailed = css({
  marginTop: '10px',
  padding: '8px 0 28px',
  borderTop: '1px solid #e8e3e3',
});

const epGroup = css({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '3px',
});

// 原 .gridList .epGroup 嵌套规则
const gridEpGroup = css({
  gap: '3px',
});

const epSubtitle = css({
  fontSize: '11px',
  color: '#9f9b9b',
  marginRight: '2px',
});

const CATEGORIES = [
  { type: 0, label: '全部' },
  { type: SubjectType.Anime, label: '动画' },
  { type: SubjectType.Real, label: '三次元' },
  { type: SubjectType.Book, label: '书籍' },
];

type ViewMode = 'list' | 'grid';

const VIEW_STORAGE_KEY = 'bangumi-home-progress-view';

function getViewStorage(): Storage | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return window.localStorage ?? null;
  } catch {
    return null;
  }
}

function getInitialView(): ViewMode {
  return getViewStorage()?.getItem(VIEW_STORAGE_KEY) === 'grid' ? 'grid' : 'list';
}

/** 非本篇章节类型的分组标题，对齐 PHP EpCore::getTypeInfoByType */
const EP_TYPE_LABELS: Partial<Record<EpisodeType, string>> = {
  [EpisodeType.Special]: 'SP',
  [EpisodeType.Op]: 'OP',
  [EpisodeType.Ed]: 'ED',
  [EpisodeType.Pre]: '剧场版',
  [EpisodeType.Mad]: 'MAD',
  [EpisodeType.Other]: '其他',
};

function totalText(total: number): string {
  return total === 0 ? '??' : String(total);
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return '操作失败，请稍后再试';
}

/** 按章节类型分组，组内按 sort 排序，对齐 PHP SubjectCore::groupSubjectEps */
function groupEps(eps: Episode[]): [EpisodeType, Episode[]][] {
  const grouped = new Map<EpisodeType, Episode[]>();
  for (const ep of eps) {
    const list = grouped.get(ep.type) ?? [];
    list.push(ep);
    grouped.set(ep.type, list);
  }
  return [...grouped.entries()].map(([type, list]) => [
    type,
    [...list].sort((a, b) => a.sort - b.sort),
  ]);
}

function PrgNavItem({
  item,
  active,
  onSelect,
}: {
  item: ProgressItem;
  active: boolean;
  onSelect: () => void;
}) {
  const { subject } = item;

  return (
    <li className={navItem}>
      <button type='button' className={cx(navButton, active && navButtonActive)} onClick={onSelect}>
        <img src={subject.images?.small} className={navCover} loading='lazy' alt='' />
        <span className={navInfo}>
          <span className={navHeader}>
            <span className={navName}>{subject.nameCN || subject.name}</span>
            <small className={navProgressText}>
              [{item.interest.epStatus}/{totalText(subject.eps)}]
            </small>
          </span>
          <span className={navProgressBar}>
            <span className={navProgressInner} style={{ width: `${item.percent}%` }} />
          </span>
        </span>
      </button>
    </li>
  );
}

/** 网格视图卡片：封面 + 标题 + 进度 + 逐集按钮，对齐 PHP home_prg_item_eps */
function PrgCard({
  item,
  detailed = false,
  grid = false,
}: {
  item: ProgressItem;
  detailed?: boolean;
  grid?: boolean;
}) {
  const { mutate } = useHomePage();
  const [epValue, setEpValue] = useState(String(item.interest.epStatus));
  const [volValue, setVolValue] = useState(String(item.interest.volStatus));
  const [submitting, setSubmitting] = useState(false);

  const { subject } = item;
  const isBook = subject.type === SubjectType.Book;
  const coverSize = detailed ? cardDetailedCover : grid ? gridCardCover : cardListCover;

  const submit = async (body: UpdateSubjectProgress) => {
    setSubmitting(true);
    try {
      await ok(ozaClient.updateSubjectProgress(subject.id, body));
      await mutate();
    } catch (error) {
      toast(getErrorMessage(error), { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBatchUpdate = (event: React.FormEvent) => {
    event.preventDefault();
    const ep = Number(epValue);
    if (Number.isNaN(ep) || ep < 0) {
      toast('请输入有效的章节进度', { type: 'error' });
      return;
    }
    const body: UpdateSubjectProgress = { epStatus: ep };
    if (isBook && subject.series) {
      const vol = Number(volValue);
      if (Number.isNaN(vol) || vol < 0) {
        toast('请输入有效的卷数进度', { type: 'error' });
        return;
      }
      body.volStatus = vol;
    }
    void submit(body);
  };

  const handleEpStatus = async (ep: Episode, body: UpdateEpisodeProgress) => {
    setSubmitting(true);
    try {
      await ok(ozaClient.updateEpisodeProgress(ep.id, body));
      await mutate();
    } catch (error) {
      toast(getErrorMessage(error), { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckIn = async (epId: number) => {
    setSubmitting(true);
    try {
      await ok(ozaClient.updateEpisodeProgress(epId, { type: EpisodeCollectionStatus.Done }));
      await mutate();
    } catch (error) {
      toast(getErrorMessage(error), { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <li className={cx(card, detailed && cardDetailed, grid && gridCard)}>
      <Link
        to={getSubjectLink(subject.id)}
        className={cx(cardCoverLink, detailed && cardCoverLinkDetailed)}
        title={subject.name}
      >
        <img
          src={detailed ? subject.images?.large : subject.images?.grid}
          className={cx(cardCover, coverSize)}
          loading='lazy'
          alt=''
        />
        {item.todayOnAir && <span className={onAir}>放送中</span>}
      </Link>
      <div className={cardInfo}>
        <div className={cx(cardHeader, grid && gridCardHeader)}>
          <Link
            to={getSubjectLink(subject.id)}
            className={cx(cardName, detailed && cardDetailedName, grid && gridCardName)}
            title={subject.name}
          >
            {subject.name}
          </Link>
          <small className={cx(percentText, grid && gridPercentText)}>
            [{item.interest.epStatus}/{totalText(subject.eps)}]
          </small>
          {!detailed && (
            <Link
              to={getSubjectWikiEditLink(subject.id)}
              className={cx(editLink, grid && gridEditLink)}
            >
              edit
            </Link>
          )}
        </div>
        {!isBook && detailed && (
          <>
            <p className={watchingCount}>{subject.doing} 人在看</p>
            <form className={detailProgressRow} onSubmit={handleBatchUpdate}>
              <span className={detailProgressBar}>
                <span className={detailProgressInner} style={{ width: `${item.percent}%` }} />
              </span>
              <input
                className={detailProgressInput}
                type='number'
                min={0}
                value={epValue}
                aria-label='章节进度'
                onChange={(event) => setEpValue(event.target.value)}
              />
              <span className={progressTotal}>/ {totalText(subject.eps)}</span>
              <button type='submit' className={visuallyHidden} disabled={submitting}>
                更新
              </button>
              {item.lastUnwatchedEp && (
                <button
                  type='button'
                  className={detailCheckInBtn}
                  disabled={submitting}
                  onClick={() => void handleCheckIn(item.lastUnwatchedEp!.id)}
                >
                  ep.{item.lastUnwatchedEp.sort} 看过
                </button>
              )}
            </form>
            <div className={subjectActions}>
              <Link to={`${getSubjectLink(subject.id)}/comments`}>参与讨论</Link>
              <Link to={`${getSubjectLink(subject.id)}/comments`}>观吐槽</Link>
              <Link to={`${getSubjectLink(subject.id)}/reviews`}>写长评</Link>
            </div>
          </>
        )}
        {isBook ? (
          <form className={batchForm} onSubmit={handleBatchUpdate}>
            <label className={batchLabel}>
              Chap.
              <input
                className={batchInput}
                type='number'
                min={0}
                value={epValue}
                onChange={(e) => setEpValue(e.target.value)}
              />
              / {totalText(subject.eps)}
            </label>
            {subject.series && (
              <label className={batchLabel}>
                Vol.
                <input
                  className={batchInput}
                  type='number'
                  min={0}
                  value={volValue}
                  onChange={(e) => setVolValue(e.target.value)}
                />
                / {totalText(subject.volumes)}
              </label>
            )}
            <button type='submit' className={updateBtn} disabled={submitting}>
              更新
            </button>
          </form>
        ) : (
          <ul className={cx(epList, detailed && epListDetailed)}>
            {groupEps(item.eps).map(([type, eps]) => (
              <li key={type} className={cx(epGroup, grid && gridEpGroup)}>
                {EP_TYPE_LABELS[type] && <span className={epSubtitle}>{EP_TYPE_LABELS[type]}</span>}
                {eps.map((ep) => (
                  <EpisodeButton
                    key={ep.id}
                    episode={ep}
                    submitting={submitting}
                    onUpdate={(body) => void handleEpStatus(ep, body)}
                  />
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
      {detailed && (
        <div className={allEpisodes}>
          <Link to={`${getSubjectLink(subject.id)}/ep`}>全部章节 »</Link>
        </div>
      )}
    </li>
  );
}

/**
 * 进度管理器，对齐 PHP home_prg：分类 tab + 列表/网格视图切换
 * 列表视图为左侧条目导航 + 右侧详情；网格视图展示全部条目及逐集操作
 */
const PrgManager: React.FC<{ progress: ProgressItem[] }> = ({ progress }) => {
  const [activeType, setActiveType] = useState(0);
  const [view, setView] = useState<ViewMode>(getInitialView);
  const [selectedSubjectId, setSelectedSubjectId] = useState(progress[0]?.subject.id);

  const filtered = progress.filter((item) =>
    activeType === 0 ? item.subject.type !== SubjectType.Book : item.subject.type === activeType,
  );
  const selected =
    filtered.find((item) => item.subject.id === selectedSubjectId) ?? filtered[0] ?? null;

  const switchView = (nextView: ViewMode) => {
    setView(nextView);
    try {
      getViewStorage()?.setItem(VIEW_STORAGE_KEY, nextView);
    } catch {
      // 浏览器禁用持久化时仍允许切换当前页面的视图。
    }
  };

  return (
    <section className={block}>
      <div className={tabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.type}
            type='button'
            className={`${tab} ${activeType === cat.type ? tabActive : ''}`}
            onClick={() => setActiveType(cat.type)}
          >
            {cat.label}
          </button>
        ))}
        <div className={viewSwitch}>
          <button
            type='button'
            className={`${viewBtn} ${view === 'list' ? viewActive : ''}`}
            onClick={() => switchView('list')}
            title='列表视图'
            aria-label='列表视图'
            aria-pressed={view === 'list'}
          >
            <ListView />
          </button>
          <button
            type='button'
            className={`${viewBtn} ${view === 'grid' ? viewActive : ''}`}
            onClick={() => switchView('grid')}
            title='网格视图'
            aria-label='网格视图'
            aria-pressed={view === 'grid'}
          >
            <GridView />
          </button>
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className={empty}>还没有在看的番组，去搜索看看？</p>
      ) : view === 'list' ? (
        <div className={splitView}>
          <ul className={subjectList}>
            {filtered.map((item) => (
              <PrgNavItem
                key={item.subject.id}
                item={item}
                active={selected?.subject.id === item.subject.id}
                onSelect={() => setSelectedSubjectId(item.subject.id)}
              />
            ))}
          </ul>
          <ul className={subjectDetail}>
            {selected && <PrgCard key={selected.subject.id} item={selected} detailed />}
          </ul>
        </div>
      ) : (
        <ul className={gridList}>
          {filtered.map((item) => (
            <PrgCard key={item.subject.id} item={item} grid />
          ))}
        </ul>
      )}
    </section>
  );
};

export default PrgManager;
