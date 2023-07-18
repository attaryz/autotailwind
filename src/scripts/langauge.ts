#! /usr/bin/env node

export default function language_detection(answers: any) {
  if (answers.language === "TypeScript") {
    return "ts"
  } else if (answers.language === "JavaScript") {
    return "js"
  } else {
    return "ts"
  }
}
