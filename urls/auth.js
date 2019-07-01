const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/auth')

/**
 * Request for first time registeration
 *
 * @param {!string} phone
 * @param {!string} via - call or sms
 * 
 * Note that the token it return will expire in 5m
 */

router.post('/signin', async(req, res) => {
    controller.userSignin(req, res);
});


router.post('/register', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.userRegister(req, res);
});



router.get('/', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.getUsers(req, res);
});

module.exports = router;