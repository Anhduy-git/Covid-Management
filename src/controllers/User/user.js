const User = require('../../models/User/user');
const UserManager = require('../../models/User/user-manager');
const TreatmentPlace = require('../../models/TreatmentPlace/treatment-place');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError, BadRequestError, UnauthorizedError} = require('../../errors');
const fetch = require('node-fetch');

class UserController {
    //[POST] /users/create
    async createUser(req, res, next) {
        try {
            if (req.priority === 1) {
                //create new user
                const user = new User(req.body);
                await user.save();
                //create new user in payment system
                const username = req.body.username;                
                const url = "http://localhost:3001/users/create";
                const options = {
                    "method": "POST",
                    "body": JSON.stringify({username}),
                    "headers": {
                        "Content-Type": "application/json",
                    }
                };
                //fetch API from payment system
                await fetch(url, options);
                
                res.status(StatusCodes.CREATED).json(user);   
            } else {
                next(new UnauthorizedError('You are not manager'));
            }
        } catch(err) {
            next(err);
        }
    };

    //[GET] /users/getAll
    async getUserList(req, res, next) {         
        try {
            if (req.priority === 1) {
                const users = await User.find({});
                if (!users) {
                    throw new NotFoundError("List of users not found");
                }
                res.status(StatusCodes.OK).json(users);   
            } else {
                throw new UnauthorizedError('You are not manager');
            }
        } catch(err) {
            next(err);
        }
    }

    //[GET] /users/:username/get
    async getUserByUsername(req, res, next) {
        try {
            if (req.priority === 1) {
                const username = req.params.username;       
                const user = await User.findOne({username});
                if (!user) {
                    throw new NotFoundError("User not found");
                }
                res.status(StatusCodes.OK).json(user);
            } else {
                throw new UnauthorizedError('You are not manager');
            }
        } catch(err) {
            next(err);
        }
    }

    //[GET] /users/me
    async getCurrentUser(req, res, next) {
        try {
            if (req.priority === 2) {        
                res.status(StatusCodes.OK).json(req.user);
            } else {
                throw new UnauthorizedError('You are not a user');
            }
        } catch(err) {
            next(err);
        }
    }

    //[POST] /users/payOff
    async payOffDebt(req, res, next) {
        try {
            if (req.priority === 2) {
                const username = req.user.username;        
                //get remaining balance of current user in payment system
                const urlGetRemainingBalance = `http://localhost:3001/users/${username}/getRemainingBalance`;
                const optionsGetRemainingBalance = {
                    "method": "GET",                
                };
                
                //fetch API from payment system
                var {remainingBalance} = await fetch(urlGetRemainingBalance, optionsGetRemainingBalance).then((res) => res.json());                
                //Minimum amount to pay off each time
                const minimumPayment = req.user.debt * 0.05;     

                var moneyTransfer = req.body.moneyTransfer;    
                
                //payoff debt
                if (moneyTransfer <= remainingBalance) {
                    if (moneyTransfer >= minimumPayment) {
                        if (moneyTransfer >= req.user.debt) {
                            moneyTransfer = req.user.debt;                
                            req.user.debt = 0;
                        } else {
                            req.user.debt -= moneyTransfer;                                          
                        }                           
                        console.log(moneyTransfer);
                        //update remaining balance of current user in payment system
                        const urlUpdateRemainingBalance = `http://localhost:3001/users/${username}/transferToAdmin`;
                        const optionsUpdateRemainingBalance = {
                            "method": "PATCH",
                            "body": JSON.stringify({username, moneyTransfer}),
                            "headers": {
                                "Content-Type": "application/json",
                            }            
                        };
                        //fetch API from payment system
                        await fetch(urlUpdateRemainingBalance, optionsUpdateRemainingBalance);

                    } else {
                        throw new BadRequestError('The money transfer is less than minimum payment');
                    }   
                } else {
                    throw new BadRequestError('Not enough money in account');
                }  
                await req.user.save();
                res.status(StatusCodes.CREATED).json(req.user);   
            } else {
                throw new UnauthorizedError('You are not a user');
            }
        } catch(err) {
            next(err);
        }
    };

    //[PATCH] /users/:username/update
    async updateUserByUsername(req, res, next) {
        try {
            if (req.priority === 1) {
                const updates = Object.keys(req.body);
                const allowedUpdates = ['state', 'placeOfTreatment', 'relatedUsers'];
                const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        
                if (!isValidOperation) {
                    throw new BadRequestError("Invalid update operation")
                }
        
                const username = req.params.username; 
                const user = await User.findOne({username})                
                if (!user) {
                    throw new NotFoundError("User not found");
                }
                for (const update of updates) {        
                    if (update === 'state') {
                        //update managed processed
                        let activity = `Change state from ${user['state']} to ${req.body['state']}`;
                        user.managedProcesses = user.managedProcesses.concat({activity});
                        user['state'] = req.body['state'];            
                        //update all related users
                        for (const item of user.relatedUsers) {
                            let relatedUserId = item.relatedUser;
                            let relatedUser = await User.findById(relatedUserId);
                            relatedUser.state = req.body.state
                            await relatedUser.save();
                        }
                    } else if (update === 'placeOfTreatment') {
                        if (user['placeOfTreatment'] !== req.body['placeOfTreatment']) {     
                            //check if user can change treatment place
                            let treatmentPlace = await TreatmentPlace.findOne({name:req.body['placeOfTreatment']});                
                            if (treatmentPlace.currentPatients < treatmentPlace.capacity) {
                                //update place of treatment                    
                                let activity = `Change place of treatment from ${user['placeOfTreatment']} to ${req.body['placeOfTreatment']}`;
                                user.managedProcesses = user.managedProcesses.concat({activity});
                                user['placeOfTreatment'] = req.body['placeOfTreatment'];
                                //update currentPatients of place of treatment
                                treatmentPlace.currentPatients += 1;
                                await treatmentPlace.save();
                            } else {
                                throw new BadRequestError('This treatment place is full');
                            }   
                        }        
                    } else {
                        user[update] = req.body[update];
                    }
                }
                
                await user.save();
        
                res.status(StatusCodes.OK).json(user);
            } else {
                throw new UnauthorizedError('You are not manager');
            }
        } catch(err) {
            next(err);
        }
    }

    //[DELETE] /users/:username/delete
    async deleteUserByUsername(req, res, next) {
        try {
            if (req.priority === 1) {
                const username = req.params.username;
                const user = await User.findOne({username});
                if (!user) {
                    throw new NotFoundError("User not found");
                }                
                //delete user
                await User.deleteOne({username});   
                //delete user in payment system
                const url = `http://localhost:3001/users/${username}/delete`;
                const options = {
                    "method": "DELETE"
                };
                //fetch API from payment system
                await fetch(url, options);  
                             
                res.status(StatusCodes.OK).json(user);
            } else {
                throw new UnauthorizedError('You are not manager');
            }
        } catch(err) {
            next(err);
        }
    }

    //[POST] /users/login
    async loginUser(req, res, next) {
        try {
            let token;
            const username = req.body.username;
            //manager user
            const userManager = await UserManager.findOne({username});
            if (userManager) {
                if (userManager.password === '') {
                    //return create password page
                    
                    res.status(StatusCodes.OK).json({token:undefined});
                    
                }
                else {
                    const isValidUser = await UserManager.checkCredentials(userManager, req.body.password);
                    if (isValidUser) {
                        //check if user manager is blocked by admin
                        if (!userManager.isBlock) {
                            token = await userManager.generateAuthToken();
                            res.status(StatusCodes.OK).json({userManager, token});
                        } else {
                            throw new UnauthorizedError('Your account has been blocked');
                        }
                    }
                    else {
                        throw new UnauthorizedError('Authentication failed');
                    }
                }
                return;
            }
            
            //normal user
            const user = await User.findOne({username});
            if (user) {
                if (user.password === '') {
                    //return create password page
                    
                    res.status(StatusCodes.OK).send({token:undefined});
                }    
                else {        
                    const isValidUser = await User.checkCredentials(user, req.body.password);
                    if (isValidUser) {
                        token = await user.generateAuthToken();
                        res.status(StatusCodes.OK).json({user, token});

                    }            
                    else {
                        throw new UnauthorizedError('Authentication failed');
                    }
                }    
                return;    
            }

            //user not exist
            throw new UnauthorizedError('Username not exist');
        } catch(err) {
            next(err);
        }
    }

    //[POST] /users/logout
    async logoutUser(req, res, next) {
        try {
            req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.token;
            })
            await req.user.save();
            res.status(StatusCodes.OK).send();
        } catch(err) {
            next(err);
        }
    }

    //[PATCH] /users/updatePassword
    async updatePassword(req, res, next) {
        try {                         
            req.user.password = req.body.password;
            await req.user.save();
            res.status(StatusCodes.OK).send();
        } catch(err) {
            next(err);
        }
    } 
}


module.exports = new UserController;