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
    //   con.query("DROP TABLE todos", function (err, result) {
    //     if (err) throw err;
    //     console.log(" users table deleted!");
    // })
    // con.query("DROP TABLE posts", function (err, result) {
    //     if (err) throw err;
    //     console.log(" users table deleted!");
    // })
    // con.query("DROP TABLE users", function (err, result) {
    //     if (err) throw err;
    //     console.log(" users table deleted!");
    // })
    //     var sql1 = `
    //   CREATE TABLE users (
    //     id INT AUTO_INCREMENT UNIQUE,
    //     username VARCHAR(255) PRIMARY KEY NOT NULL,
    //     email VARCHAR(255) UNIQUE,
    //     password VARCHAR(255))`;
    //     con.query(sql1, function (err, result) {
    //         if (err) throw err;
    //         console.log(" users table created");
    //     });
    //     var sql2 = `
    //     CREATE TABLE todos (
    //       id INT AUTO_INCREMENT UNIQUE,
    //       userId INT PRIMARY KEY NOT NULL,
    //       title VARCHAR(255),
    //       complited BOOLEAN DEFAULT FALSE,
    //       FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)`;
    //     con.query(sql2, function (err, result) {
    //         if (err) throw err;
    //         console.log("todos table created");
    //     });
    //     var sql3 = `
    //       CREATE TABLE posts (
    //       id INT AUTO_INCREMENT UNIQUE,
    //       userId INT PRIMARY KEY NOT NULL,
    //       title VARCHAR(255),
    //       body TEXT,
    //       FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)`;
    //     con.query(sql3, function (err, result) {
    //         if (err) throw err;
    //         console.log("posts table created");
    //     });
    //     var sql4 = `
    //     CREATE TABLE comments (
    //     id INT AUTO_INCREMENT UNIQUE,
    //     postId INT PRIMARY KEY NOT NULL,
    //     email VARCHAR(255) ,
    //     title VARCHAR(255),
    //     body TEXT,
    //     FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    //     FOREIGN KEY (email) REFERENCES users(email)  )`;
    //     con.query(sql4, function (err, result) {
    //         if (err) throw err;
    //         console.log("comments table created");
    //     });
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
    
    // const insertTodos = () => {
    //     let inserted = 0;

    //     for (let i = 1; i <= 50; i++) {
    //         const userId = i; // Assuming userId from 1 to 50
    //         const title = `Task number ${i}`;
    //         const complited = Math.random() < 0.5; // Randomly true or false

    //         const sql = `INSERT INTO todos (userId, title, complited) VALUES (?, ?, ?)`;
    //         con.query(sql, [userId, title, complited], function (err, result) {
    //             if (err) throw err;
    //             console.log(`Inserted task for user ${userId}`);
    //             inserted++;
    //             if (inserted === 50) {
    //                 console.log('All tasks have been inserted.');
    //                 con.end();
    //             }
    //         });
    //     }
    // }
    // insertTodos();
});
module.exports = con;
