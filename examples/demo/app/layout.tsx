import type { Metadata } from 'next'
import SasquashBridge from '@/app/components/SasquashBridge'

import './globals.css'

export const metadata: Metadata = {
  title: 'Sasquash Example',
  description:
    'Embeddable React component for reporting bugs & auto-changelogs',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
