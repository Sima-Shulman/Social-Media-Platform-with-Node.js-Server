const express = require('express');
const { getAllAlbums, getAlbumById, createAlbum, updateAlbum, removeAlbum } = require('../controllers/albumController');
const router = express.Router();
const photosRouter = require('./photosRoutes');

router.get('/', getAllAlbums);
router.get('/:id', getAlbumById);
router.post('/', createAlbum);
router.put('/:id', updateAlbum);
router.delete('/:id', removeAlbum);
router.use('/:albumId/photos', photosRouter);

module.exports = router;