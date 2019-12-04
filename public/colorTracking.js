var eyeColor;

//   ----- COLOR TRACKER -----
window.onload = function() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then(function(stream) {
      document.getElementById("video").srcObject = stream;
    });

  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  // BLUE
  tracking.ColorTracker.registerColor("blue", function(r, g, b) {
    if (r < 161 && g > 202 && b < 241) {
      return true;
    }
    return false;
  });

  // BROWN 56, 16, 28
  tracking.ColorTracker.registerColor("brown", function(r, g, b) {
    if (r < 56 && g > 16 && b < 28) {
      return true;
    }
    return false;
  });

  // GREEN 129, 167, 129
  tracking.ColorTracker.registerColor("green", function(r, g, b) {
    if (r < 129 && g > 167 && b < 129) {
      return true;
    }
    return false;
  });

  // GRAY 230, 228, 228
  tracking.ColorTracker.registerColor("gray", function(r, g, b) {
    if (r < 230 && g > 228 && b < 228) {
      return true;
    }
    return false;
  });

  // HAZEL 163, 127, 90
  tracking.ColorTracker.registerColor("hazel", function(r, g, b) {
    if (r < 163 && g > 127 && b < 90) {
      return true;
    }
    return false;
  });

  tracking.track("#video", tracker, { camera: true });

  tracker.on("track", function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    event.data.forEach(function(rect) {
      if (rect.color === "custom") {
        rect.color = tracker.customColor;
      }

      context.strokeStyle = rect.color;
      context.strokeRect(rect.x, rect.y, rect.width, rect.height);
      context.font = "12px Helvetica";
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

      eyeColor = rect.color;
    });
  });

  initGUIControllers(tracker);

  // TRACK COLOR EYES IN CONSOLE
  let eyeTracker = new tracking.ColorTracker();
  // "brown",
  // "blue",
  // "green",
  // "gray",
  // "hazel"
  // eyeColorTracker.setStepSize(1.7);
  tracking.track(video, eyeTracker);
  eyeTracker.on("track", function(event) {
    if (event.data.length > 0) {
      console.log("hello");
    }
  });
};
