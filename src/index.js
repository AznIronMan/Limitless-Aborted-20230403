const startup = require('./js/startup');
const process = require('process');

async function main() {
	await startup.startupChecks();
	await serverLaunch();
	await clientLaunch();
}

const serverLaunch = async () => {
	const logger = require('./js/logger');
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
			res.sendFile(__dirname + '/ui/index.html'); //placeholder for now
		});
		launcher.listen(9999, () => {
			log(`Started Limitless Server: ${Boolean(true)}`);
		});
	} catch (err) {
		log(`Failed to start Limitless Server.  ${err}`, 'f');
		process.exit(1);
	}
};

const clientLaunch = async () => {
	const proc = require('child_process');
	const logger = require('./js/logger');
	const log = (m, t) => {
		logger.writeLog(m, t);
	};
	const web = require('chromium');
	const sz = require('screenz');
	const w = sz.width / 2 - 640;
	const h = sz.height / 2 - 400;
	proc.execFile(
		web.path,
		[
			'--window-size=1280,800',
			`--window-position=${w},${h}`,
			'--incognito',
			'--app=http://localhost:9999'
		],
		(error, stdout) => {
			if (error) {
				log(
					`Something went wrong with the Limitless Client.  ${error}`,
					"f'"
				);
				log(`Forced shutdown of client and server!`, 'f');
				process.exit(1);
			}
			log(`Limitless Client Closed: ${Boolean(true)} ${stdout}`);
			log(`Shutting down Limitless Server:  ${Boolean(true)}`);
			process.exit(0);
		}
	);
};

main();
