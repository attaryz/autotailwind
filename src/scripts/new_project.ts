import fs from "fs"
import path from "path"

export function new_project(answers: any) {
  const dir = path.join(answers.path, answers.name)
  fs.mkdirSync(dir)
  fs.writeFileSync(path.join(dir, "index.html"), "")

  fs.writeFileSync(
    path.join(dir, "tailwind.config.js"),
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
    path.join(dir, "postcss.config.js"),
    `module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}`
  )
  fs.writeFileSync(
    path.join(dir, "package.json"),
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
  fs.writeFileSync(
    path.join(dir, "src", "tailwind.css"),
    `@tailwind base;
@tailwind components;
@tailwind utilities;`
  )
  fs.writeFileSync(path.join(dir, "src", "styles.css"), "")
}
