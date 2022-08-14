const express = require('express');
const router = new express.Router();
const {getAddressList} = require('../../controllers/Address/address')

router.get('/getAll', getAddressList);

module.exports = router;