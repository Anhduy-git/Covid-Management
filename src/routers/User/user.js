const express = require('express');
const router = new express.Router();
const auth = require('../../middlewares/authentication');
const {
    createUser, 
    getUserList, 
    getUserByIdentity,
    updateUserByIdentity,
    getCurrentUser,
    payOffDebt,
    loginUser,
    logoutUser
} = require('../../controllers/User/user')

router.post('/create', auth, createUser);
router.get('/getAll', auth, getUserList);
router.get('/:identityCard/get', auth, getUserByIdentity);
router.patch('/:identityCard/update', auth, updateUserByIdentity);
router.get('/me', auth, getCurrentUser);
router.post('/me/payOff', auth, payOffDebt);
router.post('/login', loginUser);
router.post('/logout', auth, logoutUser);


module.exports = router;