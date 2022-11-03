/* eslint-disable no-unused-vars */
const squidInk = require('../tools/vault');
const db = require('../tools/db');
const filer = require('../tools/filer');
const magic = require('../tools/magic');
const dagger = magic.toLight(squidInk.magicWand[0], squidInk.magicWand[1]);
const os = require('os');
const building = [
	`${magic.toLight(dagger, squidInk.theCastle[0])}`,
	`${magic.toLight(dagger, squidInk.theCastle[1])}`,
	`${magic.toLight(dagger, squidInk.theCastle[2])}${os.EOL}${magic.toLight(
		dagger,
		squidInk.theCastle[3]
	)}`
];
const process = require('node:process');
const buildLog = require('../tools/logger').createLog;
const log = require('../tools/logger').writeLog;

const startupChecks = async () => {
	buildLog();
	let env = filer.fileCheck('./.env');
	const nm = filer.fileCheck('./node_modules');
	const db = filer.fileCheck('./db');
	if (await checkEnv(env)) {
		env = filer.fileCheck('./.env');
	}
	require('dotenv').config();
	const defdb = filer.fileCheck(`./db/${process.env.L_DATABASE}`);
	log(`Env File: ${env}`);
	log(`Modules Folder: ${nm}`);
	log(`DB Folder: ${db}`);
	log(`Default DB: ${defdb}`);
	log(`Env Check #2: ${await buildEnv()}`);
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
