import { NextResponse } from 'next/server'
import { createSasquashClient } from '@joshkrutz/sasquash'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description } = body

    console.log(body)

    if (!title) {
      return NextResponse.json({ message: 'Missing title' }, { status: 400 })
    }

    if (!description) {
      return NextResponse.json(
        { message: 'Missing description' },
        { status: 400 }
      )
    }

    const client = createSasquashClient({
      token: process.env.GITHUB_TOKEN!,
      repo: process.env.GITHUB_REPO_NAME!,
      owner: process.env.GITHUB_REPO_OWNER!,
    })

    const result = await client.createIssue({ title, body: description })

    return NextResponse.json(result, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}
