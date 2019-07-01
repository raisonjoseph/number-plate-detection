var logger = require('../config/logger');
const jwt = require('jsonwebtoken');
const config = require('../config/_config');


const User = require('../models/users');

async function userSignin(req, res) {
    try {

        username = req.body.username;
        password = req.body.password;
        if (!username || !password)
            return res.status(400).json({
                success: false,
                message: 'Bad request'
            });

        const user = await User.findOne({ username: username }).exec()
        if (user.password == password) {

            jwtPayload = { id: user._id, type: user.type }

            var jwtToken = await jwt.sign(jwtPayload, config.SECRET, {
                expiresIn: "365d" // expires in 7 days
            });
            return res.status(200).json({
                success: true,
                type: user.type,
                access_token: jwtToken
            });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Unable to authorize with given credentials'
            });

        }


    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

async function getUsers(req, res) {

    try {

        user = req.decoded.id;
        if (type != 1)
            return res.status(400).send({
                success: false,
                data: 'Bad request'
            });

        const users = await User.find({ admin: user }).exec();


        if (users && users.length) {
            res.status(200).json({
                success: true,
                data: users
            });

        } else {
            res.status(200).json({
                success: true,
                data: []
            });
        }

    } catch (error) {
        logger.error(error);
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }

}

async function userRegister(req, res) {
    try {

        username = req.body.username;
        password = req.body.name;
        type = req.body.type;


        if (token && user) {
            const user = await User.create({
                username: username,
                password: password,
                type: type
            });

            jwtPayload = { id: user._id, type: user.type }

            var jwtToken = await jwt.sign(jwtPayload, config.SECRET, {
                expiresIn: "365d" // expires in 7 days
            });

            return res.status(200).json({
                success: true,
                type: user.type,
                access_token: jwtToken
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Bad request'
            });
        }

    } catch (error) {
        logger.error(error);
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}


exports.userSignin = userSignin;
exports.userRegister = userRegister;
exports.getUsers = getUsers;