const squidInk = require('../tools/vault');
const data = require('../tools/db');
const filer = require('../tools/filer');
const magic = require('../tools/magic');
const dagger = magic.toLight(squidInk.magicWand[2], squidInk.magicWand[3]);
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
const tbox = require('./toolbox');

const vault = require('./vault');
const envF = vault.envFile.replace('./', '');
const pressanyKey = `There was an error, please check the logs.  Press any key to exit.`;

const startupChecks = async () => {
	//debug check
	vault.debug = filer.fileCheck(magic.toLight(dagger, squidInk.magicWand[1]));
	//start logger
	logger.createLog();
	//os check
	log(`Operating System: ${await os.getOS()}`);
	if (vault.opSys === undefined) {
		log(`OS not detected, cannot continue.`, 'f');
		errorExit();
	}
	//node modules check
	try {
		await filer.runCmd('npm install');
	} catch (err) {
		log(`NPM ERROR: could not run 'npm install'. ${err}`, 'f');
	}
	const nm = filer.fileCheck(vault.nmDir);
	if (!nm) {
		try {
			await filer.runCmd('npm install');
		} catch (err) {
			log(
				`FATAL ERROR: could not find or build ${vault.nmDir}.  ` +
					`Please run manually from root of Limitless folder. ` +
					`${err}`,
				'f'
			);
			errorExit();
		}
	}
	log(`Modules Folder: ${nm}`);
	//env detect
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
			errorExit();
		}
	}
	env = filer.fileCheck(vault.envFile);
	log(`Env File: ${env}`);
	//database check
	require('dotenv').config();
	let db = filer.fileCheck(vault.dbDir);
	if (!db) {
		db = await buildDir(vault.dbDir);
	}
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
			log(
				`FATAL ERROR: could not find or create default database file.  ` +
					`Cannot continue. ${err}`,
				'f'
			);
			errorExit();
		}
		db = true;
		defdb = true;
	}
	log(`DB Folder: ${db}`);
	log(`Default DB: ${defdb}`);
	//database version check
	await dbVerCheck();
	//game folders check
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
		log(
			`FATAL ERROR: could not find or create ${dir}.  Cannot continue.  ${err}`,
			'f'
		);
		errorExit();
	}
};

const buildEnv = async () => {
	log(`Missing ${envF}: ${true}`, 'w');
	log(`Creating Fresh ${envF} file.`);
	return filer.createTextFile(building[0], building[1], building[2]);
};

const dbVerCheck = async () => {
	const sDB = await data.dbGetVal(
		'dbVersion',
		'dbInfo',
		'dbName',
		tbox.cap1st(process.env.L_DATABASE.replace(vault.saveExt, ''))
	);
	const tDB = await data.cloudStare();
	log(`Loaded DB '${process.env.L_DATABASE}' Version: ${sDB}`);
	log(`Cloud DB Current Version: ${tDB}`);
	const response = tbox.verCompare(tDB, sDB, process.env.L_DATABASE);
	if (response[3] === 'f') errorExit();
	log(response[0], response[3]);
	if (response[1].length > 1) log(response[1], response[3]);
	if (response[2].length > 1) log(response[2], response[3]);
};

const errorExit = async () => {
	if (await logger.contPrompt(pressanyKey)) {
		process.exit(1);
	} else {
		process.exit(1);
	}
};

module.exports = {
	startupChecks
};
