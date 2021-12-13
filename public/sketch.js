let socket = io();
let myColor = "green";
let eraseEnable = false;
let penna;

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);

function setColor(assignedColor) {
  myColor = assignedColor;
}

function newConnection() {
  console.log("your id: " + socket.id);
}

function drawOtherMouse(data) {
  push();
  stroke(data.color);
  strokeWeight(3);
  line(data.x, data.y, data.x2, data.y2);
  pop();
}

function preload() {
  myImage1 = loadImage("./assets/sfondo4.png");
}

function toggleOtherErase() {
  if (eraseEnable) {
    noErase();
    eraseEnable = data.false;
  } else {
    erase();
    eraseEnable = data.true;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");

  push();
  textSize(20);
  fill("black");
  toggleBtn = createButton("ERASE");
  toggleBtn.position(windowWidth - 100, windowHeight - 50);
  toggleBtn.mouseClicked(toggleErase);
  pop();

  imageMode(CENTER);
  push();
  image(myImage1, width / 2, height / 2, windowWidth, windowHeight);
  pop();
}

function draw() {
  push();
  noStroke();

  fill(myColor);
  textSize(50);

  text("non dimenticare nulla...", 100, 100);
  pop();
}

function toggleErase() {
  if (eraseEnable) {
    noErase();
    eraseEnable = false;
  } else {
    erase();
    eraseEnable = true;
  }
}

function mouseDragged() {
  push();
  stroke(myColor);
  strokeWeight(3);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();
  //create the message
  let message = {
    x: mouseX,
    y: mouseY,
    x2: pmouseX,
    y2: pmouseY,
    color: myColor,
  };
  // send to the server
  socket.emit("mouse", message);
}
