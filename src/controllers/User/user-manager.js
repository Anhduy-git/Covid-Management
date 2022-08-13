const UserManager = require('../../models/User/user-manager');
// const auth = require('../middleware/authentication');
const {StatusCodes} = require('http-status-codes');

//[POST] /managers/create
const createUserManager = async (req, res) => {
    const user = new UserManager(req.body);
    await user.save();        
    const token = await user.generateAuthToken();
    res.status(StatusCodes.CREATED).json({user, token});    
};

module.exports = {
    createUserManager
};