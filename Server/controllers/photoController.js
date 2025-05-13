const {queryAllPhotos, queryPhotoById, postPhoto, putPhoto, deletePhoto} = require('../service/photosService');
exports.getAllPhotos = async (req, res) => {
    const albumId = req.params.albumId;
    const offset = parseInt(req.query._start) || 0;
    const limit = parseInt(req.query._limit) || 5;

    try {
        const photos = await queryAllPhotos(albumId, offset, limit);
        if (photos.length === 0) {
            return res.status(200).json({ message: 'End of album reached', photos: [] });
        }
        res.status(200).json({ photos });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching photos: ' + err.message });
    }
};

exports.getPhotoById = async (req, res) => {
    const  id  = req.params.id;
    try {
        const photo = await queryPhotoById(id);
        if (photo.length === 0) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        res.status(200).json(photo[0]);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching photo: ' + err.message });
    }
}
exports.createPhoto = async (req, res) => {
    const {title, url } = req.body;
    const albumId  = req.params.albumId;
    try {
        const newPhoto = await postPhoto({ albumId, title, url });
        res.status(201).json(newPhoto);
    } catch (err) {
        res.status(500).json({ message: 'Error creating photo: ' + err.message });
    }
}
exports.updatePhoto = async (req, res) => {
    const  id  = req.params.id;
    const { title, url } = req.body;
    const albumId  = req.params.albumId;
    try {
        const updated = await putPhoto(id, { albumId, title, url });
        if (!updated) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        res.status(200).json({ message: 'Photo updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error updating photo: ' + err.message });
    }
}
exports.removePhoto = async (req, res) => {
    const id  = req.params.id;
    try {
        const deleted = await deletePhoto(id);
        if (!deleted) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting photo: ' + err.message });
    }
}
