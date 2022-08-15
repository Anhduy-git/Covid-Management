const express = require('express');
const router = new express.Router();
const auth = require('../../middlewares/authentication');
const userController = require('../../controllers/User/user')

router.post('/create', auth, userController.createUser);
router.get('/getAll', auth, userController.getUserList);
router.get('/:identityCard/get', auth, userController.getUserByIdentity);
router.patch('/:identityCard/update', auth, userController.updateUserByIdentity);
router.get('/me', auth, userController.getCurrentUser);
router.post('/me/payOff', auth, userController.payOffDebt);
router.post('/login', userController.loginUser);
router.post('/logout', auth, userController.logoutUser);


module.exports = router;