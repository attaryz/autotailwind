#! /usr/bin/env node
import chalk from "chalk"
import { detect } from "./checks.js"
import { install } from "./installers.js"
import { SupportedFrameworks } from "@/types"
import { clearLastLine } from "./utils.js"

//

export default function existing_project(answers: any) {
  //
  clearLastLine()

  console.log(chalk.blue("attempting to detect framework ..."))

  if (detect.framework === undefined) {
    console.log(chalk.bold.red("no supported framework detected"))
  }

  console.log()
  console.log(chalk.green(`Detected ${detect.framework}`))

  console.log()
  install(detect.framework as SupportedFrameworks, answers.path)

  console.log()
  console.log(chalk.bold.green("tailwind installed successfully"))
}
