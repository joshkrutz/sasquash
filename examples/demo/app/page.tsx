import Image from 'next/image'
import Sasquasher from '@/components/ui/Sasquasher'
import { Toaster } from '@/components/ui/sonner'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/sasquash.svg"
          alt="Next.js logo"
          width={180}
          height={180}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Populate a .env file with your GITHUB_TOKEN, GITHUB_REPO,
            GITHUB_OWNER
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              pnpm add @joshkrutz/sasquash
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">instructions 2...</li>
        </ol>
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
      <Sasquasher repo="" token="" owner="" />
      <Toaster />
    </div>
  )
}
