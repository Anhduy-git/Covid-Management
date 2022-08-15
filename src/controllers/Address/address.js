const Address = require('../../models/Address/address');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError} = require('../../errors');

class AddressController {
    //[GET] /addresses/getAll
    async getAddressList (req, res, next) {
        try {
            const addresses = await Address.find({});
            if (!addresses) {
                throw new NotFoundError("List of addresses not found");
            }
            res.status(StatusCodes.OK).json(addresses);  
        } catch(err) {
            next(err);
        }
    };
}

module.exports = new AddressController;