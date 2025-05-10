const express = require('express');
const {getAllPhotos, getPhotoById, createPhoto, updatePhoto, removePhoto} = require('../controllers/photoController');
const router = express.Router({ mergeParams: true });
router.get('/', getAllPhotos);
router.get('/:id', getPhotoById);
router.post('/', createPhoto);
router.put('/:id', updatePhoto);
router.delete('/:id', removePhoto);
module.exports = router;