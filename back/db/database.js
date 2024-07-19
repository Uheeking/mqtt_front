const mysql = require('mysql');
const DB = require("./db.json")

// Configure the PostgreSQL connection
const pool = mysql.createPool(DB);

// Export the pool instance for querying
module.exports = {
    query: (sql, values) => {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if (err) {
                    return reject(err);
                }
                connection.query(sql, values, (err, results) => {
                    connection.release(); // Release the connection
                    if (err) {
                        return reject(err);
                    }
                    resolve(results);
                });
            });
        });
    },
};