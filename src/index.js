const { startupChecks } = require('./tools/startup')

async function main () {
    await startupChecks();
}

main();