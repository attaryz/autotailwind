#! /usr/bin/env node

import fs from "fs"
import path from "path"
export default function existing_project(answers: any) {
  console.log(answers)
  fs.writeFileSync(
    path.join(
      answers.path,
      `tailwind.config.${answers.language === "TypeScript" ? "ts" : "js"}`
    ),
    `module.exports = {
    purge: [${
      answers.language === "JavaScript"
        ? "'./src/**/*.html, ./src/**/*.js, ./src/**/*.jsx'"
        : "'./src/**/*.html, ./src/**/*.js, ./src/**/*.jsx, ./src/**/*.ts, ./src/**/*.tsx'"
    }],
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
    path.join(
      answers.path,
      `postcss.config.${answers.language === "TypeScript" ? "ts" : "js"}`
    ),
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
}
