const jwt = require('jsonwebtoken');
const config = require('../config/_config');

const verifyJWTTokenIsEditor = async(req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.SECRET, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });

            } else {
                // if everything is good, save to request for use in other routes
                if (!(decoded.type === 'editor' || decoded.type === 'admin')) {
                    return res.status(401).json({ success: false, message: 'Your are not a superuser!' })
                }
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

        // next();

    }
}

const verifyJWTTokenIsAdmin = async(req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.SECRET, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });

            } else {
                // if everything is good, save to request for use in other routes
                if (!(decoded.type === 'admin')) {
                    return res.status(401).json({ success: false, message: 'Your are not an admin!' })
                }
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        // next();
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
}

const verifyJWTTokenIsUser = async(req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.SECRET, function(err, decoded) {
            if (err) {
                return res.status(401).json({ success: false, message: 'Failed to authenticate token : ' + err.message });

            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        // next();
        return res.status(401).send({
            success: false,
            message: 'Authorization denied.'
        });

    }
}



const verifyJWTRefresh = async(req, res, next) => {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, process.env.REFRESH_TOK_SECRET, function(err, decoded) {
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token : ' + err.message });

            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        // next();
        return res.status(401).send({
            success: false,
            message: 'Authorization denied.'
        });

    }
}



exports.verifyJWTTokenIsAdmin = verifyJWTTokenIsAdmin;
exports.verifyJWTTokenIsEditor = verifyJWTTokenIsEditor;
exports.verifyJWTTokenIsUser = verifyJWTTokenIsUser;
exports.verifyJWTRefresh = verifyJWTRefresh;