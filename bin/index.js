#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
	.scriptName('cire')
	.usage('$0 <cmd> [args]')
	.command(
		'model [model_name]',
		'Creates a mongoose model',
		(yargs) => {
			yargs.positional('model_name', {
				type: 'string',
				describe: 'the name of the mongoose model',
			});
		},
		function (argv) {
			if (!argv.model_name) {
				console.log(chalk.red('You must provide a model name'));
				return;
			}
			console.log(`You want to create a model called ${argv.model_name}`);
		}
	)
	.help().argv;
