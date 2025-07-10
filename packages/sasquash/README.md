# Sasquash

> Bug reporting and changelog fetching made simple — powered by GitHub Issues & Releases.

Sasquash lets you wire up GitHub bug reports and changelogs in seconds.
It's lightweight, framework-agnostic, and gives you full control over UI.

---

## 🚀 Features

- Report issues like bugs and enhancements via GitHub Issues
- Fetch changelogs from GitHub Releases
- No backend required — works with a GitHub token
- Bring your own UI, or use the optional `<SasquashReporter />` component

---

## 📦 Installation

```bash
pnpm add @joshkrutz/sasquash
```

---

## 🔧 Usage

### 1. Create a client

```ts
import { createSasquashClient } from '@joshkrutz/sasquash'

const client = createSasquashClient({
  token: 'ghp_***', // Use a GitHub PAT
  owner: 'repo-owner',
  repo: 'repo-name',
})
```

### 2. Test the repo connection

```ts
const canReachRepo = await client.testConnection()
console.log(`I can access the configured repo: ${canReachRepo}`)
```

### 3. Report an issue

```ts
await client.createIssue({
  title: 'Bug: something broke',
  body: 'Steps to reproduce:\n...',
  label: 'bug', // or 'enhancement'
})
```

### 4. Get all open (or closed) issues

```ts
const issues = await client.getIssues((state = 'open'))
console.log(`Number of open issues: ${issues.length}`)
```

### 5. Get changelog

```ts
const changelog = await client.getChangelog()
console.log(changelog)
```

---

## 🎨 Optional: Built-in UI component

```tsx
import { SasquashReporter } from '@joshkrutz/sasquash'
;<SasquashReporter
  onSubmit={(title, body) => client.createIssue({ title, body })}
  style={{ backgroundColor: '#fff' }}
/>
```

---

## 🛡 Security

- Tokens are never and should never be exposed by default — you control how/when the client is created
- Rate limiting and abuse detection are automatically handled via Octokit throttling

---

## 📖 API Reference

### `createSasquashClient(config)`

Config arguments:

| Option      | Type               | Description                                    |
| ----------- | ------------------ | ---------------------------------------------- |
| `token`     | string             | GitHub personal access token                   |
| `owner`     | string             | GitHub org or user name                        |
| `repo`      | string             | GitHub repo                                    |
| `doLogging` | boolean (optional) | Logs rate limits / errors. Defaults to `false` |

---

## 📄 License

MIT — © 2025 Josh Krutz
