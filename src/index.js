const startup = require('./tools/startup');

async function main() {
	await startup.startupChecks();
}

main();
