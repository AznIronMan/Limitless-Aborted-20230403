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

const createLog = () => {
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
	const logger = log4js.getLogger();
	logger.info('Logfile Started...');
};

const writeLog = (message, type) => {
	if (type === undefined) {
		type = 'x';
	}

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

module.exports = { createLog, writeLog };
