const fs = require('fs-extra');
const ini = require('ini');
const os = require('os');
let linuxInfo;

const getOS = async () => {
	const opSys = os.platform();
	switch (opSys) {
		case 'linux': //linux
			linuxInfo = ini.parse(fs.readFileSync('/etc/os-release', 'utf-8'));
			return `${linuxInfo.NAME} ${linuxInfo.VERSION} ${
				linuxInfo.ID_LIKE
			} ${os.machine()}`;
		case 'windows': //windows
			return `${os.version()} ${os.release} ${os.machine()}`;
		case 'darwin':
			return `MacOS ${os.release()}`;
		default: //anything else
			return 'OS UNSUPPORTED';
	}
};

module.exports = { getOS };
