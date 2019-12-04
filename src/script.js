// import { log } from "util";

// tracking JS

window.onload = function() {
  // EYE TRACKING
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function(stream) {
      document.getElementById("video").srcObject = stream;
    });
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  var tracker = new tracking.ObjectTracker("eye");
  tracker.setInitialScale(1);
  tracker.setStepSize(1);
  tracker.setEdgesDensity(0.1);

  tracking.track("#video", tracker, { camera: true });

  tracker.on("track", function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function(rect) {
      context.strokeStyle = "#a64ceb";
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
        rect.x + rect.width + 5,
        rect.y + 22
      );
    });
  });

  var gui = new dat.GUI();
  gui.add(tracker, "edgesDensity", 0.1, 0.5).step(0.01);
  gui.add(tracker, "initialScale", 1.0, 10.0).step(0.1);
  gui.add(tracker, "stepSize", 1, 5).step(0.1);

  // EYE COLOR TRACKING
  // var eyeColor;
  // navigator.mediaDevices
  //   .getUserMedia({ video: true, audio: false })
  //   .then(function(stream) {
  //     document.getElementById("video").srcObject = stream;
  //   });

  // var canvas = document.getElementById("canvas");
  // var context = canvas.getContext("2d");

  // var tracker = new tracking.ColorTracker();
  // // var tracker = new tracking.ObjectTracker("eye");
  // tracker.setInitialScale(1);
  // tracker.setStepSize(1);
  // tracker.setEdgesDensity(0.1);
  // // BLUE
  // tracking.ColorTracker.registerColor("blue", function(r, g, b) {
  //   if (r < 161 && g > 202 && b < 241) {
  //     return true;
  //   }
  //   return false;
  // });

  // // BROWN 56, 16, 28
  // tracking.ColorTracker.registerColor("brown", function(r, g, b) {
  //   if (r < 56 && g > 16 && b < 28) {
  //     return true;
  //   }
  //   return false;
  // });

  // // GREEN 129, 167, 129
  // tracking.ColorTracker.registerColor("green", function(r, g, b) {
  //   if (r < 129 && g > 167 && b < 129) {
  //     return true;
  //   }
  //   return false;
  // });

  // // GRAY 230, 228, 228
  // tracking.ColorTracker.registerColor("gray", function(r, g, b) {
  //   if (r < 230 && g > 228 && b < 228) {
  //     return true;
  //   }
  //   return false;
  // });

  // // HAZEL 163, 127, 90
  // tracking.ColorTracker.registerColor("hazel", function(r, g, b) {
  //   if (r < 163 && g > 127 && b < 90) {
  //     return true;
  //   }
  //   return false;
  // });

  // tracking.track("#video", tracker, { camera: true });
  // // tracking.track("#video", eyeTracker, { camera: true });

  // tracker.on("track", function(event) {
  //   context.clearRect(0, 0, canvas.width, canvas.height);

  //   event.data.forEach(function(rect) {
  //     if (rect.color === "custom") {
  //       rect.color = tracker.customColor;
  //     }

  //     context.strokeStyle = rect.color;
  //     context.strokeRect(rect.x, rect.y, rect.width, rect.height);
  //     context.font = "12px Helvetica";
  //     context.fillStyle = "#fff";
  //     context.fillText(
  //       "x: " + rect.x + "px",
  //       rect.x + rect.width + 5,
  //       rect.y + 11
  //     );
  //     context.fillText(
  //       "y: " + rect.y + "px",
  //       rect.x + rect.width + 5,
  //       rect.y + 22
  //     );

  //     eyeColor = rect.color;
  // console.log(eyeColor);
  // });
  // });

  // initGUIControllers(tracker);
};

// ======= p5 js code ========

// var serial;
// var portName = "/dev/tty.usbmodem144101";
// var inData;
// var blueEye = "blue";
// var brownEye = "brown";
// var grayEye = "gray";
// var hazelEye = "hazel";
// var greenEye = "green";

// function setup() {
//   serial = new p5.SerialPort(); // make a new instance of the serialport library
//   serial.on("list", printList); // set a callback function for the serialport list event
//   serial.on("connected", serverConnected); // callback for connecting to the server
//   serial.on("open", portOpen); // callback for the port opening
//   serial.on("data", serialEvent); // callback for when new data arrives
//   serial.on("error", serialError); // callback for errors
//   serial.on("close", portClose); // callback for the port closing

//   serial.list(); // list the serial ports
//   serial.open(portName); // open a serial port
// }

// function draw() {
//   // outData = eyeColor;
//   // serial.write(outData);

//   if (eyeColor === "brown") {
//     serial.write(brownEye);
//     console.log("brown");
//   } else if (eyeColor === "blue") {
//     serial.write(blueEye);
//     console.log("blue");
//   } else if (eyeColor === "green") {
//     serial.write(greenEye);
//     console.log("green");
//   } else if (eyeColor === "gray") {
//     serial.write(grayEye);
//     console.log("gray");
//   } else if (eyeColor === "hazel") {
//     serial.write(hazelEye);
//     console.log("hazel");
//   }
// }

// // Following functions print the serial communication status to the console for debugging purposes

// function printList(portList) {
//   // portList is an array of serial port names
//   for (var i = 0; i < portList.length; i++) {
//     // Display the list the console:
//     print(i + " " + portList[i]);
//   }
// }

// function serverConnected() {
//   print("connected to server.");
// }

// function portOpen() {
//   print("the serial port opened.");
// }

// function serialEvent() {
//   inData = Number(serial.read());
// }

// function serialError(err) {
//   print("Something went wrong with the serial port. " + err);
// }

// function portClose() {
//   print("The serial port closed.");
// }

let serial;
let latestData = "waiting for data";

function setup() {
  createCanvas(windowWidth, windowHeight);

  serial = new p5.SerialPort();

  serial.list();
  serial.open("/dev/tty.usbmodem144101");

  serial.on("connected", serverConnected);

  serial.on("list", gotList);

  serial.on("data", gotData);

  serial.on("error", gotError);

  serial.on("open", gotOpen);

  serial.on("close", gotClose);
}

function serverConnected() {
  print("Connected to Server");
}

function gotList(thelist) {
  print("List of Serial Ports:");

  for (let i = 0; i < thelist.length; i++) {
    print(i + " " + thelist[i]);
  }
}

function gotOpen() {
  print("Serial Port is Open");
}

function gotClose() {
  print("Serial Port is Closed");
  latestData = "Serial Port is Closed";
}

function gotError(theerror) {
  print(theerror);
}

function gotData() {
  let currentString = serial.readLine();
  trim(currentString);
  if (!currentString) return;
  // console.log(currentString);
  latestData = currentString;
}

function draw() {
  background(255, 255, 255);
  fill(0, 0, 0);
  text(latestData, 10, 10);
  // Polling method
  /*
 if (serial.available() > 0) {
  let data = serial.read();
  ellipse(50,50,data,data);
 }
 */
}
// console.log("hello!");
