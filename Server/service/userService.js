const db = require('../../database/createDB');

// exports.queryAllUsers = async () => {
//     try {
//         const [rows] = await db.query('SELECT * FROM users');
//         return rows;
//     } catch (err) {
//         throw new Error('Error fetching users: ' + err.message);
//     }
//     }

// exports.queryUserUsername = async (username) => {
//     try {
//         const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
//         return rows[0];
//     } catch (err) {
//         throw new Error('Error fetching user with ID: ' + id + ' ' + err.message);
//     }
// }

exports.queryUserById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0];
    } catch (err) {
        throw new Error('Error fetching user with ID: ' + id + ' ' + err.message);
    }
}
exports.postUser = async ({ username, email, password }) => {
    try {
        const [result] = await db.query(
            'INSERT INTO users (username, email) VALUES (?, ?)',
            [username, email]
        );
        await db.query(
            'INSERT INTO passwords (userId,password) VALUES (?,?)',
            [result.insertId, password]
        );

        return { id: result.insertId, username, email };
    } catch (err) {
        throw new Error('Error posting user: ' + err.message);
    }
}
// exports.putUser = async (id, { username, email }) => {
//     try {
//         const [result] = await db.query(
//             'UPDATE users SET username = ?, email = ? WHERE id = ?',
//             [username, email, id]
//         );
//         return result.affectedRows > 0;
//     } catch (err) {
//         throw new Error('Error updating user: ' + err.message);
//     }
// }
// exports.deleteUser = async (id) => {
//     try {
//         const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
//         return result.affectedRows > 0;
//     } catch (err) {
//         throw new Error('Error deleting user: ' + err.message);
//     }
// }
