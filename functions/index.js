// Nodejs modules
const { dialogflow, SimpleResponse} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({ debug: true });

// Non-nodejs modules
const request = require('./connection/request');


app.intent('Let me make a request', (conv) => {
    let input = "How is the weather going to be today?";
    conv.ask("Surely! What do you want?");
    data = request.get(input).data;
    conv.ask(new SimpleResponse({
      text: data,
    }));
    // switch (data) {
    //   case intent1:
    //     //Intent1 function goes here
    //   break;
    //   case intent2:
    //     //Intent2 function goes here
    //   break;
    //   case intent3:
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
