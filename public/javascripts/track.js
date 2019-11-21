window.onload = function() {
  var video = document.getElementById("video");
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");

  var tracker = new this.tracking.ColorTracker();
  tracking.track("#video", tracker, { camera: true });

  tracker.on("track", function(event) {
    context.clearRect(0, 0, canvas.clientWidth, canvas.height);

    event.data;
  });

  var colors = new tracking.ColorTracker([
    "blue",
    "brown",
    "green",
    "gray",
    "hazel"
  ]);

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

  colors.on("track", function(event) {
    if (event.data.length === 0) {
      // No colors were detected in this frame.
    } else {
      event.data.forEach(function(rect) {
        //   console.log(rect.x, rect.y, rect.height, rect.width, rect.color);
      });
    }
  });

  tracking.track("#myVideo", colors);
};
