const NecessaryPackage = require('../../models/Necessary/necessary-package');
const {StatusCodes} = require('http-status-codes');

//[POST] /necessaryPackages/create
const createNecessaryPackage = async (req, res) => {
    const necessaryPackage = new NecessaryPackage(req.body);
    await necessaryPackage.save();
    res.status(StatusCodes.CREATED).json(necessaryPackage);    
};

//[GET] /necessaryPackages/get
const getNecessaryPackageList =  async (req, res) => {         
    const necessaryPackages = await NecessaryPackage.find({}).populate('necessaries.necessary');
    if (!necessaryPackages) {
        throw new NotFoundError("List of necessary packages not found");
    }
    res.status(StatusCodes.OK).json(necessaryPackages);        
}

//[GET] /necessaryPackages/get/:name
const getNecessaryPackageByName =  async (req, res) => {
    const name = req.params.name;       
    const necessaryPackage = await NecessaryPackage.findOne({name}).populate('necessaries.necessary');
    if (!necessaryPackage) {
        throw new NotFoundError("Necessary package not found");
    }
    res.status(StatusCodes.OK).json(necessaryPackage);        
}

//[PATCH] /necessaryPackages/update/:name
const updateNecessaryPackage = async (req, res) => {
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
};

//[DELETE] /necessaryPackage/delete/:name
const deleteNecessaryPackageByName =  async (req, res) => {  
    const name = req.params.name;  
    const necessaryPackage = await NecessaryPackage.findOneAndDelete({name});
    if (!necessaryPackage) {
        throw new NotFoundError("Necessary package not found");
    }
    res.status(StatusCodes.OK).json(necessaryPackage);      
}

module.exports = {
    createNecessaryPackage,
    getNecessaryPackageList,
    getNecessaryPackageByName,
    updateNecessaryPackage,
    deleteNecessaryPackageByName
};