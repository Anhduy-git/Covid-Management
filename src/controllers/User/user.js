const User = require('../../models/User/user');
const UserManager = require('../../models/User/user-manager');
const TreatmentPlace = require('../../models/TreatmentPlace/treatment-place');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError, BadRequestError, UnauthorizedError} = require('../../errors');

//[POST] /users/create
const createUser = async (req, res) => {
    if (req.priority === 1) {
        const user = new User(req.body);
        await user.save();                
        res.status(StatusCodes.CREATED).json(user);   
    } else {
        throw new UnauthorizedError('You are not manager');
    }
};

//[GET] /users/getAll
const getUserList =  async (req, res) => {         
    if (req.priority === 1) {
        const users = await User.find({});
        if (!users) {
            throw new NotFoundError("List of users not found");
        }
        res.status(StatusCodes.OK).json(users);   
    } else {
        throw new UnauthorizedError('You are not manager');
    }
}

//[GET] /users/:identityCard/get
const getUserByIdentity =  async (req, res) => {
    if (req.priority === 1) {
        const identityCard = req.params.identityCard;       
        const user = await User.findOne({identityCard});
        if (!user) {
            throw new NotFoundError("User not found");
        }
        res.status(StatusCodes.OK).json(user);
    } else {
        throw new UnauthorizedError('You are not manager');
    }
}

//[GET] /users/me
const getCurrentUser =  async (req, res) => {
    if (req.priority === 2) {        
        res.status(StatusCodes.OK).json(req.user);
    } else {
        throw new UnauthorizedError('You are not a user');
    }
}

//[POST] /users/payOff
const payOffDebt = async (req, res) => {
    if (req.priority === 2) {
        //remaining balance in user account (on payment service)
        var remainingBalance = 300;
        //Minimum amount to pay off each time
        const minimumPayment = req.user.debt * 0.05;        
        //payoff debt
        if (remainingBalance >= minimumPayment) {
            if (remainingBalance >= req.user.debt) {
                remainingBalance -= req.user.debt;                
                req.user.debt = 0;
            } else {
                req.user.debt -= remainingBalance;
                remainingBalance = 0;                
            }
        } else {
            throw new BadRequestError('Not enough money in account');
        }        
        await req.user.save();
        res.status(StatusCodes.CREATED).json(req.user);   
    } else {
        throw new UnauthorizedError('You are not a user');
    }
};

//[PATCH] /users/:identityCard/update
const updateUserByIdentity =  async (req, res) => {
    if (req.priority === 1) {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['state', 'placeOfTreatment', 'relatedUsers'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new BadRequestError("Invalid update operation")
        }

        const identityCard = req.params.identityCard; 
        const user = await User.findOne({identityCard})                
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
}

//[POST] /users/login
const loginUser = async (req, res) => {   

    //first time server start, then create admin account        
    const users = await UserManager.find({});
    if (users.length == 0) { 
        const user = new UserManager(req.body);
        user.isAdmin = true;
        await user.save();        
        const token = await user.generateAuthToken();
        res.status(StatusCodes.CREATED).json({user, token});
    }       
      
    
    let token;
    //manager user    
    const userManager = await UserManager.findByCredentials(req.body.username, req.body.password);
    if (userManager) {            
        if (!userManager.isBlock) {
            token = await userManager.generateAuthToken();
            res.status(StatusCodes.OK).json({userManager, token});
        } else {
            throw new UnauthorizedError('Your account has been blocked');
        }
    }
    //normal user
    else {        
        const user = await User.findByCredentials(req.body.username, req.body.password);
        if (user) {        
            token = await user.generateAuthToken();
            res.status(StatusCodes.OK).json({user, token});
        }
        //username not exist
        else {
            throw new UnauthorizedError('Authentication failed');
        }
    }        
}

//[POST] /users/logout
const logoutUser = async (req, res) => {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
    })
    await req.user.save();
    res.status(StatusCodes.OK).send();   
}


module.exports = {
    createUser,
    getUserList,
    getUserByIdentity,
    updateUserByIdentity,
    getCurrentUser,
    payOffDebt,
    loginUser,
    logoutUser
};