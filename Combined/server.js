// curl -X POST -d "value=1" http://localhost:7000/mode
// curl -X POST -d "word=dance" http://localhost:7000/gifword
// curl -X POST -d "circle=1" -d "square=1" http://localhost:7000/shapes
// curl -X POST -d "h=20" -d "s=100" -d "l=100" http://localhost:7000/background

var cors = require('cors');
var express = require('express');
var server = express();
var bodyParser = require('body-parser');
var config = require('./config.js');
var request = require('request');
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(express.static('public'));

var gifDomain = 'https://api.giphy.com/v1/stickers/random?&api_key=';
var gifAPIKey = config.apikey;

var state = {
  'mode': '0',
  'gif': {
    'word': 'dance',
    'counter': 0,
    'imageURL': 'https://media2.giphy.com/media/3N5r5Ks7vo3f2/giphy.gif',
  },
  'foreground': {
    'h': '50',
    's': '100',
    'l': '100'
  },
  'background': {
    'h': '0',
    's': '100',
    'l': '100'
  },
  'shapes': {
    'circle': '0',
    'square': '1',
    'triangle': '0',
    'squiggle': '0',
    'arc': '0'
  }
}

function getState(request, response){
  response.send(state);
}

function serverStart(request, response){
  var port = this.address().port;
  console.log('Server listening on port ' + port);
}

function setMode(request, response){
  state.mode = request.body.value;
  response.send(state.mode);
}

function setGIFWord(request, response){
  state.gif.word = request.body.word;
  state.gif.counter = state.gif.counter + 1;
  response.send(state.gif.word);
  getGIF();
}

function getGIF() {
  getGIFURL = gifDomain + gifAPIKey + state.gif.word;

  // from: https://codeburst.io/how-to-make-an-http-request-in-nodejs-http-mechanism-libraries-f25ec990d307
  return request(getGIFURL, { json: true }, (error, response, body) => {
    if (error) { return console.log(err); }
    state.gif.imageURL = body.data.image_original_url;
  });
}

function setBackground(request, response){
  state.background.h = request.body.h;
  state.background.s = request.body.s;
  state.background.l = request.body.l;
  response.send(state.background);
}

function setForeground(request, response){
  state.foreground.h = request.body.h;
  state.foreground.s = request.body.s;
  state.foreground.l = request.body.l;
  response.send(state.foreground);
}

function setShapes(request, response){
  state.shapes.circle  = request.body.circle;
  state.shapes.square = request.body.square;
  state.shapes.triangle = request.body.triangle;
  state.shapes.squiggle = request.body.squiggle;
  state.shapes.arc = request.body.arc;
  response.send(state.shapes);
}

server.listen(80, serverStart);
server.get('/state/', getState);
server.post('/mode/', setMode);
server.post('/gifword/', setGIFWord);
server.post('/background/', setBackground);
server.post('/foreground/', setForeground);
server.post('/shapes/', setShapes);


server.get("/controller", function (request, response) {
	response.sendFile(__dirname + '/views/controller.html');
});

server.get("/visualmode", function (request, response) {
	response.sendFile(__dirname + '/views/visualmode.html');
});

server.get("/", function (request, response) {
	response.sendFile(__dirname + '/views/index.html');
});