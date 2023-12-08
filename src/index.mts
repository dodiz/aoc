#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Command } from "commander";
import { group, select, confirm, text, intro } from "@clack/prompts";
import chalk from "chalk";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const program = new Command();
program.action(async () => {
  const years = (
    await fs.readdir(path.join(__dirname, "./"), {
      withFileTypes: true,
    })
  )
    .filter((file) => file.isDirectory())
    .map((dir) => ({
      name: dir.name,
      value: dir.name,
    }));

  const params = await group(
    {
      _: () =>
        intro(`${chalk.hex("#b9ffa7").bold("Dodiz")} advent of code solutions`),
      year: () => {
        return select({
          message: "Select a year",
          options: years,
          initialValue: "2023",
        });
      },
      challenge: async ({ results }) => {
        const challenges = (
          await fs.readdir(path.join(__dirname, "./" + results.year), {
            withFileTypes: true,
          })
        )
          .filter((file) => file.isDirectory())
          .sort((a, b) => +a.name - +b.name)
          .map((dir) => ({
            name: dir.name,
            value: dir.name,
          }));

        return select({
          message: "Select a challenge",
          options: challenges,
          initialValue: "1",
        });
      },
      watch: () => {
        return confirm({
          message: "Run it in watch mode? (Dev only)",
        });
      },
    },
    {
      onCancel() {
        process.exit(1);
      },
    }
  );
  const { challenge, year, watch } = params;
  const challengePath = path.join(__dirname, `./${year}/${challenge}/index.js`);
  await import(pathToFileURL(challengePath) as unknown as string);
});

program.parse(process.argv);
