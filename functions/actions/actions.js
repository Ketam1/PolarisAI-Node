const request = require('./../connection/request');
const { dialogflow, SimpleResponse, BasicCard, Image, Permission,
        Button, BrowseCarousel, BrowseCarouselItem
      } = require('actions-on-google');


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

  showNews: function (conv, newsData, data) {
    let articles = newsData.articles;
    conv.ask(new SimpleResponse({
        speech: 'The top headlines of the moment are'
        + articles[0].title + ' '
        + articles[1].title + ' '
        + articles[2].title + ' ',
        text: " ",
    }));
    conv.ask(new BrowseCarousel({
    items: [
      new BrowseCarouselItem({
        title: articles[0].title,
        url: articles[0].url,
        description: articles[0].description,
        image: new Image({
          url: articles[0].urlToImage,
        }),
        footer: 'Fonte: '+ articles[0].source.name,
      }),
      new BrowseCarouselItem({
        title: articles[1].title,
        url: articles[1].url,
        description: articles[1].description,
        image: new Image({
          url: articles[1].urlToImage,
        }),
        footer: 'Fonte: '+ articles[1].source.name,
      }),
      new BrowseCarouselItem({
        title: articles[2].title,
        url: articles[2].url,
        description: articles[2].description,
        image: new Image({
          url: articles[2].urlToImage,
        }),
        footer: 'Fonte: '+ articles[2].source.name,
      }),
    ],
  }));
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
