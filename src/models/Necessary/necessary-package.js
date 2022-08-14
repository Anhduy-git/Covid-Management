const mongoose = require('mongoose');
const {BadRequestError} = require('../../errors');
const Necessary = require('./necessary');

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
                required: true,
                ref: 'Necessary'
            },
            quantity: {
                type: Number,
                default: 1
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
    },
    totalPrice: {
        type: Number,
        default: 0
    }
    
});

necessaryPackageSchema.pre('save', async function(next) {
    var totalPrice = 0
    for (item of this.necessaries) {
        const necessary = await Necessary.findById(item.necessary);
        totalPrice += (necessary.price * item.quantity);
    }
    this.totalPrice = totalPrice;        

    next(); //go to save the package
})

const NecessaryPackage = mongoose.model('NecessaryPackage', necessaryPackageSchema);



module.exports = NecessaryPackage;