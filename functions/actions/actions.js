const request = require('./../connection/request');
const { dialogflow,
      SimpleResponse,
      BasicCard,
      Image,
      Permission,
      Button } = require('actions-on-google');


module.exports = {

  addReminder: function (conv, data) {
    conv.ask(data.response);
  },

  makeCall: function (conv, data) {
    conv.ask(data.response);
  },

  showWeather: function (conv, weatherData, city) {
    let weatherMain = weatherData.main;
    let weatherDesc = weatherData.weather[0];
    conv.ask(new SimpleResponse({
        speech: 'The weather is going to be '
        + weatherDesc.description + '  \n'
        + 'The maximum temperature today is going to be '
        + weatherMain.temp_max + '°C  \n'
        + 'and the minimum temperature is going to be '
        + weatherMain.temp_min + '°C  \n',
    }));
    
    conv.ask(new BasicCard({
        title: 'Weather for ' + city,
        image: new Image({
            url: 'https://i.gifer.com/93wj.gif',
            alt: 'Cloudy Sky'
        }),
        text: '**The weather is going to be:** '
        + weatherDesc.description + '  \n'
        + '**The maximum temperature today is going to be:** '
        + weatherMain.temp_max + '°C  \n'
        + '**and the minimum temperature is going to be:** '
        + weatherMain.temp_min + '°C  \n',
        display: 'CROPPED',
    }));

  },

  showNews: function (conv, data) {
    conv.ask(data.response);
  },

  addAlarm: function (conv, data) {
    conv.ask(data.response);
  },

  smallTalk: function (conv, data) {
    conv.ask(data.response);
  },

  easterEgg : function (conv) {
    conv.ask(data.response);
  },

};
