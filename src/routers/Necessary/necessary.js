const express = require('express');
const router = new express.Router();
const multer = require('multer');
const {
    createNecessary, 
    getNecessaryList, 
    getNecessaryByName,
    updateNecessary,
    deleteNecessaryByName,
    uploadNecessaryImages
} = require('../../controllers/Necessary/necessary')

router.post('/create', createNecessary);
router.get('/get', getNecessaryList);
router.get('/get/:name', getNecessaryByName);
router.patch('/update/:name', updateNecessary);
router.delete('/delete/:name', deleteNecessaryByName);


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
router.post('/uploadImages/:name', upload.any('images'), uploadNecessaryImages);

module.exports = router;
