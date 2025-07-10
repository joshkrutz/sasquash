'use client'

import { useState } from 'react'

export function SasquashReporter({
  onSubmit,
  className,
  style,
}: {
  onSubmit: (t: string, b: string) => void
  className?: string
  style?: React.CSSProperties
}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  return (
    <div className={className} style={style}>
      <h2>Report a Bug</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Issue title"
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Please describe your issue"
        style={{}}
      />
      <button onClick={() => onSubmit(title, body)}>Submit</button>
    </div>
  )
}
