import { SupportedFrameworks } from "@/types"
import path from "path"
import { detect } from "./checks.js"
import { frameworksMeta } from "./deps.js"
import { createDir, createFile, execute } from "./files.js"
import ProgressBar from "progress"

const { curPath } = detect

const bar = new ProgressBar("  downloading [:bar] :rate/bps :percent :etas", {
  complete: "=",
  incomplete: " ",
  width: 20,
  total: 100,
})

export const install = async (framework: SupportedFrameworks) => {
  if (framework === "none") {
    console.error("No supported framework detected")
    return
  }

  const { dependencies, devDependencies, files } = frameworksMeta[framework]

  console.log(dependencies, devDependencies, files, "meta")
  // create tailwind.config.js
  createFile(path.join(curPath, "tailwind.config.js"))

  // create postcss.config.js
  createFile(path.join(curPath, "postcss.config.js"))

  // create src/styles.css
  createDir(path.join(curPath, "src"))
  createFile(path.join(curPath, "src/styles.css"))

  // create tailwind.css
  createFile(path.join(curPath, "src/tailwind.css"))

  // install dependencies and devDependencies
  // display progress bar

  // install dependencies
  console.log("installing dependencies ...")
  dependencies.length > 0 &&
    execute(`npm i ${dependencies.join(" ")}`, () => {})

  // install devDependencies
  console.log("installing devDependencies ...")
  devDependencies.length > 0 &&
    execute(`npm i -D ${devDependencies.join(" ")}`, () => {})
}
