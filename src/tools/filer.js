const fs = require('fs-extra');
const logger = require('./logger');
const log = (m, t) => {
	logger.writeLog(m, t);
};

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

module.exports = {
	fileCheck,
	createTextFile,
	createDir
};
