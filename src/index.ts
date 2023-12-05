#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const program = new Command();

program.action(async () => {
  console.log("Select a year:");
  //print available years
  fs.readdirSync(path.join(__dirname, "./"), {
    withFileTypes: true,
  })
    .filter((file) => file.isDirectory())
    .forEach((dir) => {
      console.log(dir.name);
    });
  //ask for year to input:
});

program.parse(process.argv);
