const User = require('../models/users');
const Vehicle = require('../models/vechiles');
var logger = require('../config/logger');

async function addNewVehicle(req, res) {

    try {

        const user = req.decoded.id;
        const type = req.decoded.type;
        let name = req.body.name;
        let email = req.body.email;
        let phone = req.body.phone;
        let number = req.body.number;
        let veType = req.body.type;
        
        number = number.replace(/ +/g, "");
        number = number.toLowerCase();


        if (!veType || !number || !phone || !email || !name || type != 1)
            return res.status(400).send({
                success: false,
                data: 'Bad request'
            });

        const vechile = await Vehicle.create({
            author: user,
            name: name,
            email: email,
            phone: phone,
            number: number,
            type: veType
        });

        res.status(200).json({
            success: true,
            data: "Vehicle registered"
        });


    } catch (error) {
        logger.error(error.message);
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

async function searchVehicles(req, res) {

    let query = req.query.search;
    query = query.replace(/ +/g, "");

    if (!query) {
        return res.status(400).json({
            success: false,
            message: 'Bad request'
        });
    }

    try {
       // 'i' makes it case insensitive
        const vehcile = await Vehicle.findOne({ number: query }).exec();
console.log(vehcile);
        if (vehcile)
            res.status(200).json({
                sucess: true,
                data: "1"
            });
        else
            res.status(200).json({
                sucess: true,
                data: "0"
            });


    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation"
        });
    }
}

async function deleteVehcile(req, res) {
    try {
        user = req.decoded.id;
        let vechileId = req.params.id;


        if (!user || !vechileId) {

            return res.status(400).send({
                success: false,
                message: 'Bad request'
            });
        }

        const vechile = await Vehicle.deleteOne({ _id: vechileId }).exec();


        return res.status(200).json({
            success: true,
            data: "Vehicle deleted"
        });


    } catch (error) {
        logger.error(error.message);
        res.status(500).json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation " + error
        });
    }
}

async function getVehicles(req, res) {

    try {

        user = req.decoded.id;
        const type = req.decoded.type;

        if (type != 1)
            return res.status(400).send({
                success: false,
                data: 'Bad request'
            });

        const vechiles = await Vehicle.find({ author: user }).exec();


        if (vechiles && vechiles.length) {
            res.status(200).json({
                success: true,
                data: vechiles
            });

        } else {
            res.status(200).json({
                success: true,
                data: []
            });
        }

    } catch (error) {
        logger.error(error.message);
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }

}

module.exports = { addNewVehicle, deleteVehcile, getVehicles, searchVehicles }