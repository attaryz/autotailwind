#! /usr/bin/env node

import inquirer from "inquirer"
// import chalk from "chalk"

import { detect } from "./scripts/checks.js"
import new_project from "./scripts/new_project.js"
import existing_project from "./scripts/existing_project.js"
import remove_from_project from "./scripts/remove_from_project.js"
import chalk from "chalk"

interface App {}
// const program = new Command()

// program
//   .version("0.0.1")
//   .description("Automatically add tailwind to your project")
//   .option("-l, --ls  [value]", "List directory contents")
//   .option("-m, --mkdir <value>", "Create a directory")
//   .option("-t, --touch <value>", "Create a file")
//   .parse(process.argv)

// const options = program.opts()

//

// console.log(figlet.textSync("dd"))

// const log = console.log

// const errorLog = (message: string) => log(chalk.bold.red())
// const successLog = (message: string) => log(chalk.bold.green())

async function init() {
  console.clear()

  console.log(detect)

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
          if (!detect.isDirty) {
            return true
          } else {
            console.clear()
            console.log(
              chalk.bold.red("please commit your files then try again")
            )
            process.exit(0)
          }
        },

        // validate: (value) => {
        //   if (fs.existsSync(path.join(value, "package.json"))) {
        //     return true
        //   } else {
        //     return "Please enter a valid path"
        //   }
        // },
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
