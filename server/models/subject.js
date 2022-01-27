const mongoose = require('mongoose');
const Joi = require('joi'); 

const subjectSchema = new mongoose.Schema({
    name : {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        require: true
    }
});

function validateSubject(subject) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        description: Joi.string()
            .max(150)
            .required(),
        active: Joi.boolean()
    });

    return schema.validate(subject);
}
exports.Subject = mongoose.model('Subject', subjectSchema);
exports.validate = validateSubject;