const TreatmentPlace = require('../../models/TreatmentPlace/treatment-place');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError, BadRequestError, UnauthorizedError} = require('../../errors');

//[POST] /treatmentPlaces/create
const createTreatmentPlace = async (req, res) => {
    //just admin can create new treatment place
    if (req.priority === 0) {
        const treatmentPlace = new TreatmentPlace(req.body);
        await treatmentPlace.save();
        res.status(StatusCodes.CREATED).json(treatmentPlace); 
    } else {
        throw new BadRequestError("You have no right to do create new treatment place");
    }
};

//[GET] /treatmentPlaces/getAll
const getTreatmentPlaceList = async (req, res) => {
    const treatmentPlaces = await TreatmentPlace.find({});
    if (!treatmentPlaces) {
        throw new NotFoundError("List of treatment places not found");
    }
    res.status(StatusCodes.OK).json(treatmentPlaces);     
};

//[PATCH] /treatmentPlaces/:name/update
const updateTreatmentPlace = async (req, res) => {
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
};



module.exports = {
    createTreatmentPlace,
    getTreatmentPlaceList,
    updateTreatmentPlace
};