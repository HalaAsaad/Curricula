const { User } = require("../models/user");
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Joi = require('joi'); 

exports.login = async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send({message: error.details[0].message});
    
    let findUser = await User.findOne({ email: req.body.email });
    if(!findUser) return res.status(400).send({ message: 'Invalid email or password.'});

    const validPassword = await bcrypt.compare( req.body.password , findUser.password)
    if(!validPassword) return res.status(400).send({ message: 'Invalid email or password.'});

    //const token = jwt.sign({ _id: findUser._id }, process.env.jwtPrivateKey);
    const token = findUser.generateAuthToken();
    res.send(token);
};

exports.PostReset = async (req, res, next) => {
    crypto.randomBytes(32, async (error, buffer) => {
        if(error) {
            res.send('error!');
            console.log(error);
            return;
        };
        const token = buffer.toString('hex');
        let findUser = await User.findOne({ email: req.body.email });
        if(!findUser) return res.status(400).send({ message: 'No account with that email found.'});
        console.log(findUser);
        findUser.resetToken = token;
        findUser.resetTokenExpiration = Date.now() + 3600000;
        return findUser.save()
        .then((res) => {
           
        }).catch((err) => {
            console.log(err)
        });
    })
};
function validate(req) {
    const schema = Joi.object({
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
    });
    return schema.validate(req);
};