const express = require('express');
const router = new express.Router();
const {
    createNecessaryPackage, 
    getNecessaryPackageList, 
    getNecessaryPackageByName,
    updateNecessaryPackage,
    deleteNecessaryPackageByName
} = require('../../controllers/Necessary/necessary-package')

router.post('/create', createNecessaryPackage);
router.get('/get', getNecessaryPackageList);
router.get('/get/:name', getNecessaryPackageByName);
router.patch('/update/:name', updateNecessaryPackage);
router.delete('/delete/:name', deleteNecessaryPackageByName);


module.exports = router;
