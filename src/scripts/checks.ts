import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import child_process from "child_process"

// const __filename = fileURLToPath(import.meta.url)

// const __dirname = path.dirname(__filename)

// const currentDir = path.resolve(__dirname)

const curPath = process.cwd()

const files = fs.readdirSync(curPath)

const isPackageJson = files.includes("package.json")
const isTypeScript = files.includes("tsconfig.json")
const isGit = fs.existsSync(path.join(curPath, ".git"))
// let framework: SupportedFrameworks= undefined

const detectFramework = () => {
  if (isPackageJson) {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(curPath, "package.json")).toString()
    )

    if (packageJson.dependencies) {
      if (packageJson.dependencies.react && packageJson.dependencies.next) {
        return "next"
      }
      if (packageJson.dependencies.react && !packageJson.dependencies.next) {
        return "react"
      }
      if (packageJson.dependencies.vue) {
        return "vue"
      }
      if (packageJson.dependencies.angular) {
        return "angular"
      }
      if (packageJson.dependencies.svelte) {
        return "svelte"
      }
    }
  }
  return "none"
}

const framework = detectFramework()

// check if the directory has any uncommitted changes or untracked files
const isDirty =
  child_process.execSync("git status --porcelain").toString().trim() !== ""

export const detect = {
  files,
  isPackageJson,
  isTypeScript,
  curPath,
  isGit,
  isDirty,
  framework,
  detectFramework,
}
