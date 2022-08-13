const mongoose = require('mongoose');
const {BadRequestError} = require('../../errors');

const necessaryPackageSchema = new mongoose.Schema({       
    name: {
        type: String,        
        trim: true,
        unique: true,
        required: true
    },
    necessaries: {
        type: [{
            necessary: {
                type: mongoose.Schema.Types.ObjectId,           
                ref: 'Necessary'
            }
        }],
        validate(value){
            if (value.length < 2) {
                throw new BadRequestError('Package should contain at least 2 necessary');
            }
        }
    },    
    limitQuantityOfNecessary: {
        type: Number,
        min: 1,                    
        required: true
    },
    limitQuantityOfPackageOverTime: {
        type: Number,   
        min: 1,                    
        required: true
    },
    limitTime: {
        type: Number, 
        required: true
    }
    
});
const NecessaryPackage = mongoose.model('NecessaryPackage', necessaryPackageSchema);

module.exports = NecessaryPackage;