const { dialogflow, SimpleResponse} = require('actions-on-google');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const app = dialogflow({ debug: true });

app.intent('Let me make a request', (conv) => {
    conv.ask("Debug text");
});

exports.fulfillment = functions.https.onRequest(app);
