const redis = require('redis');
const client = redis.createClient();
const logger = require('../config/logger');
const { promisify } = require('util');


// IDK should we create and destory client on each request? or keep the client running? Will it cause memory leak??
// Check error
client.on("error", function(err) {
    console.log("Error " + err);
});
// Check connectivity
client.on('connect', function() {
    console.log('Redis client connected');
});

// Requred to get data from the redis server by async
const getAsync = promisify(client.get).bind(client);

async function redisSetData(key, value) {
    const reply = await client.set(key, value, function(error, result) {
        if (error) {
            console.log(error);
            throw error;
        }
    });
}


async function redisGetData(key) {
    let res = '';

    await getAsync(key).then(function(result) {
        res = result;
    });
    return res;
}

module.exports = { redisGetData, redisSetData }