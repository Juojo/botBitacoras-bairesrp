const express = require('express');
const mysql = require('mysql');

const PORT = 3000;

//let sqlInsert = require('../commands/button.js')

// Crea la conexion
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'botbitacoras'
})

// Conecta a MySQL
db.connect(err => {
    if(err) {
        throw err
    }
    console.log('MySQL Connected');
})

const app = express()

// Crea la base de datos
app.get('/createdb', (req, res) => {
    let sql = 'create DATABASE nodeTest;'
    db.query(sql, err => {
        if(err) {
            throw err;
        }
        res.send(`Now using ${sql} database`)
    })
})

// Insert a la base de datos
app.get('/bitacoraInsert', (req, res) => {
    let post = {
        bitacoraId: '',
        discordId: 69,
        username: 'testNode',
        openDate: '2021-11-05 18:20:00',
        closeDate: '2021-11-05 19:00:00',
        total: '00:40:00'
    }
    let sql = 'INSERT INTO bitacora SET ?'
    let query = db.query(sql, post, err => {
        if(err) {
            throw err
        }
        res.send('Insert a "bitacora" agregado.')
    })
})

app.listen(PORT);