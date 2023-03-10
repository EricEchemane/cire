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
			const { model } = argv;

			if (!model) {
				console.log(chalk.redBright('⭕ You must provide a model name'));
				return;
			}

			console.log(chalk.bold(`=> Creating ${model} model...`));

			const currentDir = process.cwd();

			if (!fs.existsSync(currentDir + '/models')) {
				console.log(chalk.bold(`=> Creating models directory...`));
				fs.mkdirSync(currentDir + '/models');
			}

			fs.writeFile(
				currentDir + `/models/${model.toLowerCase()}.model.ts`,
				'import mongoose from "mongoose";\n\n',
				function (err) {
					if (err) throw err;
					console.log(chalk.greenBright(`=> ${model} model has been created`));
				}
			);

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
