const express = require('express');
const router = new express.Router();
const auth = require('../../middlewares/authentication');
const {
    createNecessaryPackage, 
    getNecessaryPackageList, 
    getNecessaryPackageByName,
    updateNecessaryPackage,
    deleteNecessaryPackageByName,
    buyNecessaryPackages
} = require('../../controllers/Necessary/necessary-package')

router.post('/create', auth, createNecessaryPackage);
router.get('/getAll', getNecessaryPackageList);
router.get('/:name/get', getNecessaryPackageByName);
router.patch('/:name/update', auth, updateNecessaryPackage);
router.delete('/:name/delete', auth, deleteNecessaryPackageByName);
router.post('/buy', auth, buyNecessaryPackages);


module.exports = router;
