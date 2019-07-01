var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Set up Mongo Schema
var VehicleSchema = new mongoose.Schema({

    author: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    email: { type: String, unique: true },
    phone: Number,
    number: String,
    type: Number,
    created_at: { type: Date, default: Date.now },

});


module.exports = mongoose.model('Vehicle', VehicleSchema);