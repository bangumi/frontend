const fs = require('node:fs');
const path = require('node:path');

const { exec } = require('@actions/exec');
const github = require('@actions/github');
const { context } = require('@actions/github');

const artifacts = {
  Build: 'sites',
  'Storybook Build': 'storybook',
};

const commentComment = '<!-- preview comment -->';

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
      PATH: process.env.PATH,
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
    for (const comment of comments) {
      if (comment.user.login === 'github-actions[bot]' && comment.body.includes(commentComment)) {
        return await updateComment(octokit, comment, artifact, alias);
      }
    }
  }

  await createComment(octokit, prNumber, artifact, alias);
}

/**
 * @param {InstanceType<typeof GitHub>} octokit
 * @param {string} artifact
 * @param {string} alias
 * @param {{id:number;body:string;}} comment
 */
async function updateComment (octokit, comment, artifact, alias) {
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

  links.unshift(
    commentComment,
    '# Preview Deployment',
  );

  await octokit.rest.issues.updateComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    comment_id: comment.id,
    body: links.join('\n'),
  });
}

/**
 * @param {InstanceType<typeof GitHub>} octokit
 * @param {number} issue_number
 * @param {string} artifact
 * @param {string} alias
 */
async function createComment (octokit, issue_number, artifact, alias) {
  await octokit.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number,
    body: [
      commentComment,
      '# Preview Deployment',
      `${toTitle(artifact)} <https://${alias}--bangumi-next.netlify.app> <!-- ${artifact} -->`,
    ].join('\n'),
  });
}

/**
 * @param {string} s
 */
function toTitle (s) {
  if (!s) {
    return '';
  }

  return s[0].toUpperCase() + s.slice(1).toLowerCase();
}

main().catch((e) => {
  throw e;
});
