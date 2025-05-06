var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: 'root',//process.env.USERNAME,
    password: 'Simi5158!'//process.env.PASSWORD
});

con.connect(function (err) {
    if (err) {
        console.log("Error connecting to the database:", err);
        throw err;
    }
    console.log("Connected!");
    // con.query("CREATE DATABASE MyDB", function (err, result) {
    //     if (err) throw err;
    //     console.log("Database created!");
    // });
    con.query("USE MyDB", function (err, result) {
        if (err) throw err;
        console.log("Using MyDB database");
    });
       //   var sql1 = `
      // CREATE TABLE users (
      //   id INT AUTO_INCREMENT UNIQUE,
      //   username VARCHAR(255) PRIMARY KEY NOT NULL,
      //   email VARCHAR(255) UNIQUE,
      //   password VARCHAR(255))`;
      //   con.query(sql1, function (err, result) {
      //       if (err) throw err;
      //       console.log(" users table created");
      //   });
        // var sql2 = `
        // CREATE TABLE todos (
        //   id INT AUTO_INCREMENT PRIMARY KEY ,
        //   userId INT NOT NULL,
        //   title VARCHAR(255),
        //   completed BOOLEAN DEFAULT FALSE,
        //   FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)`;
        // con.query(sql2, function (err, result) {
        //     if (err) throw err;
        //     console.log("todos table created");
        // });
      //   var sql3 = `
      //     CREATE TABLE posts (
      //     id INT AUTO_INCREMENT  PRIMARY KEY,
      //     userId INT NOT NULL,
      //     title VARCHAR(255),
      //     body TEXT,
      //     FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)`;
      //   con.query(sql3, function (err, result) {
      //       if (err) throw err;
      //       console.log("posts table created");
      //   });
      //   var sql4 = `
      //   CREATE TABLE comments (
      //   id INT AUTO_INCREMENT PRIMARY KEY ,
      //   postId INT NOT NULL,
      //   email VARCHAR(255) ,
      //   title VARCHAR(255),
      //   body TEXT,
      //   FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
      //   FOREIGN KEY (email) REFERENCES users(email)  )`;
      //   con.query(sql4, function (err, result) {
      //       if (err) throw err;
      //       console.log("comments table created");
      //   });
    // const insertUsers = () => {
    //     for (let i = 1; i <= 50; i++) {
    //         const username = `user${i}`;
    //         const email = `user${i}@example.com`;
    //         const password = `pass${i}`;

    //         const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
    //         con.query(sql, [username, email, password], (err, result) => {
    //             if (err) throw err;
    //             console.log(`User ${username} inserted`);
    //         });
    //     }
    // };
    // insertUsers();
    

    
});
module.exports = con.promise();
