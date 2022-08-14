const NecessaryPackage = require('../../models/Necessary/necessary-package');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthorizedError, NotFoundError} = require('../../errors');
const Transaction = require('../../models/Activity/transaction');

//[POST] /necessaryPackages/create
const createNecessaryPackage = async (req, res) => {
    if (req.priority === 1) {
        const necessaryPackage = new NecessaryPackage(req.body);
        await necessaryPackage.save();
        res.status(StatusCodes.CREATED).json(necessaryPackage);    
    } else {
        throw new UnauthorizedError('You are not manager');
    }
};

//[GET] /necessaryPackages/getAll
const getNecessaryPackageList =  async (req, res) => {         
    const necessaryPackages = await NecessaryPackage.find({}).populate('necessaries.necessary');
    if (!necessaryPackages) {
        throw new NotFoundError("List of necessary packages not found");
    }
    res.status(StatusCodes.OK).json(necessaryPackages);        
}

//[GET] /necessaryPackages/:name/get
const getNecessaryPackageByName =  async (req, res) => {
    const name = req.params.name;       
    const necessaryPackage = await NecessaryPackage.findOne({name}).populate('necessaries.necessary');
    if (!necessaryPackage) {
        throw new NotFoundError("Necessary package not found");
    }
    res.status(StatusCodes.OK).json(necessaryPackage);        
}

//[PATCH] /necessaryPackages/:name/update
const updateNecessaryPackage = async (req, res) => {
    if (req.priority === 1) {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'necessaries', 'limitQuantityOfNecessary', 'limitQuantityOfPackageOverTime', 'limitTime'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            throw new BadRequestError("Invalid update operation")
        }

        const name = req.params.name; 
        const necessaryPackage = await NecessaryPackage.findOne({name})                
        if (!necessaryPackage) {
            throw new NotFoundError("Necessary package not found");
        }

        updates.forEach((update) => necessaryPackage[update] = req.body[update]);
        await necessaryPackage.save();

        res.status(StatusCodes.OK).json(necessaryPackage);   
    } else {
        throw new UnauthorizedError('You are not manager');
    }
};

//[DELETE] /necessaryPackage/:name/delete
const deleteNecessaryPackageByName =  async (req, res) => {  
    if (req.priority === 1) {
        const name = req.params.name;  
        const necessaryPackage = await NecessaryPackage.findOneAndDelete({name});
        if (!necessaryPackage) {
            throw new NotFoundError("Necessary package not found");
        }
        res.status(StatusCodes.OK).json(necessaryPackage);
    } else {
        throw new UnauthorizedError('You are not manager');
    }
}

//[POST] /necessaryPackages/buy
const buyNecessaryPackages = async (req, res) => {
    //update transaction history
    const necessaryPackages = req.body.necessaryPackages;
    const userId = req.user._id;
    const transaction = new Transaction({
        user:userId,
        necessaryPackages
    })
    //update debt of user
    const savedTransaction = await transaction.save();        
    req.user.debt += savedTransaction.totalPrice;
    await req.user.save();

    res.status(StatusCodes.OK).json(transaction);    
};

module.exports = {
    createNecessaryPackage,
    getNecessaryPackageList,
    getNecessaryPackageByName,
    updateNecessaryPackage,
    deleteNecessaryPackageByName,
    buyNecessaryPackages
};