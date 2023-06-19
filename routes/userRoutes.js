const express = require('express');
const { signIn, registerUser, userData } = require('../controllers/userController');

const router = express.Router();

router.route('/signin').post(signIn);

router.route('/registration').post(registerUser);

router.route('/profile/:id').get(userData);

module.exports = router;
