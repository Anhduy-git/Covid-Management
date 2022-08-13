const TreatmentPlace = require('../../models/TreatmentPlace/treatment-place');
const {StatusCodes} = require('http-status-codes');

//[POST] /treatmentPlaces/create
const createTreatmentPlace = async (req, res) => {
    const treatmentPlace = new TreatmentPlace(req.body);
    await treatmentPlace.save();
    res.status(StatusCodes.CREATED).json(treatmentPlace);    
};

module.exports = {
    createTreatmentPlace
};