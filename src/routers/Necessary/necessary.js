const express = require('express');
const router = new express.Router();
const multer = require('multer');
const auth = require('../../middlewares/authentication');
const {
    createNecessary, 
    getNecessaryList, 
    getNecessaryByName,
    updateNecessary,
    deleteNecessaryByName,
    uploadNecessaryImages
} = require('../../controllers/Necessary/necessary')

router.post('/create', auth, createNecessary);
router.get('/getAll', auth, getNecessaryList);
router.get('/:name/get', auth, getNecessaryByName);
router.patch('/:name/update', auth, updateNecessary);
router.delete('/:name/delete', auth, deleteNecessaryByName);


//image upload
const upload = multer({    
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new BadRequestError('Please upload jpg, jpeg, or png files'))
        }
        cb(undefined, true); //accept file        
    }
});
router.post('/uploadImages/:name', auth, upload.any('images'), uploadNecessaryImages);

module.exports = router;
