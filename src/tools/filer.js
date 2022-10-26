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

module.exports = {
	fileCheck
};
