var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Set up Mongo Schema
var UserSchema = new mongoose.Schema({

    username: { type: String, unique: true },
    password: String,
    type: Number,
    admin: { type: Schema.Types.ObjectId, ref: 'User', default: null }

});


module.exports = mongoose.model('User', UserSchema);