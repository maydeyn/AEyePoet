var eyesDetected;

window.onload = function() {
  // EYE TRACKING
  // --------activate video stream---------
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function(stream) {
      document.getElementById("video").srcObject = stream;
    });
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  // -------TRACK EYES-------
  var tracker = new tracking.ObjectTracker("eye");
  tracker.setInitialScale(1.5);
  tracker.setStepSize(1.5);
  tracker.setEdgesDensity(0.12);

  tracking.track("#video", tracker, { camera: true });
  tracker.on("track", function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // SET UP RECTS
    event.data.forEach(function(rect) {
      context.strokeStyle = "#fff";
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = "11px Helvetica";
      context.fillStyle = "#fff";
      context.fillText(
        "x: " + rect.x + "px",
        rect.x + rect.width + 5,
        rect.y + 11
      );
      context.fillText(
        "y: " + rect.y + "px",
        rect.x + rect.width + 10,
        rect.y + 22
      );
      if (event.data.length > 0 && event.data.length < 2) {
        eyesDetected = "1";
        // console.log("eyes detected.");
        alert("eyes detected");
      }
      // if (eyesDetected === true) {
      //   alert("eyes detected");
      // }
    });
  });

  // // CONTROLS FOR EYE TRACK
  var gui = new dat.GUI();
  gui.add(tracker, "edgesDensity", 0.1, 0.5).step(0.01);
  gui.add(tracker, "initialScale", 1.0, 10.0).step(0.1);
  gui.add(tracker, "stepSize", 1, 5).step(0.1);
};

// ------ P5 serial port set up connecting to Arduino ------
// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() returns all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a tring until a (line break) is encountered
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer

var serial;
var portName = "/dev/tty.usbmodem144101";
var inData;
var outData = 0;

function setup() {
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on("list", printList); // set a callback function for the serialport list event
  serial.on("connected", serverConnected); // callback for connecting to the server
  serial.on("open", portOpen); // callback for the port opening
  serial.on("data", serialEvent); // callback for when new data arrives
  serial.on("error", serialError); // callback for errors
  serial.on("close", portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

function draw() {
  outData = eyesDetected;
  serial.write(outData);
  // if (eyeColor === "brown") {
  //   serial.read("brown");
  //   console.log("brown");
  // } else if (eyeColor === "blue") {
  //   console.log("blue");
  // } else if (eyeColor === "green") {
  //   console.log("green");
  // } else if (eyeColor === "gray") {
  //   console.log("gray");
  // } else if (eyeColor === "hazel") {
  //   console.log("hazel");
  // }
}

// Following functions print the serial communication status to the console for debugging purposes

function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serverConnected() {
  print("connected to server.");
}

function portOpen() {
  print("the serial port opened.");
}

function serialEvent() {}

function serialError(err) {
  print("Something went wrong with the serial port. " + err);
}

function portClose() {
  print("The serial port closed.");
}
