/* eslint-disable @typescript-eslint/no-use-before-define */

import * as fs from 'node:fs';
import * as path from 'node:path';

import { exec } from '@actions/exec';
import { context } from '@actions/github';
import * as github from '@actions/github';
import type { GitHub } from '@actions/github/lib/utils';
import * as process from 'process';

type Client = InstanceType<typeof GitHub>;

const artifacts: Record<string, string> = {
  Build: 'sites',
  'Storybook Build': 'storybook',
};

const now = new Date();
now.setMilliseconds(0);

function pad(n: number, length: number = 2): string {
  return n.toString().padStart(length, '0');
}

const time = `${now.getUTCFullYear()}-${pad(now.getUTCMonth())}-${pad(now.getUTCDay())} ${pad(
  now.getUTCHours(),
)}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}Z`;

const commentComment = '<!-- preview comment -->';

const tableHeader: ReadonlyArray<string> = [
  commentComment,
  '<!-- DO NOT EDIT THIS COMMENT -->',
  '# Preview Deployment',
  '| Build | URL | time |',
  '| :-: | :-: | :-: |',
];

async function main() {
  const NETLIFY_AUTH_TOKEN = process.env.NETLIFY_AUTH_TOKEN ?? '';
  const NETLIFY_SITE_ID = process.env.NETLIFY_SITE_ID ?? '';

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

  const RUN_ID = process.env.RUN_ID;
  if (!RUN_ID) {
    throw new Error('process.env.RUN_ID is empty');
  }

  const { data: run } = await octokit.request(`GET /repos/{owner}/{repo}/actions/runs/{run_id}`, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    run_id: parseInt(RUN_ID),
  });

  await exec(
    'gh',
    [
      '--repo',
      `${github.context.repo.owner}/${github.context.repo.repo}`,
      'run',
      'download',
      RUN_ID,
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

  if (run.event === 'push') {
    await exec(
      'netlify',
      [
        'deploy',
        `--dir=${artifact}`,
        `--alias="${artifact}"`,
        ...(artifact === 'sites' ? ['--prod'] : []),
      ],
      {
        env: {
          NETLIFY_AUTH_TOKEN,
          NETLIFY_SITE_ID,
          PATH: process.env.PATH ?? '',
        },
      },
    );
    return;
  }

  const prNumber = parseInt(fs.readFileSync(path.resolve(artifact, 'pr_number')).toString().trim());

  const alias = `pr-${prNumber}-${artifact}`;

  await exec('netlify', ['deploy', `--dir=${artifact}`, `--alias="${alias}"`], {
    env: {
      NETLIFY_AUTH_TOKEN,
      NETLIFY_SITE_ID,
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
  const builds = [];
  const current = tableLine(artifact, alias);

  for (const value of comment.body.split('\n')) {
    if (value.includes(`<!-- ${artifact} --> <!-- table item -->`)) {
      builds.push(current);
    } else if (value.includes('<!-- table item -->')) {
      builds.push(value);
    }
  }

  builds.sort();

  await octokit.request('PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}', {
    owner: context.repo.owner,
    repo: context.repo.repo,
    comment_id: comment.id,
    body: [...tableHeader, ...builds].join('\n'),
  });
}

function tableLine(artifact: string, alias: string): string {
  return `| ${toTitle(
    artifact,
  )} | <https://${alias}--bangumi-next.netlify.app> | ${time} | <!-- ${artifact} --> <!-- table item -->`;
}

async function createComment(octokit: Client, prNumber: number, artifact: string, alias: string) {
  await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: prNumber,
    body: [...tableHeader, tableLine(artifact, alias)].join('\n'),
  });
}

function toTitle(s: string) {
  if (!s) {
    return '';
  }

  return (s[0]?.toUpperCase() ?? '') + s.slice(1).toLowerCase();
}

await main();
