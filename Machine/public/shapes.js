// frameCount use inspired by: https://creative-coding.decontextualize.com/changes-over-time/

function displayCircles() {
  let minSize = width * 0.0625;
  let maxSize = width * 0.125;

  for (let o1 = 0; o1 <= width - minSize; o1 += minSize) {
    for (let o2 = 0; o2 <= height - minSize; o2 += minSize) {
      push();
      noStroke();
      fill(fHue, fSat, fLum);
      translate(o1, o2);
      let thisSpeed = 0.04;
      let size = map(sin(frameCount * thisSpeed), -1.0, 1.0, minSize, maxSize);
      ellipse(o1, o2, size);
      pop();
    }
  }
}

function displaySquares() {
  let size = width * 0.0625;
   for (let o1 = size; o1 <= width - size; o1 += size * 2) {
     for (let o2 = size; o2 <= height - size; o2 += size * 2) {
       push();
       noStroke();
       fill(fHue, fSat, fLum);
       rectMode(CENTER);
       translate(o1, o2);
       rotate(frameCount * 0.03);
       rect(0, 0, size, size);
       pop();
     }
   }
}

function displayTriangles() {
  let x = width * 0.05;
  let y = height * 0.04;
  let x1 = x * 2;
  let x2 = x * 3;
  let y1 = y * 3;
  let thisSpeed = frameCount * 5 % height;
  let thisSpeed1 = frameCount * 7 % height;

  for (let o1 = x; o1 <= width - x2; o1 += x2) {
    for (let o2 = y; o2 <= height - y1; o2 += x2) {
      push();
      translate(o1, o2);
      noStroke();
      fill(fHue, fSat, fLum);
      beginShape();
      vertex(x, y + thisSpeed);
      vertex(x1, y1 + thisSpeed);
      vertex(x2, y + thisSpeed);
      endShape();
      pop();
    }
  }

  for (let o1 = x; o1 <= width - x2; o1 += x2) {
    for (let o2 = y; o2 <= height - y1; o2 += x2) {
      push();
      translate(o1, o2);
      noStroke();
      fill(fHue, fSat, fLum);
      beginShape();
      vertex(x, y1 - thisSpeed1);
      vertex(x1, y - thisSpeed1);
      vertex(x2, y1 - thisSpeed1);
      endShape();
      pop();
    }
  }
}

// the following shapes derived from:
// https://github.com/runemadsen/programmingdesignsystems.com/blob/master/examples/shape/custom-shapes/cubic-letter.js
function displayArcs(){
  let x = width * 0.1;
  let y = height * 0.1;

  for (let o1 = x * 2; o1 < width - x; o1 += x) {
    for (let o2 = y * 2; o2 < height - y; o2 += y) {
      let newX = map(sin(frameCount * 0.05), -1, 1, 0, x * 2);
      let newY = map(sin(frameCount * 0.02), -1, 1, 0, y * 2);
      push();
      translate(o1, o2);
      strokeWeight(newX * 0.2);
      stroke(fHue, fSat, fLum);
      noFill();
      beginShape();
      vertex(-x + newX, newY)
      bezierVertex(-newX, newY, x, newY, newX, 0);
      endShape(OPEN);
      pop();
    }
  }

  for (let o1 = x * 2; o1 < width - x; o1 += x) {
    for (let o2 = y * 2; o2 < height - y; o2 += y) {
      let newX = map(sin(frameCount * 0.02), -1, 1, 0, x * 2);
      let newY = map(sin(frameCount * 0.05), -1, 1, 0, y * 2);
      push();
      translate(o1, o2);
      strokeWeight(10);
      stroke(fHue, fSat, fLum);
      noFill();
      beginShape();
      vertex(-newX, newY)
      bezierVertex(-x, -newY, x, -newY, x, 0);
      endShape(OPEN);
      pop();
    }
  }
}

function displaySquiggles() {
  let x = width * 0.1;
  let y = height * 0.1;

  for (let o1 = x * 2; o1 < width - x; o1 += x) {
    for (let o2 = y * 2; o2 < height - y; o2 += y) {
      let newX = map(sin(frameCount * 0.1), -1, 1, 0, x * 2);
      push();
      translate(o1, o2);
      strokeWeight(10);
      stroke(fHue, fSat, fLum);
      noFill();
      beginShape();
      vertex(-newX, 0)
      bezierVertex(-newX, -y, newX, y, newX, 0);
      endShape(OPEN);
      pop();
    }
  }
}
