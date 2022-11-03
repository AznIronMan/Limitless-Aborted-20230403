const today = new Date();
const date = ('0' + today.getDate()).slice(-2);
const month = ('0' + (today.getMonth() + 1)).slice(-2);
const year = today.getFullYear();
const hours = today.getHours();
const minutes = today.getMinutes();
const seconds = today.getSeconds();
const justDate = `${year}${month}${date}`;
const fullDate = `${justDate}_${hours}${minutes}${seconds}`;
const filer = require('../tools/filer');
const log4js = require('log4js');
const vault = require('../tools/vault');
const process = require('process');
const os = require('os');

const createLog = () => {
	if (process.env.DEBUG) {
		log4js.configure({
			appenders: {
				out: {
					type: 'stdout',
					layout: { type: 'pattern', pattern: '[%d] [%p] %m' }
				}
			},
			categories: {
				default: { appenders: ['out'], level: 'info' }
			}
		});
	} else {
		vault.logFile = `${fullDate}.log`;
		filer.createDir(vault.logDir);
		log4js.configure({
			appenders: {
				dateFile: {
					type: 'dateFile',
					filename: `${vault.logDir}/${vault.logFile}`,
					compress: true,
					layout: { type: 'pattern', pattern: '[%d] [%p] %m' }
				}
			},
			categories: {
				default: { appenders: ['dateFile'], level: 'info' }
			}
		});
	}
	const logger = log4js.getLogger();
	if (process.env.DEBUG) {
		logger.warn('DEBUG MODE ON: No LOG FILE CREATED, STDOUT ONLY.');
	} else {
		logger.info('Logfile Started...');
	}
};

const writeLog = (message, type) => {
	if (type === undefined) {
		type = 'x';
	}
	if (process.env.DEBUG) {
		log4js.configure({
			appenders: {
				out: {
					type: 'stdout',
					layout: { type: 'pattern', pattern: '[%d] [%p] %m' }
				}
			},
			categories: {
				default: { appenders: ['out'], level: 'info' }
			}
		});
	} else {
		log4js.configure({
			appenders: {
				dateFile: {
					type: 'dateFile',
					filename: `${vault.logDir}/${vault.logFile}`,
					compress: true,
					layout: { type: 'pattern', pattern: '[%d] [%p] %m' }
				}
			},
			categories: {
				default: { appenders: ['dateFile'], level: 'info' }
			}
		});
	}
	const logger = log4js.getLogger();
	switch (type) {
		case 't':
			logger.level = 'trace';
			logger.trace(message);
			break;
		case 'd':
			logger.level = 'debug';
			logger.debug(message);
			break;
		case 'w':
			logger.level = 'warn';
			logger.warn(message);
			break;
		case 'e':
			logger.level = 'error';
			logger.error(message);
			break;
		case 'f':
			logger.level = 'fatal';
			logger.fatal(message);
			break;
		default:
			logger.level = 'info';
			logger.info(message);
			break;
	}
};

const waitforKey = async () => {
	process.stdin.setRawMode(true);
	return new Promise(resolve =>
		process.stdin.once('data', () => {
			process.stdin.setRawMode(false);
			resolve();
		})
	);
};

const contPrompt = async msg => {
	if (msg === undefined) {
		console.log(`${os.EOL}Press any key to continue.`);
		await waitforKey();
		return true;
	} else {
		console.log(`${os.EOL}${msg}`);
		await waitforKey();
		return true;
	}
};

module.exports = { createLog, writeLog, contPrompt };
