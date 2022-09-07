const mongoose = require('mongoose');
const NecessaryPackage = require('../Necessary/necessary-package');



const transactionSchema = new mongoose.Schema({   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    necessaryPackages: [{        
        necessaryPackage: {
            type: mongoose.Schema.Types.ObjectId,     
            required: true,      
            ref: 'NecessaryPackage'
        },
        quantity: {
            type: Number,            
            default: 1
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    }
    
},{
    //date of transaction
    timestamps: true
});

transactionSchema.pre('save', async function(next) {
    var totalPrice = 0
    for (item of this.necessaryPackages) {
        const necessaryPackage = await NecessaryPackage.findById(item.necessaryPackage);
        totalPrice += (necessaryPackage.totalPrice * item.quantity);
    }
    this.totalPrice = totalPrice;        

    next(); //go to save the package
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;