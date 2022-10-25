const {
    fileCheck
} = require('../tools/filer')

const startupChecks = async () => {
    const env = fileCheck('./.env')
    const nm = fileCheck('./node_modules')
    console.log('Env:',env)
    console.log('Modules',nm)
}

exports.startupChecks = startupChecks