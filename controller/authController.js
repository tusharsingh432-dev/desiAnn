const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION
    });
}

exports.signup = async (req, res, next) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        });

        const token = createToken(newUser._id);

        res.status(201).json({
            status: `sucess`,
            token,
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({
            status: `Failed`,
            message: 'Internal Sever Error: Please try again',
            error
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).json({
                status: 'Failed',
                message: 'Please enter a valid email and password',
            })
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user || ! await user.correctPassword(password, user.password)) {
            return res.status(500).json({
                status: 'Failed',
                message: 'Please enter a valid email and password',
            })
        };

        const token = createToken(user._id);
        res.status(200).json({
            status: `Sucess`,
            token
        })
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: 'Internal Sever Error: Please try again',
            err
        })
    }
}

exports.protect = async (req, res, next) => {   /////////////MIDDLEWARE/////////////////////////
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'Please Login First',
        });
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'User No longer Exists',
        });
    }

    if (freshUser.passwordChanged(decoded.iat)) {
        return res.status(401).json({
            status: 'Unauthorized',
            message: 'Password Changed recently, Please Login again.',
        });
    }

    req.user = freshUser;

    next();
}

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        console.log(req.user.role)
        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                status: 'Unauthorized',
                message: 'You are Not authorized for this action!!'
            })
        }
        next();
    }
}

exports.forgotPassword = async (req, res, next) => {
    res.status(500).json({
        status: 'Failed',
        message: 'Path not yet defined.'
    });
}

exports.resetPassword = async (req, res, next) => {
    res.status(500).json({
        status: 'Failed',
        message: 'Path not yet defined.'
    });
}