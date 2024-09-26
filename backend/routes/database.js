const mysql2 = require('mysql2');
const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"Yns$0821",
    database:"employee"
})

db.connect((err) =>{
    if(err) {
        console.log("error connecting to the database");
        return;
    }
    console.log("connected to the database!");
})

module.exports = db.promise();