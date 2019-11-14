const request = require('./../connection/request');
const { dialogflow, SimpleResponse, BasicCard, Image, Permission,
        Button, BrowseCarousel, BrowseCarouselItem
      } = require('actions-on-google');
const {google} = require('googleapis');


function formatData(calendarData){
  calendarData = calendarData.split('T')[1];
  calendarData = calendarData.split('-')[0];
  return calendarData.substr(0, calendarData.length-3);
}

module.exports = {
  addReminder: function (conv, calendarData, data) {
    calendarData = calendarData.items;
    conv.ask(new SimpleResponse({
      speech: data.response,
      text: data.response + '  \nsome other things you might want to remember',
    }));
    conv.ask(new BrowseCarousel({
    items: [
      new BrowseCarouselItem({
        title: calendarData[0].summary,
        url: calendarData[0].htmlLink,
        description: 'Starts at: ' + formatData(calendarData[0].start.dateTime),
        image: new Image({
          url: 'https://png.pngtree.com/png-vector/20190819/ourlarge/pngtree-exclamation-mark-icon-vector-illustration-png-image_1694367.jpg',
        }),
        footer: 'Status: '+ calendarData[0].status,
      }),
      new BrowseCarouselItem({
        title: calendarData[1].summary,
        url: calendarData[1].htmlLink,
        description: 'Starts at: ' + formatData(calendarData[1].start.dateTime),
        image: new Image({
          url: 'https://png.pngtree.com/png-vector/20190819/ourlarge/pngtree-exclamation-mark-icon-vector-illustration-png-image_1694367.jpg',
        }),
        footer: 'Status: '+ calendarData[1].status,
      }),
      new BrowseCarouselItem({
        title: calendarData[2].summary,
        url: calendarData[2].htmlLink,
        description: 'Starts at: ' + formatData(calendarData[2].start.dateTime),
        image: new Image({
          url: 'https://png.pngtree.com/png-vector/20190819/ourlarge/pngtree-exclamation-mark-icon-vector-illustration-png-image_1694367.jpg',
        }),
        footer: 'Status: '+ calendarData[2].status,
      }),
    ],
  }));
  },

  makeCall: function (conv, data) {
    conv.ask(new SimpleResponse({
      text: data.response,
      speech: data.response,
    }));
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
    conv.ask(new SimpleResponse({
      text: data.response,
      speech: data.response,
    }));
  },

  smallTalk: function (conv, data) {
    conv.ask(data.response);
  },

  easterEgg : function (conv) {
    conv.ask(data.response);
  },

};
