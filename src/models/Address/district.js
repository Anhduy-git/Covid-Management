const mongoose = require('mongoose');


const districtSchema = new mongoose.Schema({       
    name: {
        type: String,        
        trim: true,
        required: true
    },     
    wards: [{
        ward: {
            type: mongoose.Schema.Types.ObjectId,     
            ref: 'Ward',
            required: true
        }
    }]    
    
});
const District = mongoose.model('District', districtSchema);

module.exports = District;