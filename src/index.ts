#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { Command } from "commander";
import chokidar from "chokidar";

async function executeChallenge(challengePath: string) {
	const { Chalk } = await import("chalk");
	const chalk = new Chalk();
	try {
		const startTime = Date.now();
		const run = await require(challengePath);
		await run.default();
		const executionTime = new Date(Date.now() - startTime);
		delete require.cache[require.resolve(challengePath)];
		console.log(
			`\n${chalk.hex("#a0f977")("Execution time:")} ${chalk
				.hex("#a0f977")
				.bold(executionTime.getMilliseconds() + "ms")}`,
		);
	} catch (e) {
		console.error(e);
	}
}

const program = new Command();
program
	.option("-w, --watch", "run in watch mode")
	.option("-t, --test", "Run test input");
program.action(async () => {
	const { group, select, intro } = await import("@clack/prompts");
	const { Chalk } = await import("chalk");
	const chalk = new Chalk();

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
		},
		{
			onCancel() {
				process.exit(1);
			},
		},
	);
	const { challenge, year } = params;
	const watchFlag = (program.opts().watch as boolean) ?? false;
	const challengeFolder = path.join(__dirname, `./${year}/${challenge}`);
	const challengeFile = path.join(challengeFolder, "index.js");
	const challengeInput = path.join(challengeFolder, "input.js");
	if (watchFlag) {
		chokidar.watch(challengeFile).on("all", async () => {
			await executeChallenge(challengeFile);
			console.log(
				`\n${chalk.hex("#fff977")("Waiting for changes to the file ...")}`,
			);
		});
		chokidar.watch(challengeInput).on("change", async () => {
			await executeChallenge(challengeFile);
			console.log(
				`\n${chalk.hex("#fff977")("Waiting for changes to the file ...")}`,
			);
		});
	} else {
		executeChallenge(challengeFile);
	}
});

program.parse(process.argv);
