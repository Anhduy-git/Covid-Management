const express = require('express');
const router = new express.Router();
const addressController = require('../../controllers/Address/address')

router.get('/getAll', addressController.getAddressList);

module.exports = router;