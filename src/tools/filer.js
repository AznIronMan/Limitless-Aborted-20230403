const fs = require('fs-extra');
const logger = require('./logger');
const log = (m, t) => {
	logger.writeLog(m, t);
};
const exec = require('child_process').exec;

const fileCheck = filepath => {
	try {
		if (fs.existsSync(filepath)) {
			return Boolean(true);
		} else {
			return Boolean(false);
		}
	} catch (err) {
		log(`[fileCheck] Args: ${filepath}`, 'd');
		log(`[fileCheck] ${err}`, 'e');
	}
};

const createTextFile = (filepath, filename, text) => {
	try {
		fs.outputFileSync(`${filepath}/${filename}`, text);
		return Boolean(true);
	} catch (err) {
		log(`[createTextFile] Args: ${filepath}-${filename}-${text}`, 'd');
		log(`[createTextFile] ${err}`, 'e');
		return Boolean(false);
	}
};

const createDir = path => {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
};

const runCmd = cmd => {
	return new Promise(resolve => {
		let result = '';
		const child = exec(`${cmd}`);
		child.stdout.on('data', function (data) {
			result += data.replace(/[\n\r]+/g, '');
		});
		return child.on('close', function () {
			resolve(result);
		});
	});
};

module.exports = {
	fileCheck,
	createTextFile,
	createDir,
	runCmd
};
