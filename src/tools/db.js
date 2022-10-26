const process = require('node:process');
const aasql = require('aa-sqlite');
const sql3 = require('sqlite3').verbose();
const defdb = `${process.env.L_DBFOLDER}${process.env.L_DATABASE}`;

const dbOpen = async db => {
	if (db == undefined || db == null) {
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
	if (misc != undefined) {
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
	if (misc != undefined) {
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
	if (misc != undefined) {
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
	if (misc != undefined) {
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
	console.log(answer);
	dbClose();
	return answer === 'Succeeded'; // returns a true or false boolean
};

const dbDel = async (tbl, tCol, tVal) => {
	dbOpen();
	let query = `DELETE FROM ${tbl} WHERE ${tCol} = ${tVal}`;
	console.log(query);
	const answer = (await aasql.push(query)).message;
	console.log(answer);
	return answer === 'Succeeded'; // returns a true or false boolean
};

module.exports = {
	dbGetVal,
	dbGetCol,
	dbGetRow,
	dbUpdate,
	dbAdd,
	dbDel
};
