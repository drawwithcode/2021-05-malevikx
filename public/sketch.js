let = clientSocket = io(); //attivare socket anche su client

clientSocket.on("connect", newConnection); //event when the client connect to server execute funtion newCollection
clientSocket.on("mouseBroadcast", newBroadcast);

function newConnection() {
  console.log(clientSocket.id);
}

function newBroadcast(data) {
  console.log(data);
  fill(0, 255, 0);
  circle(data.x, data.y, 10);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
}

function draw() {
  fill(255, 0, 0);
  circle(mouseX, mouseY, 20);
}

function mouseMoved() {
  let message = {
    x: mouseX,
    y: mouseY,
  };

  clientSocket.emit("mouse", message);
}
