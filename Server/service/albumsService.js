const db = require('../../database/createDB');
exports.queryAllAlbums = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM albums');
        return rows;
    } catch (err) {
        throw new Error('Error fetching albums: ' + err.message);
    }
}
exports.queryAlbumsByUserId = async (userId) => {
    try {
        const [rows] = await db.query('SELECT * FROM albums WHERE userId = ?', [userId]);
        return rows;
    } catch (err) {
        throw new Error('Error fetching albums for user with ID: ' + userId + err.message);
    }
}
exports.queryAlbumById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM albums WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        throw new Error('Error fetching album with ID: ' + id + err.message);
    }
}
exports.postAlbum = async ({ userId, title }) => {
    try {
        const [result] = await db.query(
            'INSERT INTO albums (userId, title) VALUES (?, ?)',
            [userId, title]
        );
        return { id: result.insertId, userId, title };
    } catch (err) {
        throw new Error('Error posting Album: ' + err.message);
    }
}
exports.putAlbum = async (id, { userId, title }) => {
    try {
        const [result] = await db.query(
            'UPDATE albums SET userId = ?, title = ? WHERE id = ?',
            [userId, title, id]
        );
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error updating Album: ' + err.message + ' ' + title);
    }
}
exports.deleteAlbum = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM albums WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error deleting Album: ' + err.message);
    }
}
