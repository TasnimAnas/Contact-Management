const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add the name'],
        },
        email: {
            type: String,
            required: [true, 'Please add the email'],
            unique: [true, 'User already exist'],
        },
        phone: {
            type: String,
            required: [true, 'Please add the phone'],
        },
        password: {
            type: String,
            required: [true, 'Password required'],
        },
    },
    {
        timestamps: true,
    }
);
module.exports = mongoose.model('user', userSchema);
