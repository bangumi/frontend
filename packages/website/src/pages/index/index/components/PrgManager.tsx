import { ok } from '@oazapfts/runtime';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { ozaClient } from '@bangumi/client';
import type { Episode, ProgressItem, UpdateSubjectProgress } from '@bangumi/client/client';
import { EpisodeCollectionStatus, EpisodeType, SubjectType } from '@bangumi/client/client';
import { Popover, toast, Typography } from '@bangumi/design';
import { GridView, ListView } from '@bangumi/icons';
import { getSubjectLink } from '@bangumi/utils/pages';
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

/** 非本篇章节类型的分组标题，对齐 PHP EpCore::getTypeInfoByType */
const EP_TYPE_LABELS: Partial<Record<EpisodeType, string>> = {
  [EpisodeType.Special]: 'SP',
  [EpisodeType.Op]: 'OP',
  [EpisodeType.Ed]: 'ED',
  [EpisodeType.Pre]: '剧场版',
  [EpisodeType.Mad]: 'MAD',
  [EpisodeType.Other]: '其他',
};

const STATUS_TEXT: Record<EpisodeCollectionStatus, string> = {
  [EpisodeCollectionStatus.None]: '没看过',
  [EpisodeCollectionStatus.Wish]: '想看',
  [EpisodeCollectionStatus.Done]: '看过',
  [EpisodeCollectionStatus.Dropped]: '抛弃',
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

function PrgRow({ item }: { item: ProgressItem }) {
  const { mutate } = useHomePage();
  const [epValue, setEpValue] = useState(String(item.interest.epStatus));
  const [volValue, setVolValue] = useState(String(item.interest.volStatus));
  const [submitting, setSubmitting] = useState(false);

  const { subject } = item;
  const isBook = subject.type === SubjectType.Book;
  const lastUnwatchedEp = item.lastUnwatchedEp;

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
    <li className={styles.row}>
      <Link
        to={getSubjectLink(subject.id)}
        className={styles.coverLink}
        title={subject.nameCN || subject.name}
      >
        <img src={subject.images?.large} className={styles.cover} loading='lazy' alt='' />
        {item.todayOnAir && <span className={styles.onAir}>放送中</span>}
      </Link>
      <div className={styles.info}>
        <div className={styles.header}>
          <Link
            to={getSubjectLink(subject.id)}
            className={styles.subjectName}
            title={subject.nameCN || subject.name}
          >
            {subject.nameCN || subject.name}
          </Link>
          <small className={styles.percentText}>
            [{item.interest.epStatus}/{totalText(subject.eps)}]
          </small>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progressInner} style={{ width: `${item.percent}%` }} />
        </div>

        <div className={styles.actions}>
          {!isBook && lastUnwatchedEp && (
            <button
              type='button'
              className={styles.checkInBtn}
              disabled={submitting}
              onClick={() => void handleCheckIn(lastUnwatchedEp.id)}
              title={`标记 ep.${lastUnwatchedEp.sort} 为看过`}
            >
              ep.{lastUnwatchedEp.sort} 看过
            </button>
          )}
          <form className={styles.batchForm} onSubmit={handleBatchUpdate}>
            {isBook ? (
              <>
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
              </>
            ) : (
              <label className={styles.batchLabel}>
                <input
                  className={styles.batchInput}
                  type='number'
                  min={0}
                  value={epValue}
                  onChange={(e) => setEpValue(e.target.value)}
                />
                / {totalText(subject.eps)}
              </label>
            )}
            <button type='submit' className={styles.updateBtn} disabled={submitting}>
              更新
            </button>
          </form>
        </div>
      </div>
    </li>
  );
}

/** 单集详情浮层，hover 集数按钮时显示，对齐 PHP 首页的 ep 信息浮层 */
function EpDetail({
  ep,
  submitting,
  onUpdate,
}: {
  ep: Episode;
  submitting: boolean;
  onUpdate: (type: EpisodeCollectionStatus) => void;
}) {
  const status = ep.collection?.status;
  return (
    <div className={styles.epDetail} data-ep-id={ep.id}>
      <div className={styles.epDetailHeader}>
        <span>
          ep.{ep.sort} {ep.name}
        </span>
      </div>
      <div className={styles.epActions}>
        <button
          type='button'
          className={styles.epActionBtn}
          disabled={submitting}
          onClick={() => onUpdate(EpisodeCollectionStatus.Wish)}
        >
          想看
        </button>
        <button
          type='button'
          className={styles.epActionBtn}
          disabled={submitting}
          onClick={() => onUpdate(EpisodeCollectionStatus.Dropped)}
        >
          抛弃
        </button>
        <button
          type='button'
          className={styles.epActionBtn}
          disabled={submitting}
          onClick={() => onUpdate(EpisodeCollectionStatus.None)}
        >
          撤消
        </button>
        <button
          type='button'
          className={styles.epWatchedBtn}
          disabled={submitting}
          onClick={() => onUpdate(EpisodeCollectionStatus.Done)}
        >
          看过
        </button>
      </div>
      {ep.nameCN && (
        <p className={styles.epInfoLine}>
          <span>中文标题</span>
          {ep.nameCN}
        </p>
      )}
      <p className={styles.epInfoLine}>
        <span>首播</span>
        {ep.airdate || '-'}
      </p>
      <p className={styles.epInfoLine}>
        <span>时长</span>
        {ep.duration || '-'}
      </p>
      {ep.comment > 0 && (
        <p className={styles.epInfoLine}>
          <span>讨论</span>+{ep.comment}
        </p>
      )}
      {status !== undefined && ep.collection?.updatedAt && (
        <p className={styles.epInfoLine}>
          <span>记录</span>
          {STATUS_TEXT[status]}: {dayjs.unix(ep.collection.updatedAt).format('YYYY-M-D HH:mm')}
        </p>
      )}
    </div>
  );
}

function EpButton({
  ep,
  submitting,
  onUpdate,
}: {
  ep: Episode;
  submitting: boolean;
  onUpdate: (type: EpisodeCollectionStatus) => void;
}) {
  const watched = ep.collection?.status === EpisodeCollectionStatus.Done;
  return (
    <Popover
      className={styles.epPopover}
      content={<EpDetail ep={ep} submitting={submitting} onUpdate={onUpdate} />}
    >
      <button
        type='button'
        className={watched ? styles.epBtnWatched : styles.epBtn}
        title={`ep.${ep.sort} ${ep.name}`}
        aria-pressed={watched}
      >
        {String(ep.sort).padStart(2, '0')}
      </button>
    </Popover>
  );
}

/** 网格视图卡片：封面 + 标题 + 进度 + 逐集按钮，对齐 PHP home_prg_item_eps */
function PrgCard({ item }: { item: ProgressItem }) {
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

  const handleEpStatus = async (ep: Episode, type: EpisodeCollectionStatus) => {
    setSubmitting(true);
    try {
      await ok(ozaClient.updateEpisodeProgress(ep.id, { type }));
      await mutate();
    } catch (error) {
      toast(getErrorMessage(error), { type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <li className={styles.card}>
      <Link
        to={getSubjectLink(subject.id)}
        className={styles.cardCoverLink}
        title={subject.nameCN || subject.name}
      >
        <img src={subject.images?.large} className={styles.cardCover} loading='lazy' alt='' />
        {item.todayOnAir && <span className={styles.onAir}>放送中</span>}
      </Link>
      <div className={styles.cardInfo}>
        <div className={styles.cardHeader}>
          <Link
            to={getSubjectLink(subject.id)}
            className={styles.cardName}
            title={subject.nameCN || subject.name}
          >
            {subject.nameCN || subject.name}
          </Link>
          <small className={styles.percentText}>
            [{item.interest.epStatus}/{totalText(subject.eps)}]
          </small>
        </div>
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
                  <EpButton
                    key={ep.id}
                    ep={ep}
                    submitting={submitting}
                    onUpdate={(epType) => void handleEpStatus(ep, epType)}
                  />
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

/**
 * 进度管理器，对齐 PHP home_prg：分类 tab + 列表/网格视图切换
 * 列表视图为行内快捷看过 + 批量更新；网格视图展示逐集按钮，hover 单集可查看详情与操作
 */
const PrgManager: React.FC<{ progress: ProgressItem[] }> = ({ progress }) => {
  const [activeType, setActiveType] = useState(0);
  const [view, setView] = useState<ViewMode>('list');

  const filtered =
    activeType === 0 ? progress : progress.filter((item) => item.subject.type === activeType);

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
            onClick={() => setView('list')}
            title='列表视图'
            aria-label='列表视图'
          >
            <ListView />
          </button>
          <button
            type='button'
            className={`${styles.viewBtn} ${view === 'grid' ? styles.viewActive : ''}`}
            onClick={() => setView('grid')}
            title='网格视图'
            aria-label='网格视图'
          >
            <GridView />
          </button>
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className={styles.empty}>还没有在看的番组，去搜索看看？</p>
      ) : view === 'list' ? (
        <ul className={styles.list}>
          {filtered.map((item) => (
            <PrgRow key={item.subject.id} item={item} />
          ))}
        </ul>
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
