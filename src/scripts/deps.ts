import { SupportedFrameworks } from "@/types"

type FrameworksMeta = {
  [key in SupportedFrameworks]: {
    dependencies: string[]
    devDependencies: string[]
    files: string[]
  }
}

const commonDevDependencies = ["tailwindcss", "autoprefixer", "postcss"]

export const frameworksMeta: Omit<FrameworksMeta, "none"> = {
  react: {
    dependencies: [],
    devDependencies: commonDevDependencies,
    files: ["tailwind.config.js", "postcss.config.js"],
  },
  next: {
    dependencies: [],
    devDependencies: commonDevDependencies,
    files: ["tailwind.config.js", "postcss.config.js"],
  },
  angular: {
    dependencies: [],
    devDependencies: [],
    files: ["tailwind.config.js", "postcss.config.js"],
  },
  nuxt: {
    dependencies: [],
    devDependencies: [],
    files: [],
  },
  svelte: {
    dependencies: [],
    devDependencies: [],
    files: [],
  },
  vue: {
    dependencies: [],
    devDependencies: [],
    files: [],
  },
}
