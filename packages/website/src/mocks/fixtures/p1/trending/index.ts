import type { ozaClient } from '@bangumi/client/index.ts';
import type { JsonFixture, SuccessfulData } from '@bangumi/website/mocks/utils.ts';

import trendingSubjectsJson from './subjects-GET.json';

export const trendingSubjectsFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getTrendingSubjects>
> = trendingSubjectsJson;
