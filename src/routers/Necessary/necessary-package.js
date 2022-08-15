const express = require('express');
const router = new express.Router();
const auth = require('../../middlewares/authentication');
const necessaryPackageController = require('../../controllers/Necessary/necessary-package')

router.post('/create', auth, necessaryPackageController.createNecessaryPackage);
router.get('/getAll', necessaryPackageController.getNecessaryPackageList);
router.get('/:name/get', necessaryPackageController.getNecessaryPackageByName);
router.patch('/:name/update', auth, necessaryPackageController.updateNecessaryPackage);
router.delete('/:name/delete', auth, necessaryPackageController.deleteNecessaryPackageByName);
router.post('/buy', auth, necessaryPackageController.buyNecessaryPackages);


module.exports = router;
