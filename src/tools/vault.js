const magicWand = ['TryAgainDearie', 'DgLYSQq6iolSWAfjgR8R4wgbbY5zy6XE'];
const theCastle = [
	'h3rvTyor0KM=',
	'wabilBZBsos=',
	'TlhPi1fEIcwrRlyfgP13Y15OFjFyo3Fp',
	'/zq+l9v8VyRrLcu8Q7mujBSQkiR+uWtXj3YXeYmVdZE='
];
const skysTheLimit = [
	'6cHRFOq44HEGdWnE+s7tDm4CwSMWhZyWudX7/k4+15w=',
	'qDZtkq9kAnipgVScFKcd3AuWIXhLJfmO',
	'6cHRFOq44HFJSUVNWFDg7yjXkM1WVU+o',
	'D7w8XHQXUjT4LHsbDQplimYeEuJ6xDQf'
];

const logDir = './logs';
const opSys = require('os').platform;

module.exports = {
	magicWand,
	theCastle,
	skysTheLimit,
	logFile: 'default',
	opSys,
	logDir
};
