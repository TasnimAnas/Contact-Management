const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// @desc User registration
// @path POST /api/user/registration
// @access Public

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name, phone } = req.body;
    if (!email || !password || !name || !phone) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
        res.status(400);
        throw new Error('User already exist');
    }
    const user = await User.create({
        email,
        password,
        name,
        phone,
    });
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});

// @desc User Login
// @path POST /api/user/signin
// @access Public

const signIn = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        res.status(400);
        throw new Error("Credential didn't match");
    }
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});

// @desc User data
// @path POST /api/user/profile/:id
// @access Private
const userData = (req, res) => {
    res.json({
        message: 'Profile',
    });
};

module.exports = { registerUser, signIn, userData };
