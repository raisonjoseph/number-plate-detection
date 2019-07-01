var firebase = require('firebase-admin');

async function sendToPlusTwo() {
    var topic = 'plustwo';

    var message = {
        notification: {
            title: '$GOOG up 1.43% on the day',
            body: '$GOOG gained 11.80 points to close at 835.67, up 1.43% on the day.'
        },
        topic: topic
    };

    // Send a message to devices subscribed to the provided topic.
    firebase.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

async function sendToDevice(token) {

    console.log(token)
    var message = {
        notification: {
            title: 'Someone at your door step',
            body: 'An unknown at your door step. Tap to review this activity.'
        },
        token: token
    };

    // Send a message to devices subscribed to the provided topic.
    firebase.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}


module.exports = { sendToPlusTwo, sendToDevice };