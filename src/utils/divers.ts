import fs from "node:fs";

import { base, __dirname } from "../main.ts";

export function createFolder(parents: string[], name: string) {
  const parent = parents
    ? parents.map((str) => str.replace(/\s+$/, "")).join("/") + "/"
    : "";

  const folderPath = __dirname + "/" + base + "/" + parent + name;
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  return folderPath;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}