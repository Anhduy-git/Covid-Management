const Necessary = require('../../models/Necessary/necessary');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthorizedError, NotFoundError} = require('../../errors');
const sharp = require('sharp');

//[POST] /necessaries/create
const createNecessary = async (req, res) => {
    if (req.priority === 1) {
        const necessary = new Necessary(req.body);
        await necessary.save();
        res.status(StatusCodes.CREATED).json(necessary); 
    } else {
        throw new UnauthorizedError('You are not manager');
    }
};

//[GET] /necessaries/getAll
const getNecessaryList =  async (req, res) => {         
    if (req.priority === 1) {
        const necessaries = await Necessary.find({});
        if (!necessaries) {
            throw new NotFoundError("List of necessaries not found");
        }
        res.status(StatusCodes.OK).json(necessaries); 
    } else {
        throw new UnauthorizedError('You are not manager');
    }
}

//[GET] /necessaries/:name/get/
const getNecessaryByName =  async (req, res) => {
    if (req.priority === 1) {
        const name = req.params.name;       
        const necessary = await Necessary.findOne({name});
        if (!necessary) {
            throw new NotFoundError("Necessary not found");
        }
        res.status(StatusCodes.OK).json(necessary);
    } else {
        throw new UnauthorizedError('You are not manager');
    }
}

//[PATCH] /necessaries/:name/update
const updateNecessary = async (req, res) => {
    if (req.priority === 1) {
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
    } else {
        throw new UnauthorizedError('You are not manager');
    }
};

//[DELETE] /necessaries/:name/delete
const deleteNecessaryByName = async (req, res) => {  
    if (req.priority === 1) {
        const name = req.params.name;  
        const necessary = await Necessary.findOneAndDelete({name});
        if (!necessary) {
            throw new NotFoundError("Necessary not found");
        }
        res.status(StatusCodes.OK).json(necessary);      
    } else {
        throw new UnauthorizedError('You are not manager');
    }
}


//[POST] /necessaries/:name/uploadImages
const uploadNecessaryImages = async (req, res) => {
    if (req.priority === 1) {
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
    } else {
        throw new UnauthorizedError('You are not manager');
    }
     
};



module.exports = {
    createNecessary,
    getNecessaryList,
    getNecessaryByName,
    updateNecessary,
    deleteNecessaryByName,
    uploadNecessaryImages
};