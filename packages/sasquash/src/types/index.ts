import { RequestOptions, OctokitResponse, Endpoints } from '@octokit/types'

// GitHub API: single release type
export type Release =
  Endpoints['GET /repos/{owner}/{repo}/releases']['response']['data'][number]

// GitHub rate-limit request types
export type { RequestOptions, OctokitResponse }

export type IssueParams = {
  title: string
  body: string
  label?: string
}

export type Config = {
  token: string
  owner: string
  repo: string
  doLogging?: boolean
}
