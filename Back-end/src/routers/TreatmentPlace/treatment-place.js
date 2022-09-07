const express = require('express');
const router = new express.Router();
const treatmentPlaceController = require('../../controllers/TreatmentPlace/treatment-place')
const auth = require('../../middlewares/authentication');

router.post('/create', auth, treatmentPlaceController.createTreatmentPlace);
router.get('/getAll', treatmentPlaceController.getTreatmentPlaceList);
router.patch('/:name/update', auth, treatmentPlaceController.updateTreatmentPlace);

module.exports = router;
