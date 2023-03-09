#!/usr/bin/env node

import chalk from 'chalk';
import boxen from 'boxen';
import yargs from 'yargs';

const welcome = chalk.bold(
	'WELCOME to CIRE\n\nCIRE is a tool for generating model and CRUD api routes in NextJs with mongoose and react-query'
);
const welcomeBox = boxen(welcome, {
	textAlignment: 'center',
	padding: 1,
	margin: 1,
	float: 'center',
});

console.log(welcomeBox);
