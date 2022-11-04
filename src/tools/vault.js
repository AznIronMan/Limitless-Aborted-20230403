//limitless info
const magicWand = [
	'WhatchaGonnaDo',
	'ZhsQ9BJBpRblCgrV1WKIuA==',
	'TryAgainDearie',
	'DgLYSQq6iolSWAfjgR8R4wgbbY5zy6XE'
];
const theCastle = [
	'h3rvTyor0KM=',
	'wabilBZBsos=',
	'96cny1FMPKvq6omL5vFiyk8Xx8NjZT1r',
	'/zq+l9v8VyRrLcu8Q7mujBSQkiR+uWtXj3YXeYmVdZE='
];
const skysTheLimit = [
	'6cHRFOq44HEGdWnE+s7tDm4CwSMWhZyWudX7/k4+15w=',
	'qDZtkq9kAnipgVScFKcd3AuWIXhLJfmO',
	'6cHRFOq44HFJSUVNWFDg7yjXkM1WVU+o',
	'D7w8XHQXUjT4LHsbDQplimYeEuJ6xDQf'
];

//environmental variables
const opSys = require('os').platform;
const envFile = './.env';
const nmDir = './node_modules';

//game folders
const avaDir = './avatars';
const dbDir = './data';
const logDir = './logs';
const mscDir = './music';
const savDir = './saves';
const sndDir = './sound';

module.exports = {
	magicWand,
	theCastle,
	skysTheLimit,
	logFile: 'default',
	debug: false,
	opSys,
	envFile,
	avaDir,
	dbDir,
	logDir,
	mscDir,
	nmDir,
	savDir,
	sndDir
};
