const express = require('express');
const mysql = require('mysql');

const PORT = 3000;

// Crea la conexion
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: ''
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

app.listen(PORT);