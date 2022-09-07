const express = require('express');
const router = new express.Router();
const auth = require('../../middlewares/authentication');
const userController = require('../../controllers/User/user')

router.post('/create', auth, userController.createUser);
router.get('/getAll', auth, userController.getUserList);
router.get('/:username/get', auth, userController.getUserByUsername);
router.patch('/:username/update', auth, userController.updateUserByUsername);
router.delete('/:username/delete', auth, userController.deleteUserByUsername);
router.get('/me', auth, userController.getCurrentUser);
router.post('/me/payOff', auth, userController.payOffDebt);
router.post('/login', userController.loginUser);
router.post('/logout', auth, userController.logoutUser);
router.patch('/updatePassword', auth, userController.updatePassword);


module.exports = router;