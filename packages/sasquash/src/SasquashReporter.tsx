import {useState} from 'react'

export function SasquashReporter({
  onSubmit
} : {
  onSubmit: (title: string, body: string) => void
}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  return (
    <div>
      <h2>Report a Bug</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Issue title'
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder='Please describe your issue'
        style={{}}
      />
      <button onClick={() => onSubmit(title, body)}>Submit</button>
    </div>
  )
}