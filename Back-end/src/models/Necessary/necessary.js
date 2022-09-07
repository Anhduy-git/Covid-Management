const mongoose = require('mongoose');


const necessarySchema = new mongoose.Schema({       
    name: {
        type: String,        
        trim: true,
        unique: true,
        required: true
    },     
    price: {
        type: Number,
        min: 0,               
        required: true
    },
    unit: {
        type: String,              
        required: true,              
    },
    images: [{
        image: {
            type: Buffer,           
        }
    }]
    
});
const Necessary = mongoose.model('Necessary', necessarySchema);

module.exports = Necessary;