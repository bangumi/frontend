/* eslint-disable @typescript-eslint/no-use-before-define,@typescript-eslint/prefer-ts-expect-error */

import * as fs from 'node:fs';
import * as process from 'node:process';

import * as core from '@actions/core';
import { exec } from '@actions/exec';
import { context } from '@actions/github';
import * as github from '@actions/github';
import type { GitHub } from '@actions/github/lib/utils';

type Client = InstanceType<typeof GitHub>;

const artifacts: Record<string, string> = {
  Build: 'sites',
  'Storybook Build': 'storybook',
};

const now = new Date();

function pad(n: number, length = 2): string {
  return n.toString().padStart(length, '0');
}

const year = now.getUTCFullYear();
const month = pad(now.getUTCMonth());
const day = pad(now.getUTCDay());
const hour = pad(now.getUTCHours());
const minute = pad(now.getUTCMinutes());
const second = pad(now.getUTCSeconds());

const time = `${year}-${month}-${day} ${hour}:${minute}:${second}Z`;

const CLOUDFLARE_PROJECT_NAME = process.env.CLOUDFLARE_PROJECT_NAME ?? '';
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN ?? '';
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID ?? '';

/**
 * old preview commit header, should be purged.
 */
const legacyCommentComment = '<!-- preview comment 2 -->';
const commentComment = '<!-- preview comment 3 -->';

const tableHeader: readonly string[] = [
  commentComment,
  '<!-- DO NOT EDIT THIS COMMENT -->',
  '# Preview Deployment',
  '| Build | URL | time |',
  '| :-: | :-: | :-: |',
];

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
        GH_TOKEN: githubToken,
      },
    },
  );

  if (run.event === 'push') {
    console.log('skip push base event');
    return;
  }

  if (artifact === 'sites') {
    fs.renameSync('_functions', 'functions');
  }

  const prNumber = await findPullRequestNumber(octokit);

  const alias = `pr-${prNumber}-${artifact}`;

  await exec(
    'wrangler',
    [
      'pages',
      'deploy',
      `--project-name=${CLOUDFLARE_PROJECT_NAME}`,
      artifact,
      '--commit-dirty=true',
      `--branch="${alias}"`,
    ],
    {
      env: {
        CLOUDFLARE_API_TOKEN,
        CLOUDFLARE_ACCOUNT_ID,
        PATH: process.env.PATH ?? '',
      },
    },
  );

  const comments = await octokit.paginate(
    'GET /repos/{owner}/{repo}/issues/{issue_number}/comments',
    {
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: prNumber,
    },
  );

  for (const comment of comments) {
    if (
      comment.user?.login === 'github-actions[bot]' &&
      comment.body?.includes(legacyCommentComment)
    ) {
      await octokit.request('DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}', {
        owner: context.repo.owner,
        repo: context.repo.repo,
        comment_id: comment.id,
      });
    }

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

/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
async function findPullRequestNumber(octokit: Client): Promise<number> {
  const payloadPRNumber: number | undefined =
    context.payload?.workflow_run?.pull_requests?.[0]?.number;
  if (payloadPRNumber) {
    core.info('find pr number from context');
    return payloadPRNumber;
  }

  const run: {
    head_repository: { owner: { login: string } };
    head_branch: string;
  } = context.payload?.workflow_run;

  const head = `${run.head_repository.owner.login}:${run.head_branch}`;

  core.info(`try head branch ${head}`);

  /**
   * github api 这里有一个 BUG ，
   * 如果head 是 `Ayase-252:refactor-e2e` 这种情况就无法正常用 query 进行筛选。
   * 所以必须要获取所有的 PR，然后手动筛选
   */
  for await (const { data: prs } of octokit.paginate.iterator('GET /repos/{owner}/{repo}/pulls', {
    owner: context.repo.owner,
    repo: context.repo.repo,
    base: 'master',
    state: 'open',
  })) {
    for (const pr of prs) {
      if (pr.head.label === head) {
        return pr.number;
      }
    }
  }

  core.error('failed to find PR from context');
  throw new Error('failed to find PR from context');
}

const commentTableItem = '<!-- table item -->';

async function updateComment(
  octokit: Client,
  comment: { id: number; body: string },
  artifact: string,
  alias: string,
) {
  const { line, id } = tableLine(artifact, alias);
  const builds = [line];

  for (const value of comment.body.split('\n')) {
    if (!value.includes(commentTableItem)) {
      continue;
    }

    if (!value.includes(id)) {
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

function tableLine(artifact: string, alias: string) {
  const id = `<!-- ${artifact} -->`;
  return {
    id,
    line: `| ${toTitle(
      artifact,
    )} | [netlify preview](https://${alias}.${CLOUDFLARE_PROJECT_NAME}.pages.dev) | ${time} | ${id} ${commentTableItem}`,
  };
}

async function createComment(octokit: Client, prNumber: number, artifact: string, alias: string) {
  await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: prNumber,
    body: [...tableHeader, tableLine(artifact, alias).line].join('\n'),
  });
}

function toTitle(s: string) {
  if (!s) {
    return '';
  }

  return (s[0]?.toUpperCase() ?? '') + s.slice(1).toLowerCase();
}

await main();
