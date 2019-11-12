const request = require('./../connection/request');
const { dialogflow,
      SimpleResponse,
      BasicCard,
      Image,
      Permission,
      Button } = require('actions-on-google');


module.exports = {

  addReminder: function (conv) {

  },

  makeCall: function (conv) {

  },

  showWeather: function (conv, weatherData, city) {
    let weatherMain = weatherData.main;
    let weatherDesc = weatherData.weather[0];
    conv.close(new SimpleResponse({
        speech: 'The weather is going to have a'
        + weatherDesc.description + '  \n'
        + 'The maximum temperature today is going to be '
        + weatherMain.temp_max + '°C  \n'
        + 'and the minimum temperature is going to be '
        + weatherMain.temp_min + '°C  \n',
    }));

    // Card Response
    conv.close(new BasicCard({
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

  showNews: function (conv) {

  },

  addAlarm: function (conv) {

  },

  smallTalk: function (conv) {

  },

  easterEgg : function (conv) {

  },

};
