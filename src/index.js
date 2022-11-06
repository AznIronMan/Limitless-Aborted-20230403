const startup = require('./tools/startup');

async function main() {
	await startup.startupChecks();
	await launcher();
}

const launcher = async () => {
	const logger = require('./tools/logger');
	const process = require('process');
	const log = (m, t) => {
		logger.writeLog(m, t);
	};
	const ex = require('express');
	const app = ex();
	const http = require('http');
	const launcher = http.createServer(app);
	try {
		app.get('/', (req, res) => {
			// eslint-disable-next-line no-undef
			res.sendFile(__dirname + '/ui/index.html');
		});
		launcher.listen(9999, () => {
			log(`Started Limitless Server: ${Boolean(true)}`);
		});
	} catch (err) {
		log(`Failed to start Limitless Server.  ${err}`, 'f');
		process.exit(1);
	}
};

main();
