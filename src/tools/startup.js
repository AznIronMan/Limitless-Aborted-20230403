const {
    fileCheck
} = require('../tools/filer')
const {
    dbGetCol,
    dbGetRow,
    dbGetVal,
    dbUpdate,
    dbAdd,
    dbDel
} = require('../tools/db')

const startupChecks = async () => {
    const env = fileCheck('./.env')
    const nm = fileCheck('./node_modules')
    const db = fileCheck('./db')
    require('dotenv').config();
    const defdb = fileCheck(`./db/${process.env.L_DATABASE}`)
    console.log('Env:', env)
    console.log('Modules', nm)
    console.log('DB Folder', db)
    console.log('Default DB', defdb)
    //console.log('Query Test', (await dbDel('dbInfo','dbName',`'testing'`)))
}

exports.startupChecks = startupChecks