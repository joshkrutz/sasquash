'use client'

import { useState } from 'react'
import { Bug, CheckCircle2, CircleAlert, Send } from 'lucide-react'
import { toast } from 'sonner'
import * as motion from 'framer-motion/client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Textarea } from './textarea'
import { createSasquashClient, SasquashConfig } from '@joshkrutz/sasquash'

const post = (positive = true, text = 'Your bug report was successful') => {
  toast.custom((t) => (
    <div
      className={
        (`flex items-center gap-3 p-4 border-l-4 bg-white dark:bg-zinc-900 rounded shadow`) +
        positive ? ' border-green-500' : ' border-red-500'
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

export default function Sasquasher({ token, owner, repo }: SasquashConfig) {
  const [isFormOpen, setFormOpen] = useState(false)
  const [body, setDescription] = useState('')
  const [title, setTitle] = useState('')

  var MAX_CHAR_DESC = 1500

  var client = createSasquashClient({ token, owner, repo })

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
            {body.length}/{MAX_CHAR_DESC}
          </p>
          <Button
            className="w-full"
            onClick={async () => {
              try {
                const response = await client.createIssue({ title, body })
                post()
              } catch (error) {
                if (error instanceof Error) {
                  postFailed(error.message.split('-')[0].trim())
                }
              } finally {
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