const UserManager = require('../../models/User/user-manager');
const {StatusCodes} = require('http-status-codes');
const {UnauthorizedError} = require('../../errors');
const fetch = require('node-fetch');


class UserManagerController {
    //[POST] /managers/create    
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
     //[POST] /managers/createAdmin
    //this method run in first time server start to create admin account
    async createUserAdmin(req, res, next) {        
        try {            
            const user = new UserManager(req.body);    
            await user.save();            
            //create admin user in payment system
            const username = req.body.username;
            const url = "http://localhost:3001/users/create";
            const options = {
                "method": "POST",
                "body": JSON.stringify({username, isAdmin: true}),
                "headers": {
                    "Content-Type": "application/json",
                }
            };
            //fetch API from payment system
            await fetch(url, options);
            res.status(StatusCodes.CREATED).json(user);                
        } catch(err) {
            next(err);
        }
    };
}

module.exports = new UserManagerController;