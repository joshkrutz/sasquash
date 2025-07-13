import fs from 'fs'
import path from 'path'
import { execa } from 'execa'

export async function addSasquasher() {
  const srcDir = path.join(__dirname, '../templates/sasquasher')
  const targetDir = path.resolve(process.cwd(), 'components/ui')

  const srcFile = path.join(srcDir, 'component.tsx')
  const destFile = path.join(targetDir, 'Sasquasher.tsx')

  fs.mkdirSync(targetDir, { recursive: true })
  fs.copyFileSync(srcFile, destFile)

  const deps = JSON.parse(
    fs.readFileSync(path.join(srcDir, 'dependencies.json'), 'utf-8')
  )
  console.log('Installing dependencies:', deps.join(', '))
  await execa('pnpm', ['add', ...deps], { stdio: 'inherit' })

  console.log('Sasquasher installed at components/ui/Sasquasher.tsx')
}
