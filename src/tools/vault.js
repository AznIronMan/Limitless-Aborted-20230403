const process = require('process');
const magicWand = ['TryAgainDearie', 'DgLYSQq6iolSWAfjgR8R4wgbbY5zy6XE'];
const theCastle = [
	'h3rvTyor0KM=',
	'wabilBZBsos=',
	'TlhPi1fEIcwrRlyfgP13Y15OFjFyo3Fp',
	'/zq+l9v8VyRrLcu8Q7mujBSQkiR+uWtXj3YXeYmVdZE='
];
const logDir = './logs';
const opSys = process.platform();

module.exports = {
	magicWand,
	theCastle,
	logFile: 'default',
	opSys,
	logDir
};