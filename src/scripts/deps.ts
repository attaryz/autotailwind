import { SupportedFrameworks } from "@/types"

type FrameworksMeta = {
  [key in SupportedFrameworks]: {
    dependencies: string[]
    devDependencies: string[]
    files: {
      files: string[]
      path: string
    }
    config?: {
      content?: string[]
    }
  }
}

const commonDevDependencies = ["tailwindcss", "autoprefixer", "postcss"]

export const frameworksMeta: FrameworksMeta = {
  react: {
    dependencies: [],
    devDependencies: commonDevDependencies,
    files: {
      files: ["tailwind.config.js", "postcss.config.js"],
      path: "",
    },
    config: {
      content: [".html", ".{js,jsx,ts,tsx}"],
    },
  },
  next: {
    dependencies: [],
    devDependencies: commonDevDependencies,
    files: {
      files: ["tailwind.config.js", "postcss.config.js"],
      path: "",
    },
    config: {
      content: [".html", ".{js,jsx,ts,tsx}"],
    },
  },
  vue: {
    dependencies: [],
    devDependencies: commonDevDependencies,
    files: {
      files: ["tailwind.config.js", "postcss.config.js"],
      path: "",
    },
    config: {
      content: [".html", ".{vue,js,jsx,ts,tsx}"],
    },
  },
}
