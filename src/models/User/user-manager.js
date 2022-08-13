const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userManagerSchema = new mongoose.Schema({      
    isAdmin: {
        type: Boolean,
        required: true
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
    }]
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

userManagerSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email});
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
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