const { dialogflow, SimpleResponse} = require('actions-on-google');
const functions = require('firebase-functions');

const Request = require('./connection/request');

const app = dialogflow({ debug: true });

const API_URL = 'https://polarisai.azurewebsites.net/query/';


app.intent('Let me make a request', (conv) => {
    let request = new Request();
    let input = "How is the weather going to be today?";
    

    conv.ask("Surely! What do you want?");
    conv.ask(data);
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
