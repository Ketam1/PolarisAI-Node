// Nodejs modules
const { dialogflow, SimpleResponse} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({ debug: true });

// Non-nodejs modules
const request = require('./connection/request');


app.intent('Default Fallback Intent', async (conv) => {
    conv.ask("Surely! Here it is:");
    data = await request.get(conv.query);
    conv.ask(data.response);
    // switch (data.code) {
    //   case 0:
    //
    //   break;
    //   case 1:
    //     //Intent2 function goes here
    //   break;
    //   case 2:
    //     //Intent3 function goes here
    //   break;
    //   default:
    //     conv.close("Sorry, i did not understand, could you repeat?")
    // }
});

app.intent('Goodbye', conv => {
  conv.close('See you later!')
})

exports.fulfillment = functions.https.onRequest(app);
