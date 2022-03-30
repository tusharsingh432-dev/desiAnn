const mongoose = require("mongoose");
const validator = require(`validator`);
const bcrypt = require(`bcryptjs`);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `Name is required`]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Invalid Email']
        // {
        //     validator: function (val) {
        //         validator.isEmail(val);
        //     },
        //     message: `Invalid Email`
        // }
    },
    photo: String,
    role: {
        type: String,
        enum: ['admin', 'restaurent', 'user'],
        default: 'user',
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        select: false
    },
    passwordConf: {
        type: String,
        required: true,
        validate: {
            validator: function (val) {
                return val == this.password
            },
            message: `Passwords not same`
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetTokenValidity: Date
})

userSchema.pre(`save`, async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConf = undefined;
    next();
});

userSchema.methods.correctPassword = async function (candidate, password) {
    return await bcrypt.compare(candidate, password);
};

////////////////////////////////////////////////////////////////////////////////////////////////
const User = mongoose.model('User', userSchema);

module.exports = User;