import type { SubjectCollect, SubjectHomeResponse } from '@bangumi/client/client.ts';

import collectsData from './collects-GET.json';
import homeData from './home-GET.json';

/** tsc 类型验证：若 API 响应结构变更导致 fixture 与类型不一致，这里会报错 */
export const subjectHomeFixture: SubjectHomeResponse = homeData;

export const subjectCollectsFixture: { data: SubjectCollect[]; total: number } = collectsData;
