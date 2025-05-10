const db = require('../../database/createDB');
exports.queryAllPhotos = async (albumId, offset = 0, limit = 5) => {
    try {
        const [rows] = await db.query(
            'SELECT * FROM photos WHERE albumId = ? LIMIT ? OFFSET ?',
            [albumId, limit, offset]
        );
        return rows;
    } catch (err) {
        throw new Error('Error fetching photos: ' + err.message);
    }
};

exports.queryPhotoById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM photos WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        throw new Error('Error fetching photo with ID: ' + id + err.message);
    }
}
exports.postPhoto = async ({ albumId, title, url }) => {
    try {
        const [result] = await db.query(
            'INSERT INTO photos (albumId, title, url) VALUES (?, ?, ?)',
            [albumId, title, url]
        );
        return { id: result.insertId, albumId, title, url };
    } catch (err) {
        throw new Error('Error posting Photo: ' + err.message);
    }
}
exports.putPhoto = async (id, { albumId, title, url }) => {
    try {
        const [result] = await db.query(
            'UPDATE photos SET albumId = ?, title = ?, url = ? WHERE id = ?',
            [albumId, title, url, id]
        );
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error updating Photo: ' + err.message + ' ' + title);
    }
}
exports.deletePhoto = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM photos WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error deleting Photo: ' + err.message);
    }
}
