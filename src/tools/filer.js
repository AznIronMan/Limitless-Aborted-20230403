const fs = require('fs-extra');

const fileCheck = filepath => {
	try {
		if (fs.existsSync(filepath)) {
			return Boolean(true);
		} else {
			return Boolean(false);
		}
	} catch (err) {
		console.error(err);
	}
};

const createTextFile = (filepath, filename, text) => {
	try {
		fs.outputFileSync(`${filepath}/${filename}`, text);
		return Boolean(true);
	} catch (err) {
		console.error(err);
		return Boolean(false);
	}
};

module.exports = {
	fileCheck,
	createTextFile
};
