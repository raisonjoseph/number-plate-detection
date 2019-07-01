var appRoot = require('app-root-path');
var winston = require('winston');


const errorStackTracerFormat = winston.format(info => {
    if (info.meta && info.meta instanceof Error) {
        info.message = `${info.message} ${info.meta.stack}`;
    }
    return info;
});


// define the custom settings for each transport (file, console)
const options = {
    file: {
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: false,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: true,
    },
    errorFile: {
        level: 'error',
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 100,
        colorize: true,
        format: winston.format.combine(
            winston.format.splat(), // This is necessary to produce the 'meta' attribute
            errorStackTracerFormat(),
            winston.format.simple()
        )
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};


// instantiate a new Winston Logger with the settings defined above
const logger = winston.createLogger({
    transports: [
        new winston.transports.File(options.errorFile),
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions

});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};

module.exports = logger;