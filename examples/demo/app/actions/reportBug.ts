'use server';

import { Octokit } from '@octokit/rest';

export async function reportBug(
  title: string,
  body: string,
): Promise<
  | { html_url: string; number: number }
  | { error: string }
> {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;

  if (!token || !owner || !repo) {
    return { error: 'Missing GITHUB_TOKEN or repo config' };
  }

  const octokit = new Octokit({ auth: token });

  try {
    const res = await octokit.issues.create({
      owner,
      repo,
      title,
      body,
      labels: ['bug'],
    });

    return {
      html_url: res.data.html_url,
      number: res.data.number,
    };
  } catch (err: any) {
    return { error: err.message || 'Failed to create issue' };
  }
}