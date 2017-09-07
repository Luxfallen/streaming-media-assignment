const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const mediaHandler = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const onRequest = (request, response) => {
  // console.log(request.url);
  switch (request.url) {
    case '/page1':
    case '/party.mp4':
      mediaHandler.media.getParty(request, response);
      break;
    case '/page2':
    case '/bling.mp3':
      mediaHandler.media.getBling(request, response);
      break;
    case '/page3':
    case '/bird.mp4':
      mediaHandler.media.getBird(request, response);
      break;
    case '/':
    default:
      htmlHandler.getIndex(request, response);
      break;
  }
};
http.createServer(onRequest).listen(port);
// console.log(`Listening on 127.0.0.1: ${port}`);
