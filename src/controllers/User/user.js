const User = require('../../models/User/user');
// const auth = require('../middleware/authentication');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError, BadRequestError} = require('../../errors');

//[POST] /users/create
const createUser = async (req, res) => {
    const user = new User(req.body);
    await user.save();        
    const token = await user.generateAuthToken();
    res.status(StatusCodes.CREATED).json({user, token});    
};

//[GET] /users/get
const getUserList =  async (req, res) => {         
    const users = await User.find({});
    if (!users) {
        throw new NotFoundError("List of users not found");
    }
    res.status(StatusCodes.OK).json(users);        
}

//[GET] /users/get/:identityCard
const getUserByIdentity =  async (req, res) => {
    const identityCard = req.params.identityCard;       
    const user = await User.findOne({identityCard});
    if (!user) {
        throw new NotFoundError("User not found");
    }
    res.status(StatusCodes.OK).json(user);        
}

//[PATCH] /users/update/:identityCard
const updateUserByIdentity =  async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['state', 'placeOfTreatment'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new BadRequestError("Invalid update operation")
    }

    const identityCard = req.params.identityCard; 
    const user = await User.findOne({identityCard})                
    if (!user) {
        throw new NotFoundError("User not found");
    }

    updates.forEach((update) => user[update] = req.body[update]);
    await user.save();

    res.status(StatusCodes.OK).json(user);  
}

module.exports = {
    createUser,
    getUserList,
    getUserByIdentity,
    updateUserByIdentity
};