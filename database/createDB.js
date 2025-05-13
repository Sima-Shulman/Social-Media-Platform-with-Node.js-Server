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
    // con.query("DROP TABLE comments", function (err, result) {
    //     if (err) throw err;
    //     console.log(" comments table deleted!");
    // });
    // con.query("DROP TABLE todos", function (err, result) {
    //     if (err) throw err;
    //     console.log(" todos table deleted!");
    // });
    // con.query("DROP TABLE posts", function (err, result) {
    //     if (err) throw err;
    //     console.log(" posts table deleted!");
    // });
    // con.query("DROP TABLE photos", function (err, result) {
    //     if (err) throw err;
    //     console.log(" photos table deleted!");
    // });
    // con.query("DROP TABLE albums", function (err, result) {
    //     if (err) throw err;
    //     console.log(" albums table deleted!");
    // });
    // con.query("DROP TABLE passwords", function (err, result) {
    //     if (err) throw err;
    //     console.log(" passwords table deleted!");
    // });
    // con.query("DROP TABLE users", function (err, result) {
    //     if (err) throw err;
    //     console.log(" users table deleted!");
    // });

    // var sql1 = `
    //   CREATE TABLE users (
    //     id INT AUTO_INCREMENT PRIMARY KEY ,
    //     username VARCHAR(255) UNIQUE NOT NULL,
    //     email VARCHAR(255) UNIQUE)`;
    // con.query(sql1, function (err, result) {
    //     if (err) throw err;
    //     console.log(" users table created");
    // });

    // var sql5 = `
    // CREATE TABLE passwords (
    //     userId INT PRIMARY KEY,
    //     password VARCHAR(255) NOT NULL,
    //     FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)`;
    // con.query(sql5, function (err, result) {
    //     if (err) throw err;
    //     console.log("users table created");
    // });
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
    // var sql6 = `
    // CREATE TABLE albums (
    // id INT AUTO_INCREMENT PRIMARY KEY ,
    // userId INT NOT NULL,
    // title VARCHAR(255),
    // FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)`;
    // con.query(sql6, function (err, result) {
    //     if (err) throw err;
    //     console.log("albums table created");
    // });
    // var sql7 = `
    // CREATE TABLE photos (
    // id INT AUTO_INCREMENT PRIMARY KEY ,
    // albumId INT NOT NULL,
    // title VARCHAR(255),
    // url VARCHAR(255),
    // FOREIGN KEY (albumId) REFERENCES albums(id) ON DELETE CASCADE)`;
    // con.query(sql7, function (err, result) {
    //     if (err) throw err;
    //     console.log("photos table created");
    // });

    // var sql3 = `
    //     CREATE TABLE posts (
    //     id INT AUTO_INCREMENT  PRIMARY KEY,
    //     userId INT NOT NULL,
    //     title VARCHAR(255),
    //     body TEXT,
    //     FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE)`;
    // con.query(sql3, function (err, result) {
    //     if (err) throw err;
    //     console.log("posts table created");
    // });
    // var sql4 = `
    //   CREATE TABLE comments (
    //   id INT AUTO_INCREMENT PRIMARY KEY ,
    //   postId INT NOT NULL,
    //   email VARCHAR(255) ,
    //   title VARCHAR(255),
    //   body TEXT,
    //   FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    //   FOREIGN KEY (email) REFERENCES users(email)  )`;
    // con.query(sql4, function (err, result) {
    //     if (err) throw err;
    //     console.log("comments table created");
    // });

    // const insertUsersAndPasswords = () => {
    //     for (let i = 1; i <= 50; i++) {
    //         const username = `user${i}`;
    //         const email = `user${i}@gmail.com`;
    //         const password = `pass${i}`;

    //         const sql = `INSERT INTO users (username, email) VALUES (?, ?)`;
    //         const sql2 = `INSERT INTO passwords (userId,password) VALUES (?,SHA2(?, 256))`;
    //         con.query(sql, [username, email], (err, result) => {
    //             if (err) throw err;
    //             console.log(`User ${username} inserted`);
    //         });
    //         con.query(sql2, [i, password], (err, result) => {
    //             if (err) throw err;
    //             console.log(`Password for ${username} inserted`);
    //         });
    //     }
    // };
    // insertUsersAndPasswords();
    // const insertTodos = () => {
    //     for (let i = 1; i <= 50; i++) {
    //         const userId = Math.ceil(i / 10);
    //         const title = `Todo ${i}`;
    //         const completed = i % 2 === 0;

    //         const sql = `INSERT INTO todos (userId, title, completed) VALUES (?, ?, ?)`;
    //         con.query(sql, [userId, title, completed], (err, result) => {
    //             if (err) throw err;
    //             console.log(`Todo ${i} inserted`);
    //         });
    //     }
    // };
    // insertTodos();
    // const insertPosts = () => {
    //     for (let i = 1; i <= 60; i++) {
    //         const userId = Math.ceil(i / 5);
    //         const title = `Post ${i}`;
    //         const body = `This is the body of post ${i}`;

    //         const sql = `INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)`;
    //         con.query(sql, [userId, title, body], (err, result) => {
    //             if (err) throw err;
    //             console.log(`Post ${i} inserted`);
    //         });
    //     }
    // };
    // insertPosts();
    // const insertComments = () => {
    //     for (let i = 1; i <= 100; i++) {
    //         const postId = Math.ceil(i / 5);
    //         const email = `user${Math.ceil(postId / 4)}@gmail.com`;
    //         const title = `Comment ${i}`;
    //         const body = `This is the body of comment ${i}`;

    //         const sql = `INSERT INTO comments (postId, email, title, body) VALUES (?, ?, ?, ?)`;
    //         con.query(sql, [postId, email, title, body], (err, result) => {
    //             if (err) throw err;
    //             console.log(`Comment ${i} inserted`);
    //         });
    //     }
    // };
    // insertComments();
    // const insertAlbums = () => {
    //     for (let i = 1; i <= 60; i++) {
    //         const userId = Math.ceil(i / 10);
    //         const title = `Album ${i}`;

    //         const sql = `INSERT INTO albums (userId, title) VALUES (?, ?)`;
    //         con.query(sql, [userId, title], (err, result) => {
    //             if (err) throw err;
    //             console.log(`Album ${i} inserted`);
    //         });
    //     }
    // }
    // insertAlbums();
    // const insertPhotos = () => {
    //     for (let i = 1; i <= 600; i++) {
    //         const albumId = Math.ceil(i / 10);
    //         const title = `Photo ${i}`;
    //         const url = `https://picsum.photos/seed/user${i}/400/300`;

    //         const sql = `INSERT INTO photos (albumId, title, url) VALUES (?, ?, ?)`;
    //         con.query(sql, [albumId, title, url], (err, result) => {
    //             if (err) throw err;
    //             console.log(`Photo ${i} inserted`);
    //         });
    //     }
    // };
    // insertPhotos();
});
module.exports = con.promise();
