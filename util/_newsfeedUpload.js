const multer = require('multer');


const Storage = multer.diskStorage({

    destination: function(req, file, callback) {
        callback(null, "./media");
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + "_" + file.originalname);
    }
});


const upload = multer({ storage: Storage }).array("image", 3); //Field name and max count

exports.upload = upload