const mongoose = require('mongoose');


const citySchema = new mongoose.Schema({       
    name: {
        type: String,        
        trim: true,
        required: true
    },     
    districts: [{
        district: {
            // type: mongoose.Schema.Types.ObjectId,     
            // ref: 'District',
            // required: true
            name: {
                type: String,
                trim: true,
                required: true,                
            },
            wards: [{
                ward: {
                    name: {
                        type: String,
                        trim: true,
                        required: true
                    }
                }
            }]
        }
    }]    
    
});
const City = mongoose.model('City', citySchema);

module.exports = City;