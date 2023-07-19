#! /usr/bin/env node
import chalk from "chalk"
import { detect } from "./checks.js"
import { install } from "./installers.js"
import { SupportedFrameworks } from "@/types"

//

export default function existing_project(answers: any) {
  console.log("attempting to detect framework ...")

  if (detect.framework === "none") {
    console.log(chalk.bold.red("no supported framework detected"))
  }
  console.log(`detected ${detect.framework}`)
  install(detect.framework as SupportedFrameworks)
  console.log(chalk.bold.green("tailwind installed successfully"))
}
