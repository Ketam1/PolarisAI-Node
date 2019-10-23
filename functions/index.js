const { dialogflow, SimpleResponse} = require('actions-on-google');
const functions = require('firebase-functions');

const app = dialogflow({ debug: true });

const actions = require('./actions.js')

app.intent('Let me make a request', (conv) => {
    input = conv.ask("Surely! What do you want?");
    data = await connectToApi(input);
    switch (data) {
      case intent1:
        //Intent1 function goes here
      break;
      case intent2:
        //Intent2 function goes here
      break;
      case intent3:
        //Intent3 function goes here
      break;
      default:
        conv.close("Sorry, i did not understand, could you repeat?")
    }
});

app.intent('Let me login', (conv) => {
    conv.ask("Alright, here is the login form:");
    // Login function goes here
});

app.intent('Let me register', (conv) => {
    conv.ask("Alright, here is the register form:");
    // Register function goes here
});

app.intent('Goodbye', conv => {
  conv.close('See you later!')
})

exports.fulfillment = functions.https.onRequest(app);
