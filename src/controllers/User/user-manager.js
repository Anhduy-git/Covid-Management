const UserManager = require('../../models/User/user-manager');
const {StatusCodes} = require('http-status-codes');
const {UnauthorizedError} = require('../../errors');


class UserManagerController {
    //[POST] /managers/create
    //this method run in first time server start to create admin account
    async createUserManager(req, res, next) {        
        try {
            if (req.priority === 0) {
                const user = new UserManager(req.body);    
                await user.save();            
                res.status(StatusCodes.CREATED).json(user);    
            } else {
                next(new UnauthorizedError('You are not admin'));
            }
        } catch(err) {
            next(err);
        }
    };
}

module.exports = new UserManagerController;