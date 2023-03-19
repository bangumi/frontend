/* eslint-disable @typescript-eslint/no-use-before-define */

import * as fs from 'node:fs';
import * as path from 'node:path';

import { exec } from '@actions/exec';
import { context } from '@actions/github';
import * as github from '@actions/github';
import type { GitHub } from '@actions/github/lib/utils';

type Client = InstanceType<typeof GitHub>;

const artifacts: Record<string, string> = {
  Build: 'sites',
  'Storybook Build': 'storybook',
};

const commentComment = '<!-- preview comment -->';

async function main() {
  const githubToken = process.env.GH_TOKEN;
  if (!githubToken) {
    throw new Error('process.env.GH_TOKEN is empty');
  }
  const octokit = github.getOctokit(githubToken);

  const workflowName = process.env.workflow_name;
  if (!workflowName) {
    throw new Error('process.env.workflow_name is empty');
  }

  const artifact = artifacts[workflowName];
  if (!artifact) {
    throw new Error(`not valid workflow name ${workflowName}`);
  }

  await exec(
    'gh',
    [
      '--repo',
      `${github.context.repo.owner}/${github.context.repo.repo}`,
      'run',
      'download',
      `${context.runId}`,
      '--name',
      artifact,
      '--dir',
      artifact,
    ],
    {
      env: {
        GH_TOKEN: process.env.GH_TOKEN ?? '',
      },
    },
  );

  const prNumber = parseInt(fs.readFileSync(path.resolve(artifact, 'pr_number')).toString().trim());

  const alias = `pr-${prNumber}-${artifact}`;

  await exec('netlify', ['deploy', `--dir=${artifact}`, `--alias="${alias}"`], {
    env: {
      NETLIFY_AUTH_TOKEN: process.env.NETLIFY_AUTH_TOKEN ?? '',
      NETLIFY_SITE_ID: process.env.NETLIFY_SITE_ID ?? '',
      PATH: process.env.PATH ?? '',
    },
  });

  const comments = await octokit.paginate(
    'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: prNumber,
    },
  );

  for (const comment of comments) {
    if (comment.user?.login === 'github-actions[bot]' && comment.body?.includes(commentComment)) {
      return updateComment(
        octokit,
        {
          id: comment.id,
          body: comment.body ?? '',
        },
        artifact,
        alias,
      );
    }
  }

  await createComment(octokit, prNumber, artifact, alias);
}

async function updateComment(
  octokit: Client,
  comment: { id: number; body: string },
  artifact: string,
  alias: string,
) {
  const links = [];
  const s = comment.body.split('\n').filter(Boolean);

  for (const value of s.slice(2)) {
    if (value.includes(`<!-- ${artifact} -->`)) {
      return;
    }

    links.push(value + '\n');
  }

  links.push(
    `${toTitle(artifact)} <https://${alias}--bangumi-next.netlify.app> <!-- ${artifact} -->\n`,
  );

  links.unshift(commentComment, '# Preview Deployment');

  await octokit.request('POST /repos/{owner}/{repo}/issues/comments', {
    owner: context.repo.owner,
    repo: context.repo.repo,
    comment_id: comment.id,
    body: links.join('\n'),
  });
}

async function createComment(octokit: Client, prNumber: number, artifact: string, alias: string) {
  await octokit.request('POST /repos/{owner}/{repo}/issues/comments', {
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: prNumber,
    body: [
      commentComment,
      '# Preview Deployment',
      `${toTitle(artifact)} <https://${alias}--bangumi-next.netlify.app> <!-- ${artifact} -->`,
    ].join('\n'),
  });
}

function toTitle(s: string) {
  if (!s) {
    return '';
  }

  return (s[0]?.toUpperCase() ?? '') + s.slice(1).toLowerCase();
}

await main();
