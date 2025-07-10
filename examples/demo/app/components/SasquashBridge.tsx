'use client';

import { SasquashReporter } from '@joshkrutz/sasquash';
import { reportBug } from '@/app/actions/reportBug';
import { useState } from 'react';

export default function SasquashBridge() {
  async function handleSubmit(title: string, body: string) {
    const result = await reportBug(title, body);

    if ('error' in result) {
      alert(`❌ Failed: ${result.error}`);
    } else {
      alert(`✅ Created issue #${result.number}\n${result.html_url}`);
    }
  }
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  //return <div className={className} style={style}>
    return <div className="fixed top-0 h-full backdrop-blur-sm w-full border flex items-center">
      <div className="flex flex-col items-center align-center justify-self-center border w-fit m-auto bg-red-400/70 p-4 rounded-lg">
      <h2>Report a Bug</h2>
      <label htmlFor="issue-title">Issue title</label>
      <input
        className="w-[400px]"
        id="issue-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='What is your problem?'
      />
            <label htmlFor="issue-desc">f</label>
      <textarea
      id='issue-desc'
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder='Please describe your issue. Is this issue repeatable? Do you recall what steps you took that resulted in this issue?'
      />
      {/*<button onClick={() => onSubmit(title, body)}>Submit</button>*/}
      <div className="flex justify-between">
        <button onClick={() => handleSubmit(title, body)}>Submit</button>
        <button onClick={() => {
          //close window
        }}>Cancel</button>
        </div>
      </div>
    </div>
}