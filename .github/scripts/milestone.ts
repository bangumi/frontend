import * as fs from 'node:fs';
import * as path from 'node:path';

import * as core from '@actions/core';
import * as github from '@actions/github';
import type { components } from '@octokit/openapi-types';

type Milestone = components['schemas']['nullable-milestone'];

const packageJSON = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../package.json')).toString(),
) as { version: string };

const { version } = packageJSON;

const repo = {
  owner: 'bangumi',
  repo: 'frontend',
};

async function main() {
  const githubToken = process.env.GH_TOKEN;
  if (!githubToken) {
    throw new Error('process.env.GH_TOKEN is empty');
  }

  const octokit = github.getOctokit(githubToken);

  const milestones = await octokit.paginate('GET /repos/{owner}/{repo}/milestones', { ...repo });

  let oldNextMilestone: undefined | Milestone;

  for (const milestone of milestones) {
    if (milestone.title === 'next') {
      oldNextMilestone = milestone;
      break;
    }
  }

  if (!oldNextMilestone) {
    core.info('missing previous `next` milestone, skipping script');
    return;
  }

  const openIssues = await octokit.paginate('GET /repos/{owner}/{repo}/issues', {
    ...repo,
    state: 'open',
    // github api 问题，这里的 string 只接受 `*`，不能使用 title,
    // 只能使用 milestone 的 number，而且这里 API 的 types 不接受 number 类型。
    milestone: oldNextMilestone.number as unknown as string,
  });

  core.info(`close and rename old milestone ${oldNextMilestone.number}`);
  await octokit.request('PATCH /repos/{owner}/{repo}/milestones/{milestone_number}', {
    ...repo,
    milestone_number: oldNextMilestone.number,
    title: version,
    state: 'closed',
  });

  core.info(`create new next milestone`);
  const newNextMileStone = await octokit.request('POST /repos/{owner}/{repo}/milestones', {
    ...repo,
    title: 'next',
  });

  for (const issue of openIssues) {
    core.info(`moving issue ${issue.number} to new milestone ${newNextMileStone.data.number}`);
    await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
      ...repo,
      issue_number: issue.number,
      milestone: newNextMileStone.data.number,
    });
  }
}

main().catch((e) => {
  throw e;
});