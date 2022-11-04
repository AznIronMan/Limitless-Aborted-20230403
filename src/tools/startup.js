const squidInk = require('../tools/vault');
const data = require('../tools/db');
const filer = require('../tools/filer');
const magic = require('../tools/magic');
const dagger = magic.toLight(squidInk.magicWand[0], squidInk.magicWand[1]);
const os = require('./opsys');
const building = [
	`${magic.toLight(dagger, squidInk.theCastle[0])}`,
	`${magic.toLight(dagger, squidInk.theCastle[1])}`,
	`${magic.toLight(dagger, squidInk.theCastle[2]).replace('.', ' ')}` +
		`\n${magic.toLight(dagger, squidInk.theCastle[3])}`
];
const process = require('process');
const logger = require('./logger');
const log = (m, t) => {
	logger.writeLog(m, t);
};
const error = emsg => {
	console.error(emsg);
};
const vault = require('./vault');
const envF = vault.envFile.replace('./', '');
const pressanyKey = `Press any key to exit.`;

const startupChecks = async () => {
	if (vault.opSys === undefined) {
		error(`OS not detected, cannot continue.`);
		await logger.contPrompt(pressanyKey);
	}
	try {
		await filer.runCmd('npm install');
	} catch (err) {
		error(`NPM ERROR: could not run 'npm install'. `, err);
	}
	const nm = filer.fileCheck(vault.nmDir);
	if (!nm) {
		try {
			await filer.runCmd('npm install');
		} catch (err) {
			error(
				`FATAL ERROR: could not find or build ${vault.nmDir}.  ` +
					`Please run manually from root of Limitless folder. `,
				err
			);
			if (await logger.contPrompt(pressanyKey)) {
				process.exit(1);
			}
		}
	}
	logger.createLog();
	log(`Operating System: ${await os.getOS()}`);
	let env = filer.fileCheck(vault.envFile);
	if (!env) {
		try {
			await buildEnv();
			env = true;
		} catch (err) {
			log(
				`Could not find or create ${envF} file.  Cannot continue. ${err}`,
				'f'
			);
			if (await logger.contPrompt(pressanyKey)) {
				process.exit(1);
			}
		}
	}
	env = filer.fileCheck(vault.envFile);
	require('dotenv').config();
	let db = filer.fileCheck(vault.dbDir);
	if (!db) {
		db = await buildDir(vault.dbDir);
	}
	log(`Env File: ${env}`);
	log(`Modules Folder: ${nm}`);
	const fulldbpath = `${vault.dbDir}/${process.env.L_DATABASE}`;
	let defdb = filer.fileCheck(fulldbpath);
	if (!defdb) {
		try {
			const dbURL = await data.flyHigh();
			log(
				`Download Default DB: ${await filer.downloadFile(
					dbURL,
					fulldbpath
				)}`
			);
		} catch (err) {
			error(
				`FATAL ERROR: could not find or create default database file.  Cannot continue. `,
				err
			);
			if (await logger.contPrompt(pressanyKey)) {
				process.exit(1);
			}
		}
		db = true;
		defdb = true;
	}
	log(`DB Folder: ${db}`);
	log(`Default DB: ${defdb}`);
	let sav = filer.fileCheck(vault.savDir);
	if (!sav) {
		sav = await buildDir(vault.savDir);
	}
	let ava = filer.fileCheck(vault.avaDir);
	if (!ava) {
		ava = await buildDir(vault.avaDir);
	}
	let msc = filer.fileCheck(vault.mscDir);
	if (!msc) {
		msc = await buildDir(vault.mscDir);
	}
	let snd = filer.fileCheck(vault.sndDir);
	if (!snd) {
		snd = await buildDir(vault.sndDir);
	}
	log(`Saves Folder: ${sav}`);
	log(`Avatar Folder: ${ava}`);
	log(`Music Folder: ${msc}`);
	log(`Sound Folder: ${snd}`);
};

const buildDir = async dir => {
	try {
		filer.createDir(dir);
		return Boolean(true);
	} catch (err) {
		error(
			`FATAL ERROR: could not find or create ${dir}.  Cannot continue. `,
			err
		);
		if (await logger.contPrompt(pressanyKey)) {
			process.exit(1);
		}
	}
};

const buildEnv = async () => {
	log(`Missing ${envF}: ${true}`, 'w');
	log(`Creating Fresh ${envF} file.`);
	return filer.createTextFile(building[0], building[1], building[2]);
};

module.exports = {
	startupChecks
};
