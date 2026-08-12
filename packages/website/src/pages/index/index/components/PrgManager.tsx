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
import { getSubjectLink, getSubjectWikiEditLink } from '@bangumi/utils/pages';
import EpisodeButton from '@bangumi/website/components/EpisodeButton';
import { useHomePage } from '@bangumi/website/hooks/use-home-page';

import styles from './PrgManager.module.less';

const { Link } = Typography;

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
    <li className={styles.navItem}>
      <button
        type='button'
        className={`${styles.navButton} ${active ? styles.navButtonActive : ''}`}
        onClick={onSelect}
      >
        <img src={subject.images?.small} className={styles.navCover} loading='lazy' alt='' />
        <span className={styles.navInfo}>
          <span className={styles.navHeader}>
            <span className={styles.navName}>{subject.nameCN || subject.name}</span>
            <small className={styles.navProgressText}>
              [{item.interest.epStatus}/{totalText(subject.eps)}]
            </small>
          </span>
          <span className={styles.navProgressBar}>
            <span className={styles.navProgressInner} style={{ width: `${item.percent}%` }} />
          </span>
        </span>
      </button>
    </li>
  );
}

/** 网格视图卡片：封面 + 标题 + 进度 + 逐集按钮，对齐 PHP home_prg_item_eps */
function PrgCard({ item, detailed = false }: { item: ProgressItem; detailed?: boolean }) {
  const { mutate } = useHomePage();
  const [epValue, setEpValue] = useState(String(item.interest.epStatus));
  const [volValue, setVolValue] = useState(String(item.interest.volStatus));
  const [submitting, setSubmitting] = useState(false);

  const { subject } = item;
  const isBook = subject.type === SubjectType.Book;

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
    <li className={styles.card}>
      <Link to={getSubjectLink(subject.id)} className={styles.cardCoverLink} title={subject.name}>
        <img
          src={detailed ? subject.images?.large : subject.images?.grid}
          className={styles.cardCover}
          loading='lazy'
          alt=''
        />
        {item.todayOnAir && <span className={styles.onAir}>放送中</span>}
      </Link>
      <div className={styles.cardInfo}>
        <div className={styles.cardHeader}>
          <Link to={getSubjectLink(subject.id)} className={styles.cardName} title={subject.name}>
            {subject.name}
          </Link>
          <small className={styles.percentText}>
            [{item.interest.epStatus}/{totalText(subject.eps)}]
          </small>
          {!detailed && (
            <Link to={getSubjectWikiEditLink(subject.id)} className={styles.editLink}>
              edit
            </Link>
          )}
        </div>
        {!isBook && detailed && (
          <>
            <p className={styles.watchingCount}>{subject.doing} 人在看</p>
            <form className={styles.detailProgressRow} onSubmit={handleBatchUpdate}>
              <span className={styles.detailProgressBar}>
                <span
                  className={styles.detailProgressInner}
                  style={{ width: `${item.percent}%` }}
                />
              </span>
              <input
                className={styles.detailProgressInput}
                type='number'
                min={0}
                value={epValue}
                aria-label='章节进度'
                onChange={(event) => setEpValue(event.target.value)}
              />
              <span>/ {totalText(subject.eps)}</span>
              <button type='submit' className={styles.visuallyHidden} disabled={submitting}>
                更新
              </button>
              {item.lastUnwatchedEp && (
                <button
                  type='button'
                  className={styles.detailCheckInBtn}
                  disabled={submitting}
                  onClick={() => void handleCheckIn(item.lastUnwatchedEp!.id)}
                >
                  ep.{item.lastUnwatchedEp.sort} 看过
                </button>
              )}
            </form>
            <div className={styles.subjectActions}>
              <Link to={`${getSubjectLink(subject.id)}/comments`}>参与讨论</Link>
              <Link to={`${getSubjectLink(subject.id)}/comments`}>观吐槽</Link>
              <Link to={`${getSubjectLink(subject.id)}/reviews`}>写长评</Link>
            </div>
          </>
        )}
        {isBook ? (
          <form className={styles.batchForm} onSubmit={handleBatchUpdate}>
            <label className={styles.batchLabel}>
              Chap.
              <input
                className={styles.batchInput}
                type='number'
                min={0}
                value={epValue}
                onChange={(e) => setEpValue(e.target.value)}
              />
              / {totalText(subject.eps)}
            </label>
            {subject.series && (
              <label className={styles.batchLabel}>
                Vol.
                <input
                  className={styles.batchInput}
                  type='number'
                  min={0}
                  value={volValue}
                  onChange={(e) => setVolValue(e.target.value)}
                />
                / {totalText(subject.volumes)}
              </label>
            )}
            <button type='submit' className={styles.updateBtn} disabled={submitting}>
              更新
            </button>
          </form>
        ) : (
          <ul className={styles.epList}>
            {groupEps(item.eps).map(([type, eps]) => (
              <li key={type} className={styles.epGroup}>
                {EP_TYPE_LABELS[type] && (
                  <span className={styles.epSubtitle}>{EP_TYPE_LABELS[type]}</span>
                )}
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
        <div className={styles.allEpisodes}>
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
    <section className={styles.block}>
      <div className={styles.tabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.type}
            type='button'
            className={`${styles.tab} ${activeType === cat.type ? styles.tabActive : ''}`}
            onClick={() => setActiveType(cat.type)}
          >
            {cat.label}
          </button>
        ))}
        <div className={styles.viewSwitch}>
          <button
            type='button'
            className={`${styles.viewBtn} ${view === 'list' ? styles.viewActive : ''}`}
            onClick={() => switchView('list')}
            title='列表视图'
            aria-label='列表视图'
            aria-pressed={view === 'list'}
          >
            <ListView />
          </button>
          <button
            type='button'
            className={`${styles.viewBtn} ${view === 'grid' ? styles.viewActive : ''}`}
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
        <p className={styles.empty}>还没有在看的番组，去搜索看看？</p>
      ) : view === 'list' ? (
        <div className={styles.splitView}>
          <ul className={styles.subjectList}>
            {filtered.map((item) => (
              <PrgNavItem
                key={item.subject.id}
                item={item}
                active={selected?.subject.id === item.subject.id}
                onSelect={() => setSelectedSubjectId(item.subject.id)}
              />
            ))}
          </ul>
          <ul className={styles.subjectDetail}>
            {selected && <PrgCard key={selected.subject.id} item={selected} detailed />}
          </ul>
        </div>
      ) : (
        <ul className={styles.gridList}>
          {filtered.map((item) => (
            <PrgCard key={item.subject.id} item={item} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default PrgManager;
