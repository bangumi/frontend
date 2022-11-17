const fsp = require('node:fs/promises');
const fs = require('node:fs');
const path = require('node:path');

const { exec } = require('@actions/exec');
const github = require('@actions/github');
const { context } = require('@actions/github');

const artifacts = {
  Build: 'sites',
  'Storybook Build': 'storybook',
};

async function main () {
  const githubToken = process.env.GH_TOKEN;
  if (!githubToken) {
    throw new Error('process.env.GH_TOKEN is empty');
  }
  const octokit = github.getOctokit(githubToken);

  const workflow_name = process.env.workflow_name;
  if (!workflow_name) {
    throw new Error('process.env.workflow_name is empty');
  }

  if (!Object.keys(artifacts).includes(workflow_name)) {
    throw new Error(`not valid workflow name ${workflow_name}`);
  }

  const artifact = artifacts[workflow_name];

  await exec(
    'gh',
    [
      '--repo',
      `${github.context.repo.owner}/${github.context.repo.repo}`,
      'run',
      'download',
      `${process.env.RUN_ID}`,
      '--name',
      artifact,
      '--dir',
      artifact,
    ],
    {
      env: {
        GH_TOKEN: process.env.GH_TOKEN,
      },
    },
  );

  const prNumber = parseInt(
    fs.readFileSync(path.resolve(artifact, 'pr_number')).toString().trim(),
  );

  const alias = `pr-${prNumber}-${artifact}`;

  await exec('netlify', ['deploy', `--dir=${artifact}`, `--alias="${alias}"`], {
    env: {
      NETLIFY_AUTH_TOKEN: process.env.NETLIFY_AUTH_TOKEN,
      NETLIFY_SITE_ID: process.env.NETLIFY_SITE_ID,
    },
  });

  for await(const { data: comments } of octokit.paginate.iterator(
    octokit.rest.issues.listComments,
    {
      owner: context.repo.owner,
      repo: context.repo.repo,
      issue_number: prNumber,
    },
  )) {
    console.log(comments);
    for (const comment of comments) {
      if (comment.user.login === 'github-actions[bot]' && comment.body.includes('<!-- preview comment -->')) {
        console.log(comment);
      }
    }
  }

  console.log(comments);
}

main().catch((e) => {
  throw e;
});
