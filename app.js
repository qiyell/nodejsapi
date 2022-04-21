const express = require('express');
const mysql = require('mysql');
const app = express();

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '132.226.170.56',
    port: '3306',
    user: 'root',
    password: 'lilong2511003L@',
    database: 'lilong'
});

app.get('/json',(req,res)=>{

    let sql = 'select * from supplier where supplier_name=?';
    let params = [];
    params.push(req.query.suppliername);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(sql, params, function (error, results, fields) {

            connection.release();
            res.json(results)

            if (error) throw error;
            
        });
    });
})

app.listen(8000,(req,res)=>{
    console.log('访问：http://localhost:8000')
})