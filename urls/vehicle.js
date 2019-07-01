const express = require('express');
const router = express.Router();

const jwtUtil = require('../util/_jwt');
const controller = require('../controllers/vehicle')

router.post('/create', jwtUtil.verifyJWTTokenIsUser,async(req, res) => {
    controller.addNewVehicle(req, res);
});

router.get('/', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.getVehicles(req, res);
});

router.get('/search', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.searchVehicles(req, res);
});



router.delete('/delete/:id', jwtUtil.verifyJWTTokenIsUser, async(req, res) => {
    controller.deleteVehcile(req, res);
});

module.exports = router;