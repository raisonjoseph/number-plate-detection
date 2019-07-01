const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/entry')


router.post('/create', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.saveEntries(req, res);
});

router.get('/', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.getEntries(req, res);
});


router.put('/accept/:id', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.acceptEntry(req, res);
});

router.put('/deny/:id', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.denyEntry(req, res);
});



module.exports = router;