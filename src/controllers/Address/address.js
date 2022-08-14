const Address = require('../../models/Address/address');
const {StatusCodes} = require('http-status-codes');

//[GET] /addresses/getAll
const getAddressList = async (req, res) => {
    const addresses = await Address.find({});
    if (!addresses) {
        throw new NotFoundError("List of addresses not found");
    }
    res.status(StatusCodes.OK).json(addresses);     
};

module.exports = {
    getAddressList
};