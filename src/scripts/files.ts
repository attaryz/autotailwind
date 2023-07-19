import { exec } from "child_process"
import fs from "fs"
function createDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

function createFile(file: string) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "")
  }
}

function copyFile(file: string, newFile: string) {
  if (!fs.existsSync(newFile)) {
    fs.copyFileSync(file, newFile)
  }
}

function execute(command: string, callback: any) {
  exec(command, function (error, stdout, stderr) {
    callback(stdout)
  })
}

export { createDir, createFile, copyFile, execute }
