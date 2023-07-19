import fs from "fs"
import path from "path"
import child_process from "child_process"
import { SupportedFrameworks } from "@/types"

const curPath = process.cwd()

const files = fs.readdirSync(curPath)

const isPackageJson = files.includes("package.json")
const isTypeScript = files.includes("tsconfig.json")

// check if the directory is a git repository
const isGit = (): boolean => {
  try {
    child_process.execSync("git rev-parse --is-inside-work-tree")
    return true
  } catch (error) {
    return false
  }
}

// check if the directory has any uncommitted changes or untracked files
const isDirty = (): boolean => {
  try {
    child_process.execSync("git status --porcelain")
    return true
  } catch (error) {
    return false
  }
}

const detectFramework = (): SupportedFrameworks | undefined => {
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
    }
  }
  return undefined
}

const framework = detectFramework()

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
