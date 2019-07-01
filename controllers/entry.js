const User = require('../models/users');
const Entry = require('../models/entry');
var logger = require('../config/logger');


async function getEntries(req, res) {
    try {
        user = req.decoded.id;
        type = req.decoded.type;

        

        let entries;
        
        if (type == 1)
           entries =  await Entry.find({ author: user }).exec();
        else{
            
            const admin = await User.findById(user).exec();
            
            entries= await Entry.find({ author: admin.admin }).exec();
        }
        
        console.log(entries);

        if (entries && entries.length) {
            res.status(200).json({
                success: true,
                data: entries
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

async function saveEntries(req, res) {

    try {

        const user = req.decoded.id;
        const type = req.decoded.type;
        let name = req.body.name;
        let purpose = req.body.purpose;


        if (!purpose || !name || type != 0)
            return res.status(400).send({
                success: false,
                data: 'Bad request'
            });

        const admin = await User.findById(user).exec();
        console.log(admin)
        const entry = await Entry.create({
            author: admin.admin,
            name: name,
            status:0,
            purpose: purpose
        });

        res.status(200).json({
            success: true,
            data: "Entry registered"
        });

        //TODO dispatch notification


    } catch (error) {
        logger.error(error.message);
        res.json({
            success: false,
            message: "Yikes! An error occured, we are sending expert monkeys to handle the situation "
        });
    }
}

async function acceptEntry(req, res) {

    try {

        user = req.decoded.id;

        const type = req.decoded.type;
        let entryId = req.params.id;
        // TODO retrun only the jobs the user didnt registerd

        const entry = await Entry.findById(entryId).exec();

        if (entryId && entry && type == 1) {


            entry.status = 1;
            await entry.save();

            res.status(200).json({
                success: true,
                data: "Entry accepted"
            });

        } else {

            return res.status(400).send({
                success: false,
                message: 'Bad request'
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


async function denyEntry(req, res) {

    try {

        user = req.decoded.id;
        type = req.decoded.type;
        let entryId = req.params.id;
        // TODO retrun only the jobs the user didnt registerd

        const entry = await Entry.findById(entryId).exec();

        if (entryId && entry && type == 1) {


            entry.status = 2;
            await entry.save();

            res.status(200).json({
                success: true,
                data: "Entry denied"
            });

        } else {

            return res.status(400).send({
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


module.exports = { saveEntries, denyEntry, acceptEntry, getEntries }