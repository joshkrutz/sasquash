import Image from 'next/image'
import Sasquasher from '@/components/ui/Sasquasher'
import { Toaster } from '@/components/ui/sonner'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert self-center"
          src="/sasquash.svg"
          alt="Next.js logo"
          width={180}
          height={180}
          priority
        />
        <div>
          <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <li className="mb-2 tracking-[-.01em]">
              {'Create a '}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                .env.local
              </code>
              {' file at the root of your test app'}
            </li>
            <li className="tracking-[-.01em]">
              Populate
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                GITHUB_TOKEN
              </code>
              {', '}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                GITHUB_REPO_NAME
              </code>
              {', and '}
              <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
                GITHUB_REPO_OWNER
              </code>
            </li>
            <li>Use the "Report an issue" button to test out the basic API.</li>
          </ol>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/joshkrutz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            className="dark:invert"
            src="/github-mark.svg"
            alt="GitHub icon"
            width={16}
            height={16}
            priority
          />
          More by @joshkrutz
        </a>
      </footer>
      <Sasquasher endpoint="/api/sasquash/report" />
      <Toaster />
    </div>
  )
}
