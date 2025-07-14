import fs from 'fs'
import path from 'path'
import { execa } from 'execa'

function copyRecursiveSync(src: string, dest: string) {
  fs.mkdirSync(dest, { recursive: true })
  console.log('Installing template shadcn components:')

  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry)
    const destPath = path.join(dest, entry)

    const stat = fs.statSync(srcPath)
    if (stat.isDirectory()) {
      copyRecursiveSync(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
      console.log(` >Copied ${entry}`)
    }
  }
}

export async function addSasquasher() {
  const srcDir = path.join(__dirname, '../templates/sasquasher')
  const targetDir = path.resolve(process.cwd(), 'components/ui')

  // Copy main component
  fs.mkdirSync(targetDir, { recursive: true })
  fs.copyFileSync(
    path.join(srcDir, 'component.tsx'),
    path.join(targetDir, 'Sasquasher.tsx')
  )

  // Copy local shadcn-style ui components
  copyRecursiveSync(path.join(srcDir, 'ui'), targetDir)

  // Install dependencies
  const deps = JSON.parse(
    fs.readFileSync(path.join(srcDir, 'dependencies.json'), 'utf-8')
  )
  console.log('Installing dependencies:', deps.join(', '))
  await execa('pnpm', ['add', ...deps], { stdio: 'inherit' })

  console.log('Sasquasher installed at components/ui/')
}
