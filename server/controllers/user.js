const { User, validate } = require("../models/user");
const _ = require('lodash');
const bcrypt = require('bcryptjs');

exports.createUser =  async (req, res) => { // [ auth, admin ]
    const { error } = validate(req.body);
    if(error) return res.status(400).send({message: error.details[0].message});
  
    let findUser = await User.findOne({ email: req.body.email }).exec();
    if(findUser) return res.status(400).send({ message: 'User already registered.'});
    
    // findUser = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password
    // });
    findUser = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    findUser.password = await bcrypt.hash(findUser.password, salt);
    try {
        await findUser.save();
        // res.send(findUser);
        // const token = jwt.sign({ _id: findUser._id }, process.env.jwtPrivateKey);
        const token = findUser.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(findUser, ['_id', 'name', 'email']));
    } catch (error) {
        res.send({message: error.details[0].message})
    }
};

exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    try {
        res.send(user);  
    } catch (error) {
        console.log(error);
    }
   
    };