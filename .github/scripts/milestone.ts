import * as path from 'node:path';
import * as fs from 'node:fs';

import * as github from '@actions/github';

import type { components } from '@octokit/openapi-types';

type Milestone = components['schemas']['nullable-milestone'];

const packageJSON = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../package.json')).toString(),
);

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
    return;
  }

  const openIssues = await octokit.paginate('GET /repos/{owner}/{repo}/issues', {
    ...repo,
    state: 'open',
    milestone: oldNextMilestone.number,
  });

  await octokit.request('PATCH /repos/{owner}/{repo}/milestones/{milestone_number}', {
    ...repo,
    milestone_number: oldNextMilestone.number,
    title: version,
  });

  const newNextMileStone = await octokit.request('POST /repos/{owner}/{repo}/milestones', {
    ...repo,
    title: 'next-next',
  });

  for (const issue of openIssues) {
    await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
      ...repo,
      issue_number: issue.number,
      milestone: newNextMileStone.data.number,
    });
  }

  await octokit.request('PATCH /repos/{owner}/{repo}/milestones/{milestone_number}', {
    ...repo,
    milestone_number: oldNextMilestone.number,
    title: version,
    state: 'closed',
  });

  await octokit.request('PATCH /repos/{owner}/{repo}/milestones/{milestone_number}', {
    ...repo,
    milestone_number: newNextMileStone.data.number,
    title: 'next',
  });
}

main().catch((e) => {
  throw e;
});
