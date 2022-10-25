require('dotenv').config()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(`./db/${process.env.L_DATABASE}`)

const dbGetVal = (tCol, tbl, sCol, sVal, misc) => {
    return new Promise((resolve,reject) => {
        let sql = `SELECT ${tCol} FROM ${tbl} WHERE ${sCol} = '${sVal}'`
        if(misc != undefined ) {
            sql += ` ${misc}`
        }
        db.get(sql, (err, rows) => { 
            if (err) {
                return reject(err.message)
            }
            resolve(JSON.parse(JSON.stringify(rows))[tCol])
        })
    })
}

const dbGetCol = (tbl, sCol, sVal, misc) => {
    return new Promise((resolve,reject) => {
        let sql = `SELECT * FROM ${tbl} WHERE ${sCol} = '${sVal}'`
        if(misc != undefined ) {
            sql += ` ${misc}`
        }
        db.all(sql, (err, rows) => { 
            if (err) {
                return reject(err.message)
            }
            resolve (JSON.stringify(rows))
        })
    })
}

//Remember this:
// const one = { test: JSON.stringify(rows)}
// const two = JSON.parse(one.test);
// resolve(JSON.stringify(two[1]))

const dbGetRow = (tCol, tbl, sCol, sVal, misc) => {
    return new Promise((resolve,reject) => {
        let sql = `SELECT ${tCol} FROM ${tbl} WHERE ${sCol} = '${sVal}'`
        if(misc != undefined ) {
            sql += ` ${misc}`
        }
        let a, b, c
        db.all(sql, (err, rows) => { 
            if (err) {
                return reject(err.message)
            }
            const obj = Object.keys(rows)
            obj.forEach(function(obj) { b += rows[obj][tCol] + ","})
            a = (b.replace(undefined,""))
            a = a.substring(0,a.length-1)
            c = JSON.stringify(a)
            c = c.substring(1,c.length-1)
            resolve(c)
        })
    })
}

const dbUpdate = async (tbl, tCol, tVal, sCol, sVal, misc) => {
    let sql = `UPDATE '${tbl}' SET ${tCol} = '${tVal}' WHERE ${sCol} = '${sVal}'`
    if(misc != undefined ) {
        sql += ` ${misc}`
    }
    db.run(sql, function(err) {
        if (err) {
            return console.error(err.message)
        }
        console.log(this)
    })
    db.close()
}

exports.dbGetCol = dbGetCol
exports.dbGetRow = dbGetRow
exports.dbGetVal = dbGetVal
exports.dbUpdate = dbUpdate