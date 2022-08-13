const express = require('express');
const router = new express.Router();
const {
    createUser, 
    getUserList, 
    getUserByIdentity,
    updateUserByIdentity
} = require('../../controllers/User/user')

router.post('/create', createUser);
router.get('/get', getUserList);
router.get('/get/:identityCard', getUserByIdentity);
router.patch('/update/:identityCard', updateUserByIdentity);

module.exports = router;