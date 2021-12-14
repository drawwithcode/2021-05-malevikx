let socket = io();
let myColor = "white";
let eraseEnable = false;
var myFont;

socket.on("connect", newConnection);
socket.on("mouseBroadcast", drawOtherMouse);
socket.on("color", setColor);

//colore casuale, diverso per ogni partecipante
function setColor(assignedColor) {
  myColor = assignedColor;
}

function newConnection() {
  console.log("your id: " + socket.id);
}

//funzione per disegnare
function drawOtherMouse(data) {
  push();
  stroke(data.color);
  strokeWeight(3);
  line(data.x, data.y, data.x2, data.y2);
  pop();
}

//carico img e font
function preload() {
  myFont = loadFont("./assets/TWKLausanne-400Italic.otf");
  myImage1 = loadImage("./assets/sfondo.png");
}

//funzione per cancellare
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

  //tasto per cancellare
  push();
  fill("black");
  toggleBtn = createButton("ERASE");
  toggleBtn.position(windowWidth - 80, windowHeight - 40);
  toggleBtn.mouseClicked(toggleErase);
  pop();

  imageMode(CENTER);
  push();
  image(myImage1, width / 2, height / 2, windowWidth, windowHeight);
  pop();
}

function draw() {
  //titolo
  push();
  strokeWeight(4);
  stroke(myColor);
  fill("white");
  textFont(myFont);
  textSize(130);
  text("SAVE MORE NOW!", 20, 130);
  pop();

  //scritta in basso a sx
  push();
  fill("black");
  textFont(myFont);
  textSize(20);
  text("remember to press S to save your list!", 20, windowHeight - 20);
  pop();
}

//funzione per cancellare

function toggleErase() {
  if (eraseEnable) {
    noErase();
    eraseEnable = false;
  } else {
    erase();
    eraseEnable = true;
  }
}

//disegnare
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

//salvare screen della lista
function keyPressed() {
  if (key == "s") {
    save("mySketch.png");
  }
}
