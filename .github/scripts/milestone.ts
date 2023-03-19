import * as path from 'node:path';
import * as fs from 'node:fs';

import * as github from '@actions/github';

const packageJSON = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../package.json')).toString(),
);

const { version } = packageJSON;

async function main() {
  const githubToken = process.env.GH_TOKEN;
  if (!githubToken) {
    throw new Error('process.env.GH_TOKEN is empty');
  }

  const octokit = github.getOctokit(githubToken);

  const milestones = await octokit.paginate('GET /repos/{owner}/{repo}/milestones', {
    owner: 'bangumi',
    repo: 'frontend',
  });

  for (const milestone of milestones) {
    console.log(milestone);
    if (milestone.title === 'next') {
      await octokit.request('PATCH /repos/{owner}/{repo}/milestones/{milestone_number}', {
        milestone_number: milestone.number,
        owner: 'bangumi',
        repo: 'frontend',
        title: version,
      });
      break;
    }
  }

  await octokit.request('POST /repos/{owner}/{repo}/milestones', {
    owner: 'bangumi',
    repo: 'frontend',
    title: 'next',
  });
}

main().catch((e) => {
  throw e;
});
