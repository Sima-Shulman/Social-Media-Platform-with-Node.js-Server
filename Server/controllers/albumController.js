
const {queryAllAlbums, queryAlbumsByUserId, queryAlbumById, postAlbum, putAlbum, deleteAlbum} = require('../service/albumsService');
exports.getAllAlbums = async (req, res) => {
    try {
        const { userId } = req.query;
        if (userId) {
            const albums = await queryAlbumsByUserId(userId);
            if (!albums || albums.length === 0) {
                return res.status(404).json({ error: 'No albums found for user with id:' + userId });
            }
            return res.status(200).json(albums);
        }
        const albums = await queryAllAlbums();
        if (!albums || albums.length === 0) {
            return res.status(404).json({ error: 'No albums found' });
        }
        res.status(200).json(albums);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching albums: ' + err.message });
    }
}
exports.getAlbumById = async (req, res) => {
    const  id  = req.params.id;
    try {
        const album = await queryAlbumById(id);
        if (!album ||album.length === 0) {
            return res.status(404).json({ error: 'Album not found'+album+id });
        }
        res.status(200).json(album[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching album with ID: ' + id + err.message });
    }
}
exports.createAlbum = async (req, res) => {
    const { userId, title } = req.body;
    try {
        const newAlbum = await postAlbum({ userId, title });
        res.status(201).json(newAlbum);
    } catch (err) {
        res.status(500).json({ error: 'Error posting Album: ' + err.message });
    }
}
exports.updateAlbum = async (req, res) => {
    const id  = req.params.id;
    const { userId, title } = req.body;
    try {
        const updated = await putAlbum(id, { userId, title });
        if (!updated) {
            return res.status(404).json({ error: 'Album not found' });
        }
        res.status(200).json({ message: 'Album updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error updating Album: ' + err.message + ' ' + title });
    }
}

exports.removeAlbum = async (req, res) => {
    const id  = req.params.id;
    try {
        const deleted = await deleteAlbum(id);
        if (!deleted) {
            return res.status(404).json({ error: 'Album not found' });
        }
        res.status(200).json({ message: 'Album deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting Album: ' + err.message });
    }
}