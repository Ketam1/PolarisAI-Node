// Nodejs modules
const { dialogflow, SimpleResponse} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({ debug: true });

// Non-nodejs modules
const request = require('./connection/request');


app.intent('Let me make a request', async (conv) => {
    let input = "How is the weather going to be today?";
    conv.ask("Surely! What do you want?");
    data = await request.get(input);
    conv.ask(JSON.stringify(data))
    switch (data.code) {
      case 0:
        
      break;
      case 1:
        //Intent2 function goes here
      break;
      case 2:
        //Intent3 function goes here
      break;
      default:
        conv.close("Sorry, i did not understand, could you repeat?")
    }
});

app.intent('Goodbye', conv => {
  conv.close('See you later!')
})

exports.fulfillment = functions.https.onRequest(app);
