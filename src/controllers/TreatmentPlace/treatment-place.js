const TreatmentPlace = require('../../models/TreatmentPlace/treatment-place');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError, BadRequestError, UnauthorizedError} = require('../../errors');

class TreatmentPlaceController {
    //[POST] /treatmentPlaces/create
    async createTreatmentPlace(req, res, next) {
        try {
            //just admin can create new treatment place
            if (req.priority === 0) {
                const treatmentPlace = new TreatmentPlace(req.body);
                await treatmentPlace.save();
                res.status(StatusCodes.CREATED).json(treatmentPlace); 
            } else {
                throw new BadRequestError("You have no right to do create new treatment place");
            }
        } catch(err) {
            next(err);
        }
    };

    //[GET] /treatmentPlaces/getAll
    async getTreatmentPlaceList(req, res, next) {
        try {
            const treatmentPlaces = await TreatmentPlace.find({});
            if (!treatmentPlaces) {
                throw new NotFoundError("List of treatment places not found");
            }
            res.status(StatusCodes.OK).json(treatmentPlaces);   
        } catch(err) {
            next(err);
        }
    };

    //[PATCH] /treatmentPlaces/:name/update
    async updateTreatmentPlace(req, res, next) {
        try {
            //just admin can update treatment place
            if (req.priority === 0) {
                const updates = Object.keys(req.body);
                const allowedUpdates = ['name', 'capacity', 'currentPatients'];
                const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

                if (!isValidOperation) {
                    throw new BadRequestError("Invalid update operation")
                }

                const name = req.params.name; 
                const treatmentPlace = await TreatmentPlace.findOne({name})                
                if (!treatmentPlace) {
                    throw new NotFoundError("Treatment place not found");
                }

                updates.forEach((update) => treatmentPlace[update] = req.body[update]);
                await treatmentPlace.save();

                res.status(StatusCodes.OK).json(treatmentPlace);  
            } else {
                throw new BadRequestError("You have no right to do update treatment place");
            }
        } catch(err) {
            next(err);
        }
    };
}



module.exports = new TreatmentPlaceController;