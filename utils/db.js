module.exports = (sql, params = null) => {
    const mysql = require('mysql');
    const conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'bigevent'
    });
    conn.connect();
    return new Promise((resolve, reject) => {
        conn.query(sql, params, (err, result) => {
            err ? reject(err) : resolve(result);
        });
        conn.end();
    }).catch(err => {
        console.log(err.message);
    });
};