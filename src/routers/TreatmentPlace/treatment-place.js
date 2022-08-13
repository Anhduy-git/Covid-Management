const express = require('express');
const router = new express.Router();
const {createTreatmentPlace} = require('../../controllers/TreatmentPlace/treatment-place')

router.post('/create', createTreatmentPlace);

module.exports = router;