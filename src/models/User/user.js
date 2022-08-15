const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {BadRequestError, UnauthorizedError} = require('../../errors');

require('dotenv').config();

const userSchema = new mongoose.Schema({       
    name: {
        type: String,        
        trim: true,
        required: true
    },     
    identityCard: {
        type: String,        
        trim: true,
        unique: true,
        required: true
    },
    yearOfBirth: {
        type: String,        
        trim: true,   
        required: true          
    },
    address: {
        type: String,       
        trim: true,    
        required: true
    },
    state: {
        type: String,        
        trim: true, 
        required: true,
        enum:['F0', 'F1', 'F2', 'F3']
    },
    placeOfTreatment: {
        type: String,  
        trim: true,      
        required: true
    },
    relatedUsers: [{
        relatedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],    
    debt: {
        type: Number,
        default: 0
    },
    managedProcesses: {
        type: [{
            date: {
                type: Date,
                default: Date.now
            },
            activity: {
                type: String,
                required: true
            }
        }]
    },
    username: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        unique: true,
        validate(value) {
            if (value.toLowerCase().includes('username')) {
                throw new UnauthorizedError('Username cannot contain "username"');
            }
        }
    },
    password: {
        type: String,
        default: '',        
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new UnauthorizedError('Password cannot contain "password"');
            }
        }

    },    
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
    
});



//override toJSON method, call with res.send a user
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject(); 

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.checkCredentials = async(user, password) => {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
}


//Hash the plain text password before saving
userSchema.pre('save', async function(next) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next(); //go to save the user
})

//Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {
    const user = this

    await Task.deleteMany({owner: user._id})

    next(); //go to save the user
})

const User = mongoose.model('User', userSchema);

module.exports = User;