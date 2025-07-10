import { Octokit } from 'octokit'
import { throttling } from '@octokit/plugin-throttling'
import type {
  Config,
  RequestOptions,
  IssueParams,
  OctokitResponse,
  Release,
} from './types'

const Octo = Octokit.plugin(throttling)

export function createSasquashClient({
  token,
  owner,
  repo,
  doLogging = false,
}: Config) {
  const octokit = new Octo({
    auth: token,
    throttle: {
      onRateLimit: (_retryAfter: number, req: RequestOptions) => {
        if (doLogging) console.warn(`Rate limit hit: ${req.method} ${req.url}`)
        return (req.request?.retryCount ?? 0) === 0
      },
      onAbuseLimit: (_retryAfter: number, req: RequestOptions) => {
        if (doLogging)
          console.error(`Abuse detection: ${req.method} ${req.url}`)
        return false
      },
    },
  })

  return {
    /**
     * Test if repo can be reached using configured token, owner, and repo.
     * @returns `true` if the connection succeeds, otherwise `false`
     */
    async testConnection(): Promise<boolean> {
      try {
        await octokit.rest.repos.get({ owner, repo })
        return true
      } catch {
        return false
      }
    },

    /**
     * Creates a new GitHub issue in the configured repository
     * @param title - The issue title
     * @param body - Markdown or plain text body content
     * @param label - Optional label (default: 'bug')
     * @returns The created GitHub issue response
     */
    async createIssue({ title, body, label = 'bug' }: IssueParams) {
      return octokit.rest.issues.create({
        owner,
        repo,
        title,
        body,
        labels: [label],
      })
    },

    /**
     * Fetches a list of issues from the repository
     * @param state - 'open' or 'closed' issues (default: 'open')
     * @returns Array of GitHub issue objects
     */
    async getIssues({ state = 'open' }: { state?: 'open' | 'closed' }) {
      const { data } = await octokit.rest.issues.listForRepo({
        owner,
        repo,
        state,
      })
      return data
    },

    /**
     * Fetches recent releases from GitHub and formats them as a markdown changelog.
     * Uses Ocotokit's built-in pagination to retreive multiple pages if needed.
     * @param limit - Maximum number of releases to include (defaut: 20)
     * @returns Retrieves and formats the 10 most recent
     */
    async getChangelog(limit = 20): Promise<string> {
      const releases = await octokit.paginate(
        octokit.rest.repos.listReleases,
        { owner, repo, per_page: 50 },
        (response: OctokitResponse<Release[]>, done: () => void) => {
          const items = response.data
          if (items.length >= limit) done()
          return items
        }
      )

      return releases
        .slice(0, limit)
        .map(
          (r: Release) =>
            `## ${r.name ?? r.tag_name}\n${
              r.body?.trim() || '*No description*'
            }`
        )
        .join('\n\n')
    },
  }
}
