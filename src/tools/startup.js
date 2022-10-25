const {
    fileCheck
} = require('../tools/filer')

const startupChecks = async () => {
    const env = fileCheck('./.env')
    const nm = fileCheck('./node_modules')
    const db = fileCheck('./db')
    const defdb = fileCheck('./db/default.limit')
    console.log('Env:',env)
    console.log('Modules',nm)
    console.log('DB Folder',db)
    console.log('Default DB',defdb)
}

exports.startupChecks = startupChecks