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

const createSL = (tar, src) => {
	fs.symlink(tar, src);
};

const runCmd = cmd => {
	return new Promise(resolve => {
		let result = '';
		const child = exec(`${cmd}`);
		child.stdout.on('data', function (data) {
			//result += data.replace(/[\n\r]+/g, '');
			result = data;
		});
		console.log(result);
		return child.on('close', function () {
			resolve(result);
		});
	});
};

const downloadFile = async (url, dest) => {
	return new Promise((resolve, reject) => {
		try {
			const http = require('http'); // or 'https' for https:// URLs
			const fs = require('fs');

			const file = fs.createWriteStream(dest);
			// eslint-disable-next-line no-unused-vars
			const request = http.get(url, function (response) {
				response.pipe(file);

				// after download completed close filestream
				file.on('finish', () => {
					file.close();
					resolve(Boolean(true));
				});
			});
		} catch (err) {
			log(`Error downloading from URL.  ${err}`, 'e');
			reject(Boolean(false));
		}
	});
};

module.exports = {
	fileCheck,
	createTextFile,
	createDir,
	createSL,
	runCmd,
	downloadFile
};
