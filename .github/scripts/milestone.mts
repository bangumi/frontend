import * as core from '@actions/core';
import * as github from '@actions/github';
import type { components } from '@octokit/openapi-types';

import packageJSON from '../../package.json';

type Milestone = components['schemas']['nullable-milestone'];

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
    milestone: oldNextMilestone.number.toString(),
  });

  core.info(`close and rename old milestone ${oldNextMilestone.number}`);
  await octokit.request('PATCH /repos/{owner}/{repo}/milestones/{milestone_number}', {
    ...repo,
    milestone_number: oldNextMilestone.number,
    title: version,
    state: 'closed',
    description:
      '# script is still moving issues, DO NOT EDIT IT NOW\n' +
      (oldNextMilestone.description ?? ''),
  });

  core.info(`create new next milestone`);
  const newNextMileStone = await octokit.request('POST /repos/{owner}/{repo}/milestones', {
    ...repo,
    title: 'next',
    description: '# script is still moving issues, DO NOT EDIT IT NOW',
  });

  for (const issue of openIssues) {
    core.info(`moving issue ${issue.number} to new milestone ${newNextMileStone.data.number}`);
    await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', {
      ...repo,
      issue_number: issue.number,
      milestone: newNextMileStone.data.number,
    });
  }

  core.info(`restore issue description`);
  await octokit.request('PATCH /repos/{owner}/{repo}/milestones/{milestone_number}', {
    ...repo,
    milestone_number: oldNextMilestone.number,
    description: oldNextMilestone.description?.replaceAll('milestone for next release', '') ?? '',
  });

  core.info(`update new issue next title`);
  await octokit.request('PATCH /repos/{owner}/{repo}/milestones/{milestone_number}', {
    ...repo,
    milestone_number: newNextMileStone.data.number,
    title: 'next',
    description: 'milestone for next release',
  });
}

await main();
