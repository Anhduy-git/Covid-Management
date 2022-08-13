const express = require('express');
const router = new express.Router();
const {createUserManager} = require('../../controllers/User/user-manager')

router.post('/create', createUserManager);

module.exports = router;