const mysql2 = require('mysql2/promise')

module.exports = mysql2.createConnection({
    user: 'root',
    password: '',
    database: 'botbitacoras'
});