// Node.js modules
const {dialogflow, Permission, BasicCard, Button, Image} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({ debug: true });
const {Card} = require('dialogflow-fulfillment');

// Non-Node.js modules
const request = require('./connection/request');
const actions = require('./actions/actions');

// Constants for intents code
const ADD_REMINDER = 0;
const MAKE_CALL    = 1;
const SHOW_WEATHER = 51;
const SHOW_NEWS    = 61;
const ADD_ALARM    = 4;
const SMALL_TALK   = 2;
const EASTER_EGG   = 6;

// Constant JSON's for user options
const location = {
  context: "For this I will need to know your location",
  permissions: 'DEVICE_COARSE_LOCATION'
}

// Constants for API's
const POLARIS_API = 'https://polarisai.azurewebsites.net/query/';
const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather?q=';
const WEATHER_ID = 'appid=49646766c165b4239b545f5b5e5d8f73';
const WEATHER_UNIT = 'units=metric'



app.intent('Default Fallback Intent', async (conv) => {
    data = await request.get(POLARIS_API + conv.query);
    let card;
    switch (data.code) {
      case ADD_REMINDER:
          actions.addReminder(conv);
      break;

      case MAKE_CALL:
        actions.makeCall(conv);
      break;

      case SHOW_WEATHER:
      card = new Card('sample card title');
      card.setImage('https://assistant.google.com/static/images/molecule/Molecule-Formation-stop.png');
      card.setText('sampletext');
      conv.ask(new SimpleResponse({
        text: "sample voice speech",
      }));
      conv.ask(card);
        conv.ask(new Permission(location));
      break;

      case SHOW_NEWS:
        actions.showNews(conv);
      break;

      case ADD_ALARM:
        actions.addAlarm(conv);
      break;

      case SMALL_TALK:
        actions.smallTalk(conv);
      break;

      case EASTER_EGG:
        actions.easterEgg(conv);
      break;
    }
});

app.intent('Get Permission', async (conv, granted) => {
  if(granted){
    let city = conv.device.location.city;
    weatherData = await request.get(WEATHER_API + (city + "&" + WEATHER_ID + "&" + WEATHER_UNIT));

  }
  else
    conv.close("I was not capable to get location to show weather");
})

app.intent('Goodbye', conv => {
  conv.close('See you later!')
})

exports.fulfillment = functions.https.onRequest(app);
