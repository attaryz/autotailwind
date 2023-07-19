#! /usr/bin/env node

import inquirer from "inquirer"
// import chalk from "chalk"

import { detect } from "./scripts/checks.js"
import new_project from "./scripts/new_project.js"
import existing_project from "./scripts/existing_project.js"
import remove_from_project from "./scripts/remove_from_project.js"
import chalk from "chalk"

interface App {}

async function init() {
  console.clear()

  // console.log(detect)

  await inquirer
    .prompt([
      {
        type: "list",
        name: "type",
        message: "What do you want to do?",
        choices: [
          "Create a new project",
          "Add tailwind to an existing project",
          "Remove tailwind from a project",
          "Exit",
        ],
      },
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        when: (answers) => answers.type === "Create a new project",
      },
      {
        type: "input",
        name: "path",
        message: "Where do you want to create your project?",
        when: (answers) => answers.type === "Create a new project",
      },
      {
        type: "input",
        name: "path",
        message: "Where is your project?",
        when: (answers) =>
          answers.type === "Add tailwind to an existing project",

        validate: () => {
          if (!detect.isGit()) {
            return true
          } else if (!detect.isDirty()) {
            console.clear()
            console.log(
              chalk.bold.red("please commit your files then try again")
            )
            process.exit(0)
          }
          return true
        },
      },
      {
        type: "list",
        name: "language",
        message: "Where is your project?",
        choices: ["TypeScript", "JavaScript"],
        when: (answers) =>
          answers.type === "Add tailwind to an existing project",
      },
      {
        type: "input",
        name: "path",
        message: "Where is your project?",
        when: (answers) => answers.type === "Remove tailwind from a project",
      },
    ])
    .then((answers) => {
      if (answers.type === "Create a new project") {
        new_project(answers)
      } else if (answers.type === "Add tailwind to an existing project") {
        existing_project(answers)
      } else if (answers.type === "Remove tailwind from a project") {
        remove_from_project(answers)
      } else {
        process.exit()
      }
    })

  // process.exit(0)
}

init()
