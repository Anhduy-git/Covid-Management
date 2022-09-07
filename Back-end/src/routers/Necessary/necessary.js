const express = require('express');
const router = new express.Router();
const multer = require('multer');
const auth = require('../../middlewares/authentication');
const necessaryController = require('../../controllers/Necessary/necessary')

router.post('/create', auth, necessaryController.createNecessary);
router.get('/getAll', auth, necessaryController.getNecessaryList);
router.get('/:name/get', auth, necessaryController.getNecessaryByName);
router.patch('/:name/update', auth, necessaryController.updateNecessary);
router.delete('/:name/delete', auth, necessaryController.deleteNecessaryByName);


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
router.post('/uploadImages/:name', auth, upload.any('images'), necessaryController.uploadNecessaryImages);

module.exports = router;
