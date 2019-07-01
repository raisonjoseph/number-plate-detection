// All the db configurations exists in this file.

// This app uses mongoose to connect with mongodb.
const mongoose = require('mongoose');

// Connection to the mongodb service.
try {
    mongoose.connect('mongodb://localhost/NumberPlate', { useNewUrlParser: true });
    mongoose.set('useFindAndModify', false);
} catch (error) {
    console.log(error)
}