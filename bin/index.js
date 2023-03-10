#!/usr/bin/env node

import chalk from 'chalk';
import yargs from 'yargs';
import fs from 'fs';
import { hideBin } from 'yargs/helpers';
import { welcomeMessage } from './src/index.js';

yargs(hideBin(process.argv))
	.scriptName('cire')
	.usage('$0 <cmd> [args]')
	.alias('r', 'routes')
	.describe(
		'r',
		'Generates the routes for the given model inside the /api folder'
	)
	.alias('q', 'queries')
	.describe(
		'q',
		'Generates the react-query hooks for the given model inside the queries folder'
	)
	.command(
		'$0',
		'The default command',
		() => {},
		() => {
			console.log(welcomeMessage);
		}
	)
	.alias('v', 'version')
	.alias('h', 'help')
	.command(
		'model [model]',
		'Creates a mongoose model',
		(yargs) => {
			yargs.positional('model', {
				type: 'string',
				describe: 'the name of the mongoose model',
			});
		},
		function (argv) {
			let { model } = argv;

			if (!model) {
				console.log(chalk.redBright('⭕ You must provide a model name'));
				return;
			}

			model = model.charAt(0).toUpperCase() + model.slice(1);

			console.log(chalk.bold(`=> Creating ${model} model...`));

			const currentDir = process.cwd();

			if (!fs.existsSync(currentDir + '/models')) {
				console.log(chalk.bold(`=> Creating models directory...`));
				fs.mkdirSync(currentDir + '/models');
			}

			const sourceFilePath = currentDir + '/bin/templates/temp.model.ts';
			const destinationFilePath =
				currentDir + `/models/${model.toLowerCase()}.model.ts`;

			fs.readFile(sourceFilePath, 'utf8', (err, data) => {
				if (err) throw err;

				// Replace all occurrences of the word 'foo' with 'bar' in the data
				const replacedData = data.replace(/temp/g, model);

				// Write the replaced data to the destination file
				fs.writeFile(destinationFilePath, replacedData, (err) => {
					if (err) throw err;
					console.log(chalk.greenBright(`=> ${model} model has been created`));
				});
			});

			if (argv.r) {
				// Generate routes
				console.log(chalk.bold(`=> Creating ${model} routes...`));
			}
			if (argv.q) {
				// Generate react-query hooks
				console.log(chalk.bold(`=> Creating ${model} react-query hooks...`));
			}
		}
	)
	.help().argv;
