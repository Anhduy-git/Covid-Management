const Necessary = require('../../models/Necessary/necessary');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthorizedError, NotFoundError} = require('../../errors');
const sharp = require('sharp');

//[POST] /necessaries/create
const createNecessary = async (req, res) => {
    const necessary = new Necessary(req.body);
    await necessary.save();
    res.status(StatusCodes.CREATED).json(necessary);    
};

//[GET] /necessaries/get
const getNecessaryList =  async (req, res) => {         
    const necessaries = await Necessary.find({});
    if (!necessaries) {
        throw new NotFoundError("List of necessaries not found");
    }
    res.status(StatusCodes.OK).json(necessaries);        
}

//[GET] /necessaries/get/:name
const getNecessaryByName =  async (req, res) => {
    const name = req.params.name;       
    const necessary = await Necessary.findOne({name});
    if (!necessary) {
        throw new NotFoundError("Necessary not found");
    }
    res.status(StatusCodes.OK).json(necessary);        
}

//[PATCH] /necessaries/update/:name
const updateNecessary = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'price', 'unit'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        throw new BadRequestError("Invalid update operation")
    }

    const name = req.params.name; 
    const necessary = await Necessary.findOne({name})                
    if (!necessary) {
        throw new NotFoundError("Necessary not found");
    }

    updates.forEach((update) => necessary[update] = req.body[update]);
    await necessary.save();

    res.status(StatusCodes.OK).json(necessary);    
};

//[DELETE] /necessaries/delete/:name
const deleteNecessaryByName = async (req, res) => {  
    const name = req.params.name;  
    const necessary = await Necessary.findOneAndDelete({name});
    if (!necessary) {
        throw new NotFoundError("Necessary not found");
    }
    res.status(StatusCodes.OK).json(necessary);      
}


//[POST] /necessaries/uploadImages/:name
const uploadNecessaryImages = async (req, res) => {

    const name = req.params.name; 
    const necessary = await Necessary.findOne({name})

    if (!necessary) {
        throw new NotFoundError("Necessary not found");
    }    
    
    for (const imageObject of req.files) {
        // resize and reformat image before saving
        image = await sharp(imageObject.buffer).resize({width: 250, height: 250}).png().toBuffer();    
        necessary.images = necessary.images.concat({image});     
    }

    await necessary.save();  
        
        
    res.status(StatusCodes.OK).send();   
};



module.exports = {
    createNecessary,
    getNecessaryList,
    getNecessaryByName,
    updateNecessary,
    deleteNecessaryByName,
    uploadNecessaryImages
};