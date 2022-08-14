const UserManager = require('../../models/User/user-manager');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError, BadRequestError, UnauthorizedError} = require('../../errors');

//[POST] /managers/create
//this method run in first time server start to create admin account
const createUserManager = async (req, res) => {        
    const user = new UserManager(req.body);    
    await user.save();            
    res.status(StatusCodes.CREATED).json(user);    
};

module.exports = {
    createUserManager
};