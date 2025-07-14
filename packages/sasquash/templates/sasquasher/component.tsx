'use client'

import { useState } from 'react'
import { Bug, CheckCircle2, CircleAlert, Send } from 'lucide-react'
import { toast } from 'sonner'
import * as motion from 'framer-motion/client'

import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Textarea } from './textarea'

const post = (positive = true, text = 'Your bug report was successful') => {
  toast.custom((t) => (
    <div
      className={
        'flex items-center gap-3 p-4 border-l-4 bg-white dark:bg-zinc-900 rounded shadow' +
        (positive ? ' border-green-500' : ' border-red-500')
      }
      onClick={() => toast.dismiss(t)}
    >
      {positive && (
        <CheckCircle2 className="text-green-500 w-5 h-5 translate-y-[0.5px]" />
      )}
      {!positive && (
        <CircleAlert className="text-red-500 w-5 h-5 translate-y-[0.5px]" />
      )}
      <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {text}
      </div>
    </div>
  ))
}

const postFailed = (errorMessage = '') => {
  post(false, 'Post failed - ' + errorMessage)
}

type Props = {
  endpoint: string
}

export default function Sasquasher({ endpoint }: Props) {
  const [isFormOpen, setFormOpen] = useState(false)
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')

  var MAX_CHAR_DESC = 1500

  return (
    <div>
      <Popover open={isFormOpen} onOpenChange={setFormOpen}>
        <PopoverTrigger asChild>
          <motion.button whileTap={{ scale: 0.85 }}>
            <Button className="flex gap-2 rounded-full" asChild>
              <span className="flex items-center">
                <Bug className="translate-y-[0.5px]" />
                Report an issue
              </span>
            </Button>
          </motion.button>
        </PopoverTrigger>
        <PopoverContent className="space-y-1.5">
          <Label htmlFor="title">Summary</Label>
          <Input
            id="title"
            type="text"
            placeholder={`e.g. "Page not found"`}
            maxLength={150}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="A brief explanation of the issue, steps taken to reproduce the issue, etc..."
            maxLength={MAX_CHAR_DESC}
            className="resize-none w-full"
            style={{
              minHeight: '6rem',
              height: 'auto',
              maxHeight: '50vh',
            }}
            onChange={(e) => {
              setDescription(e.target.value)
              const textarea = e.target
              textarea.style.height = `${textarea.scrollHeight}px`
            }}
          />
          <p className="text-sm text-right">
            {description.length}/{MAX_CHAR_DESC}
          </p>
          <Button
            className="w-full"
            onClick={async () => {
              try {
                const res = await fetch(endpoint, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ title, description }),
                })

                if (!res.ok) {
                  const errorData = await res.json().catch(() => null)
                  const message =
                    errorData?.message ||
                    `Request failed with status ${res.status}`
                  throw new Error(message)
                }

                post()
              } catch (error) {
                if (error instanceof Error) {
                  postFailed(error.message.split('-')[0].trim())
                } else {
                  postFailed('Unknown error')
                }
              } finally {
                setDescription('')
                setTitle('')
                setFormOpen(false)
              }
            }}
          >
            <Send />
            Submit
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}
