// const _ = require('lodash');
// const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const { User, validate } = require("../models/user");
const auth = require('../middleware/auth');
// const admin = require('../middleware/admin');
const userControllers = require('../controllers/user');

// router.get('/me', auth, async (req, res) => {
// const user = await User.findById(req.user._id).select('-password');
// res.send(user);
// });
router.get('/:id', auth, userControllers.getUser);
router.post('/', userControllers.createUser);

module.exports = router;