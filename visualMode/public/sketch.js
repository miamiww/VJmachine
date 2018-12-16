// vj machine state elements
let url = 'http://visualmode.space/state';
let mode;
let gifCounter;
let gifImageURL;
let bHue, bSat, bLum;
let fHue, fSat, fLum;
let circle;
let square;
let triangle;
let squiggle;
let arc;
let powerdByName = "Poweredby_640px_Badge.gif";
var gif_loadIMG, gif_createImg;
// local sketch elements
let gifHere = false;
let myGIF;
let myCounter = -1

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function preload(){
  gif_loadIMG = loadImage(powerdByName);
  gif_createImg= createImg(powerdByName);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  setInterval(getState, 500);
}

function draw() {
  background(bHue, bSat, bLum);
//  image(gif_loadIMG,0,0);
  gif_createImg.position(width-width/16-10,height-height/8-10);
  gif_createImg.size(width/16,height/8);
  if (gifCounter > myCounter) {
    myCounter = gifCounter;
    gifHere = false;
    makeGIF();
  }

  if (mode == 0) {
    resetGIF();
    displayWaiting();

  } else if (mode == 1) {

    if (gifHere) {
      myGIF.position(0, 0);
      myGIF.size(width, height);
    }

    if (gifHere == false) { makeGIF(); }

  } else if (mode == 2) {
    resetGIF();

    if (circle == 1) {
      displayCircles();
    }
    if (square == 1) {
      displaySquares();
    }
    if (triangle == 1) {
      displayTriangles();
    }
    if (squiggle == 1) {
      displaySquiggles();
    }
    if (arc == 1) {
      displayArcs();
    }
  }
}

function getState(){
  loadJSON(url, gotState);
}

function gotState(data) {
  mode = int(data.mode);
  gifCounter = data.gif.counter;
  gifImageURL = data.gif.imageURL;

  bHue = int(data.background.h);
  bSat = int(data.background.s);
  bLum = int(data.background.l);

  fHue = int(data.foreground.h);
  fSat = int(data.foreground.s);
  fLum = int(data.foreground.l);

  circle = int(data.shapes.circle);
  square = int(data.shapes.square);
  triangle = int(data.shapes.triangle);
  squiggle = int(data.shapes.squiggle);
  arc = int(data.shapes.arc);
}

function makeGIF() {
  if (myGIF != null) { myGIF.remove(); }
  myGIF = createImg(gifImageURL);
  gifHere = true;
}

function displayWaiting() {
  let min = 28, max = 36;
  let thisSpeed = 0.04;
  textAlign(CENTER);
  let size = map(sin(frameCount * thisSpeed), -1.0, 1.0, min, max);
  fill(0);
  textSize(size)
  textFont('Comic Sans MS');
  text('waiting for super cool input', width/2, height/2);
}

function resetGIF() {
  if (myGIF != null) { myGIF.remove(); }
  gifHere = false;
}
