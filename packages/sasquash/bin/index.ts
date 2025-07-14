#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'
import { addSasquasher } from './commands/add-sasquasher'

const main = defineCommand({
  meta: {
    name: 'sasquash',
    version: '0.1.0',
    description: 'Bug reporting & changelog tools',
  },
  subCommands: {
    add: defineCommand({
      meta: { name: 'add' },
      args: {
        component: {
          type: 'positional',
          required: true,
        },
      },
      run({ args }) {
        if (args.component === 'sasquasher') {
          addSasquasher()
        } else {
          console.log(`Component "${args.component}" not found.`)
        }
      },
    }),
  },
})

runMain(main)
