require('dotenv').load();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var logger = require('./config/logger');
const morgan = require('morgan');
var firebase = require('firebase-admin');

var serviceAccount = require('./util/hogo-f583e-firebase-adminsdk-5pubx-ee2c0d946f.json');


// const passportConfig = require('./config/_passport');
const cors = require('cors');

const db = require('./config/_db'); // Do not delete this. This is a db connection.

const indexRouter = require('./routes/index');

const authRouter = require('./urls/auth');
const entryRouter = require('./urls/entry');
const vehicleRuter = require('./urls/vehicle');




// //Firebase init
// firebase.initializeApp({
//     credential: firebase.credential.cert(serviceAccount),
//     databaseURL: "https://hogo-f583e.firebaseio.com"
// });


const app = express();
app.use(cors());
app.use(morgan('common', { stream: logger.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); //setting middleware
app.use(express.static(path.join(__dirname, 'media'))); //setting middleware
app.use('/media', express.static(__dirname + '/media'));



app.use('/', indexRouter);
app.use('/app-auth', authRouter);
app.use('/entry', entryRouter);
app.use('/vehicle', vehicleRuter);

module.exports = app;