const os = require('os');
const squidInk = require('./vault');
const data = require('./db');
const filer = require('./filer');
const magic = require('./magic');
const dagger = magic.toLight(squidInk.magicWand[2], squidInk.magicWand[3]);
const opsys = require('./opsys');
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
	try {
		await filer.runCmd('npm install');
	} catch (err) {
		console.error(`FATAL ERROR when running 'npm install': `, err);
	}
	//debug check
	vault.debug = filer.fileCheck(magic.toLight(dagger, squidInk.magicWand[1]));
	//home folder check
	await getFolders();
	//start logger
	logger.createLog();
	//os check
	log(`Operating System: ${await opsys.getOS()}`);
	if (vault.opSys === undefined) {
		log(`OS not detected, cannot continue.`, 'f');
		errorExit();
	}
	//google api variable check
	const abcAPI = await checkABCAPI();
	if (abcAPI !== 'OK') {
		log(`ABC API Check Error:  ${abcAPI}`, 'w');
		log(`May get warnings on client launch.`, 'w');
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
	//gamedir log
	log(`Gamefiles Location: ${vault.homeDir}`);
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

const getFolders = async () => {
	try {
		vault.homeDir = `${os.homedir()}/Limitless`;
		if (vault.debug) throw 'debug';
		if (os.platform() === 'win32')
			vault.homeDir = `${os.homedir()}/Documents/Limitless`;
		if (os.homedir() === '/var/root') throw 'root';
		filer.createDir(vault.homeDir);
	} catch {
		const local = './.gamefiles';
		if (!filer.fileCheck(local)) {
			filer.createDir(local);
		}
		vault.homeDir = local;
	}
	vault.avaDir = `${vault.homeDir}${vault.folderNames[0]}`;
	vault.dbDir = `${vault.homeDir}${vault.folderNames[1]}`;
	vault.logDir = `${vault.homeDir}${vault.folderNames[2]}`;
	vault.mscDir = `${vault.homeDir}${vault.folderNames[3]}`;
	vault.savDir = `${vault.homeDir}${vault.folderNames[4]}`;
	vault.sndDir = `${vault.homeDir}${vault.folderNames[5]}`;
};

const checkABCAPI = async () => {
	const machineOS = os.platform();
	const abc = [
		magic.toLight(dagger, squidInk.magicWand[5]),
		magic.toLight(dagger, squidInk.magicWand[6]),
		magic.toLight(dagger, squidInk.magicWand[7])
	];
	let key, id, sec;
	try {
		switch (machineOS) {
			case 'linux':
				key = [
					`set | grep ${abc[0]}}`,
					`${abc[0]}=no`,
					`export ${abc[0]}="no"`
				];
				id = [
					`set | grep ${abc[1]}}`,
					`${abc[1]}=no`,
					`export ${abc[1]}="no"`
				];
				sec = [
					`set | grep ${abc[2]}}`,
					`${abc[2]}=no`,
					`export ${abc[2]}="no"`
				];
				break;
			case 'win32':
				key = [`echo %${abc[0]}%`, 'no', `setx ${abc[0]}="no"`];
				id = [`echo %${abc[1]}%`, 'no', `setx ${abc[1]}="no"`];
				sec = [`echo %${abc[2]}%`, 'no', `setx ${abc[2]}="no"`];
				break;
			case 'darwin':
				key = [
					`set | grep ${abc[0]}}`,
					`${abc[0]}=no`,
					`export ${abc[0]}="no"`
				];
				id = [
					`set | grep ${abc[1]}}`,
					`${abc[1]}=no`,
					`export ${abc[1]}="no"`
				];
				sec = [
					`set | grep ${abc[2]}}`,
					`${abc[2]}=no`,
					`export ${abc[2]}="no"`
				];
				break;
		}
		if ((await filer.runCmd(key[0])) === key[1]) {
			await filer.runCmd(key[2]);
		}
		if ((await filer.runCmd(id[0])) === key[1]) {
			await filer.runCmd(id[2]);
		}
		if ((await filer.runCmd(sec[0])) === key[1]) {
			await filer.runCmd(sec[2]);
		}
		return 'OK';
	} catch (err) {
		return err;
	}
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
