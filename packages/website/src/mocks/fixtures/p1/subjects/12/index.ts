import type { SubjectCollect } from '@bangumi/client/client';

import data from './collects-GET.json';

/** tsc 类型验证：若 API 响应结构变更导致 fixture 与类型不一致，这里会报错 */
export const subjectCollectsFixture: { data: SubjectCollect[]; total: number } = data;
