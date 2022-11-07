//limitless info
const magicWand = [
	'WhatchaGonnaDo', //0
	'ZhsQ9BJBpRblCgrV1WKIuA==', //1
	'TryAgainDearie', //2
	'DgLYSQq6iolSWAfjgR8R4wgbbY5zy6XE', //3
	'AlphabetSoup', //4
	'5peSwHD8jdr9lJm0A7p4og==', //5
	'sQJCga5zgiVWgE0HAlH7BWmsVKT68Gvt5xfaTZfzpVg=', //6
	'sQJCga5zgiVWgE0HAlH7BWDgq0U6J3ZkQgyFx1LRL0c=' //7
];
const theCastle = [
	'h3rvTyor0KM=',
	'wabilBZBsos=',
	'96cny1FMPKvq6omL5vFiyk8Xx8NjZT1r',
	'/zq+l9v8VyRrLcu8Q7mujBSQkiR+uWtXj3YXeYmVdZE='
];
const skysTheLimit = [
	'6cHRFOq44HEGdWnE+s7tDm4CwSMWhZyWudX7/k4+15w=', //0
	'qDZtkq9kAnipgVScFKcd3AuWIXhLJfmO', //1
	'6cHRFOq44HFJSUVNWFDg7yjXkM1WVU+o', //2
	'D7w8XHQXUjT4LHsbDQplimYeEuJ6xDQf', //3
	`2AsuAKlO9vlTNDpUiY2KOrjUdtDDBWT4GJhXp5O32n3HK9S`, //4
	`CNANb7U6Qwq2ik43IKIDt6Arj7vgBmnvtnSiMIg==`, //5
	`j+du0ipIEGw=`, //6
	`mGBQtz71DKgcPUImX0jqNmFiIlYkucriAHW0vvG/x3l6SfT` +
		`36DxfnpZ2Y7OVB5q4Ho3WOB9WBNGACxzw6V8kZQ==`, //7
	`BIod8fil+ak=`, //8
	`IsQdLSUv6Dc=` //9
];

//environmental variables
const opSys = require('os').platform;
const envFile = './.env';
const nmDir = './node_modules';
const saveExt = '.limit';

//game folders
const folderNames = [
	`/avatars`,
	`/data`,
	`/logs`,
	`/music`,
	`/saves`,
	`/sound`
];

module.exports = {
	magicWand,
	theCastle,
	skysTheLimit,
	logFile: 'default',
	debug: false,
	opSys,
	envFile,
	homeDir: './.gamefiles',
	avaDir: './.gamefiles/avatars',
	dbDir: './.gamefiles/data',
	logDir: './.gamefiles/logs',
	mscDir: './.gamefiles/music',
	nmDir,
	savDir: './.gamefiles/saves',
	sndDir: './.gamefiles/sound',
	saveExt,
	folderNames
};
