const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {BadRequestError, UnauthorizedError} = require('../../errors');
require('dotenv').config();

const userManagerSchema = new mongoose.Schema({      
    isAdmin: {
        type: Boolean,        
        default: false
    },   
    username: {
        type: String,
        required: true,        
        minlength: 5,
        trim: true,
        unique: true,
        validate(value) {
            if (value.toLowerCase().includes('username')) {
                throw new Error('Username cannot contain "username"');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"');
            }
        }

    },    
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    isBlock: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

//override toJSON method, call with res.send a user
userManagerSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();


    delete userObject.password;
    delete userObject.tokens;    

    return userObject;
}

userManagerSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userManagerSchema.statics.findByCredentials = async(username, password) => {
    const user = await UserManager.findOne({username});
    if (!user) {
        return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new UnauthorizedError('Authentication failed');
    } 
    return user;
}


//Hash the plain text password before saving
userManagerSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next(); //go to save the user
})



const UserManager = mongoose.model('UserManager', userManagerSchema);

module.exports = UserManager;