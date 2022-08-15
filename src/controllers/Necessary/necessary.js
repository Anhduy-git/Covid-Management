const Necessary = require('../../models/Necessary/necessary');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, UnauthorizedError, NotFoundError} = require('../../errors');
const sharp = require('sharp');

class NecessaryController {
    //[POST] /necessaries/create
    async createNecessary(req, res, next) {
        try {
            if (req.priority === 1) {
                const necessary = new Necessary(req.body);
                await necessary.save();
                res.status(StatusCodes.CREATED).json(necessary); 
            } else {
                throw new UnauthorizedError('You are not manager');
            }
        } catch(err) {
            next(err);
        }
    };

    //[GET] /necessaries/getAll
    async getNecessaryList(req, res, next) {         
        try {
            if (req.priority === 1) {
                const necessaries = await Necessary.find({});
                if (!necessaries) {
                    throw new NotFoundError('List of necessaries not found');
                }
                res.status(StatusCodes.OK).json(necessaries); 
            } else {
                throw new UnauthorizedError('You are not manager');
            }
        } catch(err) {
            next(err);
        }
    }

    //[GET] /necessaries/:name/get/
    async getNecessaryByName(req, res, next) {
        try {
            if (req.priority === 1) {
                const name = req.params.name;       
                const necessary = await Necessary.findOne({name});
                if (!necessary) {
                    throw new NotFoundError('Necessary not found');
                }
                res.status(StatusCodes.OK).json(necessary);
            } else {
                throw new UnauthorizedError('You are not manager');
            }
        } catch(err) {
            next(err);
        }
    }

    //[PATCH] /necessaries/:name/update
    async updateNecessary(req, res, next) {
        try {
            if (req.priority === 1) {
                const updates = Object.keys(req.body);
                const allowedUpdates = ['name', 'price', 'unit'];
                const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        
                if (!isValidOperation) {
                    throw new BadRequestError('Invalid update operation');
                }
        
                const name = req.params.name; 
                const necessary = await Necessary.findOne({name})                
                if (!necessary) {
                    throw new NotFoundError('Necessary not found');
                }
        
                updates.forEach((update) => necessary[update] = req.body[update]);
                await necessary.save();
        
                res.status(StatusCodes.OK).json(necessary);  
            } else {
                throw new UnauthorizedError('You are not manager');
            }
        } catch(err) {
            next(err);
        }
    };

    //[DELETE] /necessaries/:name/delete
    async deleteNecessaryByName(req, res, next) {  
        try {
            if (req.priority === 1) {
                const name = req.params.name;  
                const necessary = await Necessary.findOneAndDelete({name});
                if (!necessary) {
                    throw new NotFoundError('Necessary not found');
                }
                res.status(StatusCodes.OK).json(necessary);      
            } else {
                throw new UnauthorizedError('You are not manager');
            }
        } catch(err) {
            next(err);
        }
    }


    //[POST] /necessaries/:name/uploadImages
    async uploadNecessaryImages(req, res, next) {
        try {
            if (req.priority === 1) {
                const name = req.params.name; 
                const necessary = await Necessary.findOne({name})
        
                if (!necessary) {
                    throw new NotFoundError('Necessary not found');
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
        } catch(err) {
            next(err);
        }     
    };
}



module.exports = new NecessaryController;