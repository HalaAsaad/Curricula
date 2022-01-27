const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/', authController.login);
router.post('/resetPassword', authController.PostReset);


module.exports = router