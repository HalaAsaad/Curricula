const mongoose = require('mongoose');
const Joi = require('joi'); 
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type: String,
        require: true,
        minLength: 3,
        maxLength: 50
    },
    email : {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 255,
        unique: true
    },
    password : {
        type: String,
        require: true,
        minLength: 5,
        maxLength: 1024
    },
    isAdmin: Boolean,
    resetToken: String,
    resetTokenExpiration: Date
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.jwtPrivateKey);
    return token;
}

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(3)
            .max(50)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    });
    return schema.validate(user);
}

exports.User = mongoose.model('User', userSchema);
exports.validate = validateUser;