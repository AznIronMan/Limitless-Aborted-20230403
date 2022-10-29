const { fileCheck, createTextFile } = require('../tools/filer');
const {
	// eslint-disable-next-line no-unused-vars
	dbGetCol,
	// eslint-disable-next-line no-unused-vars
	dbGetRow,
	// eslint-disable-next-line no-unused-vars
	dbGetVal,
	// eslint-disable-next-line no-unused-vars
	dbUpdate,
	// eslint-disable-next-line no-unused-vars
	dbAdd,
	// eslint-disable-next-line no-unused-vars
	dbDel
} = require('../tools/db');
//const os = require('os');

const startupChecks = async () => {
	let env = fileCheck('./.env');
	const nm = fileCheck('./node_modules');
	const db = fileCheck('./db');
	if (await checkEnv(env)) {
		env = fileCheck('./.env');
	}
	require('dotenv').config();
	// eslint-disable-next-line no-undef
	const defdb = fileCheck(`./db/${process.env.L_DATABASE}`);
	console.log('Env:', env);
	console.log('Modules', nm);
	console.log('DB Folder', db);
	console.log('Default DB', defdb);
	console.log(await buildEnv());
	//console.log('Query Test', (await dbDel('dbInfo','dbName',`'testing'`)))
};

const checkEnv = async status => {
	if (!status) {
		console.log('Found .env: ', status);
		console.log(`Building .env:`, await buildEnv());
		return Boolean(true);
	} else {
		console.log('Found .env: ', status);
		return Boolean(false);
	}
};

const buildEnv = async () => {
	return createTextFile(
		'./',
		'.env',
		`L_DBFOLDER="./db/"\nL_DATABASE="default.limit"`
	);
};

module.exports = {
	startupChecks
};
