const express = require('express');
const router = new express.Router();
const {createTreatmentPlace, getTreatmentPlaceList, updateTreatmentPlace} = require('../../controllers/TreatmentPlace/treatment-place')
const auth = require('../../middlewares/authentication');

router.post('/create', auth, createTreatmentPlace);
router.get('/getAll', getTreatmentPlaceList);
router.patch('/:name/update', auth, updateTreatmentPlace);

module.exports = router;
