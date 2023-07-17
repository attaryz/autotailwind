#! /usr/bin/env node

import { Command } from "commander"
import figlet from "figlet"
import fs from "fs"
import inquirer from "inquirer"
import path from "path"
import { new_project } from "./scripts/new_project"

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
      fs.writeFileSync(
        path.join(answers.path, "tailwind.config.js"),
        `module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.js"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [],

}`
      )
      fs.writeFileSync(
        path.join(answers.path, "postcss.config.js"),
        `module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}`
      )
      fs.writeFileSync(
        path.join(answers.path, "src", "tailwind.css"),
        `@tailwind base;
@tailwind components;
@tailwind utilities;`
      )
      fs.writeFileSync(path.join(answers.path, "src", "styles.css"), "")
      fs.writeFileSync(
        path.join(answers.path, "package.json"),
        `{
    "name": "${answers.name}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "build": "postcss src/tailwind.css -o src/styles.css"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "autoprefixer": "^10.2.5",
        "postcss": "^8.2.6",
        "tailwindcss": "^2.0.3"
    }
}`
      )
    } else if (answers.type === "Remove tailwind from a project") {
      fs.unlinkSync(path.join(answers.path, "tailwind.config.js"))
      fs.unlinkSync(path.join(answers.path, "postcss.config.js"))
      fs.unlinkSync(path.join(answers.path, "src", "tailwind.css"))
      fs.unlinkSync(path.join(answers.path, "src", "styles.css"))
      fs.unlinkSync(path.join(answers.path, "package.json"))
    }
  })

//

console.log(figlet.textSync("dd"))
