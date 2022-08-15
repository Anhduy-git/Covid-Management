const express = require('express');
const router = new express.Router();
const userManagerController = require('../../controllers/User/user-manager');
const auth = require('../../middlewares/authentication');

router.post('/create', auth, userManagerController.createUserManager);

module.exports = router;