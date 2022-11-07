const fs = require('fs-extra');
const ini = require('ini');
const os = require('os');
let linuxInfo;

const getOS = async () => {
	const opSys = os.platform();
	let osname;
	const systems = {
		linux: async () => {
			linuxInfo = ini.parse(fs.readFileSync('/etc/os-release', 'utf-8'));
			osname = `${linuxInfo.NAME} ${linuxInfo.VERSION} ${
				linuxInfo.ID_LIKE
			} ${os.machine()}`;
		},
		win32: async () => {
			osname = `${os.version()} ${os.release} ${os.machine()}`;
		},
		darwin: async () => {
			osname = `MacOS ${os.release()}`;
		},
		x: async () => {
			osname = 'OS UNSUPPORTED';
		}
	};
	(systems[opSys] || systems['x'])();

	return osname;
};

module.exports = { getOS };
