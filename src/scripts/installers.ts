import { SupportedFrameworks } from "@/types"
import path from "path"
import { detect } from "./checks.js"
import { frameworksMeta } from "./deps.js"
import {
  createDir,
  createFile,
  execute,
  copyFile,
  createTailwindConfig,
  createCss,
} from "./files.js"

const { curPath } = detect

export const install = async (framework: SupportedFrameworks, path: string) => {
  if (framework === undefined) {
    console.error("No supported framework detected")
    console.log("Please run the command in the root of your project")
    console.log(
      "or visit the tailwind documentation https://tailwindcss.com/docs/installation"
    )
    process.exit(1)
  }

  const { dependencies, devDependencies, files } = frameworksMeta[framework]

  console.log(dependencies, devDependencies, files, "meta")
  // create tailwind.config.js
  //   createFile(path.join(curPath, "tailwind.config.js"))

  //   copyFile(
  //     path.join(curPath, "tailwind.config.js"),
  //     path.join(curPath, "tailwind.config.js")
  //   )

  //   // create postcss.config.js
  //   createFile(path.join(curPath, "postcss.config.js"))

  //   // create src/styles.css
  //   createDir(path.join(curPath, "src"))
  //   createFile(path.join(curPath, "src/styles.css"))

  //   // create tailwind.css
  //   createFile(path.join(curPath, "src/tailwind.css"))

  createTailwindConfig({
    lang: "js",
    framework,
    variants: [],
    plugins: [],
    projectFolder: path,
  })

  createCss(framework, path)
  // install dependencies
  console.log("installing dependencies ...")
  dependencies.length > 0 &&
    execute(`npm i ${dependencies.join(" ")}`, () => {})

  // install devDependencies
  console.log("installing devDependencies ...")
  devDependencies.length > 0 &&
    execute(`npm i -D ${devDependencies.join(" ")}`, () => {})
}
