const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/firebase')

/**
 * Request for first time registeration
 *
 * 
 * Note that the token it return will expire in 5m
 */
router.post('/add', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.addFCMToken(req, res);
});


module.exports = router;