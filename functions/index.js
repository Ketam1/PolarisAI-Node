// Node.js modules
const {dialogflow, SimpleResponse, BasicCard, Image, Permission, Button, UpdatePermission} = require('actions-on-google');
const functions = require('firebase-functions');
const app = dialogflow({ debug: true });

// Non-Node.js modules
const request = require('./connection/request');
const actions = require('./actions/actions');

// Constants for intents code
const ADD_REMINDER_R = 31;
const ADD_REMINDER_N = 32;
const MAKE_CALL    = 1;
const SHOW_WEATHER = 51;
const SHOW_NEWS    = 61;
const ADD_ALARM    = 4;
const SMALL_TALK   = 2;
const EASTER_EGG   = 6;

// Constant JSON's for user options
const location = {
  context: 'For this I will need to know your location',
  permissions: 'DEVICE_COARSE_LOCATION'
}

const notification = {
  intent: 'Notification',
}

// Constants for API's
const POLARIS_API = 'https://polarisai.azurewebsites.net/query/';
const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather?q=';
const WEATHER_ID = 'appid=49646766c165b4239b545f5b5e5d8f73';
const WEATHER_UNIT = 'units=metric';

const NEWS_API = 'http://newsapi.org/v2/top-headlines?';
const NEWS_ID = 'apiKey=253bdfcd7cb24278806507d0bf81d9f5';
const NEWS_COUNTRY = "country=us";



app.intent('Default Fallback Intent', async (conv) => {
    const data = await request.get(POLARIS_API + conv.query);
    let newsData;


    switch (data.code) {
      case ADD_REMINDER_R:
          conv.ask(new UpdatePermission(notification));

      break;

      case MAKE_CALL:
        actions.makeCall(conv, data);
      break;

      case SHOW_WEATHER:
        conv.ask(new Permission(location));
      break;

      case SHOW_NEWS:
        newsData = await request.get(NEWS_API + (NEWS_COUNTRY + '&' + NEWS_ID));
        actions.showNews(conv, newsData, data);
      break;

      case ADD_ALARM:
        actions.addAlarm(conv, data);
      break;

      case SMALL_TALK:
        actions.smallTalk(conv, data);
      break;

      case EASTER_EGG:
        actions.easterEgg(conv, data);
      break;
    }
});

app.intent('Get Permission', async (conv, granted) => {
  if(granted){
    conv.ask("zada");
    let city = conv.device.location.city;
    let query =  city + "&" + WEATHER_ID + "&" + WEATHER_UNIT;
    let weatherData = await request.get(WEATHER_API + query);
    actions.showWeather(conv, weatherData, city);
  }
  else
    conv.ask("I was not capable to get permissions to do that.");
});

app.intent('Goodbye', conv => {
  conv.close('See you later!')
});

exports.fulfillment = functions.https.onRequest(app);
