var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Set up Mongo Schema
var EntrySchema = new mongoose.Schema({

    author: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    purpose: { type: String },
    status: { type: Number, default: 0 }, // 0-> pending, 1->accept, 2-> reject
    entry_time: { type: Date, default: Date.now },
    exit_time: { type: Date },

});


module.exports = mongoose.model('Entry', EntrySchema);