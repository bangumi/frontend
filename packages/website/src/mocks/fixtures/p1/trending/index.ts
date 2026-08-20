import type { ozaClient } from '@bangumi/client';
import type { JsonFixture, SuccessfulData } from '@bangumi/website/mocks/utils';

import trendingSubjectsJson from './subjects-GET.json';

export const trendingSubjectsFixture: JsonFixture<
  SuccessfulData<typeof ozaClient.getTrendingSubjects>
> = trendingSubjectsJson;
