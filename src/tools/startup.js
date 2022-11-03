/* eslint-disable no-unused-vars */
const squidInk = require('../tools/vault');
const db = require('../tools/db');
const filer = require('../tools/filer');
const magic = require('../tools/magic');
const dagger = magic.toLight(squidInk.magicWand[0], squidInk.magicWand[1]);
const os = require('./opsys');
const building = [
	`${magic.toLight(dagger, squidInk.theCastle[0])}`,
	`${magic.toLight(dagger, squidInk.theCastle[1])}`,
	`${magic.toLight(dagger, squidInk.theCastle[2])}${os.EOL}${magic.toLight(
		dagger,
		squidInk.theCastle[3]
	)}`
];
const process = require('node:process');
const logger = require('./logger');
const log = (m, t) => {
	logger.writeLog(m, t);
};
const error = emsg => {
	console.error(emsg);
};
const vault = require('./vault');

const startupChecks = async () => {
	if (vault.opSys === undefined) {
		error(`OS not detected, cannot continue.`);
		await logger.contPrompt('Press any key to exit.');
	}
	try {
		await filer.runCmd('npm install');
	} catch (err) {
		error(`NPM ERROR: could not run 'npm install'. `, err);
	}
	const nm = filer.fileCheck('./node_modules');
	if (!nm) {
		try {
			await filer.runCmd('npm install');
		} catch (err) {
			error(
				`FATAL ERROR: could not find or build ./node_modules.  ` +
					`Please run manually from root of Limitless folder. `,
				err
			);
			if (await logger.contPrompt('Press any key to exit.')) {
				process.exit(1);
			}
		}
	}
	let env = filer.fileCheck('./.env');
	if (!env) {
		env = await checkEnv(env);
	}
	const db = filer.fileCheck('./db');
	if (!db) {
		try {
			filer.createDir('./db');
		} catch (err) {
			error(
				`FATAL ERROR: could not find or create ./db.  Cannot continue. `,
				err
			);
			if (await logger.contPrompt('Press any key to exit.')) {
				process.exit(1);
			}
		}
	}
	env = filer.fileCheck('./.env');
	if (!env) {
		try {
			await buildEnv();
		} catch (err) {
			error(
				`FATAL ERROR: could not find or create .env file.  Cannot continue. `,
				err
			);
			if (await logger.contPrompt('Press any key to exit.')) {
				process.exit(1);
			}
		}
	}
	require('dotenv').config();
	const defdb = filer.fileCheck(`./db/${process.env.L_DATABASE}`);
	if (!defdb) {
		try {
			//TO DO: attempt to build/copy db - will throw error for now;
			throw error; //TO DO: delete this once build/copy db above is built
		} catch (err) {
			error(
				`FATAL ERROR: could not find or create default database file.  Cannot continue. `,
				err
			);
			if (await logger.contPrompt('Press any key to exit.')) {
				process.exit(1);
			}
		}
	}
	logger.createLog();
	log(`Operating System: ${await os.getOS()}`);
	log(`Env File: ${env}`);
	log(`Modules Folder: ${nm}`);
	log(`DB Folder: ${db}`);
	log(`Default DB: ${defdb}`);
	//console.log('Query Test', (await dbDel('dbInfo','dbName',`'testing'`)))
};

const checkEnv = async status => {
	if (!status) {
		log(`[checkEnv] Found .env: ${status}`, 'w');
		log(`[checkEnv] Building .env: ${await buildEnv()}`);
		return Boolean(true);
	} else {
		log(`[checkEnv] Found .env: ${status}`);
		return Boolean(false);
	}
};

const buildEnv = async () => {
	return filer.createTextFile(building[0], building[1], building[2]);
};

module.exports = {
	startupChecks
};
