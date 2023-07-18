#! /usr/bin/env node

import fs from "fs"
import path from "path"
export default function remove_from_project(answers: any) {
  fs.unlinkSync(path.join(answers.path, "tailwind.config.js"))
  fs.unlinkSync(path.join(answers.path, "postcss.config.js"))
  fs.unlinkSync(path.join(answers.path, "src", "tailwind.css"))
  fs.unlinkSync(path.join(answers.path, "src", "styles.css"))
  fs.unlinkSync(path.join(answers.path, "package.json"))
}
