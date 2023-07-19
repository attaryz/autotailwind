import { SupportedFrameworks } from "@/types"
import { exec } from "child_process"
import fs, { appendFile } from "fs"
import { frameworksMeta } from "./deps.js"

function createDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

function createFile(file: string, content?: string) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content || "")
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

// check if files exists or not
// if not create them
// if yes add the content to top of the file

function createOrAdd(file: string, content: string) {
  const currentDir = process.cwd()
  const filePath = currentDir + "/" + file

  if (!fs.existsSync(filePath)) {
    createFile(filePath, content)
  } else {
    const data = fs.readFileSync(filePath, "utf8")
    if (!data.includes(content)) {
      fs.writeFileSync(filePath, content + data)
    }
  }
}

function writeFileSyncRecursive(
  file: string,
  content: string,
  charset: string
) {
  // -- normalize path separator to '/' instead of path.sep,
  // -- as / works in node for Windows as well, and mixed \\ and / can appear in the path
  let filepath = file.replace(/\\/g, "/")

  // -- preparation to allow absolute paths as well
  let root = ""
  if (filepath[0] === "/") {
    root = "/"
    filepath = filepath.slice(1)
  } else if (filepath[1] === ":") {
    root = filepath.slice(0, 3) // c:\
    filepath = filepath.slice(3)
  }

  // -- create folders all the way down
  const folders = filepath.split("/").slice(0, -1) // remove last item, file
  folders.reduce(
    (acc, folder) => {
      const folderPath = acc + folder + "/"
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath)
      }
      return folderPath
    },
    root // first 'acc', important
  )

  // add content to the top of the file
  const writeContent = () => {
    appendFile(file, content, (err) => {
      if (err) throw err
    })
  }

  // -- write file
  writeContent()
}

interface TailwindConfig {
  projectFolder: string
  lang: string
  framework: SupportedFrameworks
  variants: string[]
  plugins: string[]
}

const createTailwindConfig = (config: TailwindConfig) => {
  createFile(
    "tailwind.config.js",
    `module.exports = {
  content: ["${
    frameworksMeta[config.framework].config?.content?.map((c) =>
      config.projectFolder === "."
        ? "" + config.projectFolder + "/**/*" + c
        : "." + config.projectFolder + "/**/*" + c
    ) || ""
  }"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [${config.plugins}],
}`
  )
}

const createCss = (framework: SupportedFrameworks, path: string) => {
  const cssFileContent = `@tailwind base;
@tailwind components;
@tailwind utilities;`

  framework === "react" && createFile(path + "/styles.css", cssFileContent)
  framework === "next" && createFile(path + "/globals.css", cssFileContent)
  framework === "vue" &&
    writeFileSyncRecursive(path + "/assets/main.css", cssFileContent, "utf8")
}

export {
  createDir,
  createFile,
  copyFile,
  execute,
  createTailwindConfig,
  createCss,
}
