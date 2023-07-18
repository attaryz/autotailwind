#! /usr/bin/env node

import inquirer from "inquirer"
import { existing_project, new_project, remove_from_project } from "./scripts"

// const program = new Command()

// program
//   .version("0.0.1")
//   .description("Automatically add tailwind to your project")
//   .option("-l, --ls  [value]", "List directory contents")
//   .option("-m, --mkdir <value>", "Create a directory")
//   .option("-t, --touch <value>", "Create a file")
//   .parse(process.argv)

// const options = program.opts()

inquirer
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
      when: (answers) => answers.type === "Add tailwind to an existing project",

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
      when: (answers) => answers.type === "Add tailwind to an existing project",
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

//

// console.log(figlet.textSync("dd"))
