const mongoose = require('mongoose');


const wardSchema = new mongoose.Schema({       
    name: {
        type: String,        
        trim: true,
        required: true
    }
    
});
const Ward = mongoose.model('Ward', wardSchema);

module.exports = Ward;