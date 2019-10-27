/* NO NEED TO "use_strict" */

function Rin() {
  this.samples = []; // Audio samples
  this.meta = {
    samples: 45, // Samples count, we'll use hardcoded length value since we can't count files in dir from browser
    path: "/resources/audio/", // Path to samples
    type: "mp3" // Samples file type
  };
  this.audio = new Audio(); // Audio object
}

Rin.prototype.init = function(button) {
  this.button = button;
  this.load(); // Generating sample paths
  this.setup(); // Setuping events
};

Rin.prototype.load = function() {
  for (var i = 0; i < this.meta.samples; i++)
    this.samples.push(
      document.location.protocol +
      "//" +
      document.location.host +
      this.meta.path +
      (i + 1) + // Since file numeration starts from 1
        "." +
        this.meta.type
    ); /* ikr? */
};

Rin.prototype.play = function() {
  if (this.audio == null) return; // Just in case

  var random_sample = this.random(this.audio.src); // Trying to get a random sample

  if (!!this.audio.paused) this.audio.pause(); // Pause audio if playing

  this.audio.src = random_sample; // Assign random sample to audio element

  this.audio
    .play() // Try to play the sample
    .then(function() {
      // console.log("Playing " + random_sample); // Commented cause no need to spam these
    })
    .catch(function(error) {
      // Catch error if we can't play it
      console.error("Can't play " + random_sample);
      console.error(error);
    });
};

Rin.prototype.random = function(path) {
  var random_sample = Math.floor(Math.random() * this.meta.samples); // Getting random sample number

  if (this.meta.samples > 1 && this.samples[random_sample] == path)
    // Check if we have more than 1 sample and if selected sample differs from the last one
    return this.random(path);
  // randomize until sample is different from the last one
  else return this.samples[random_sample]; // return randomized sample
};

Rin.prototype.setup = function() {
  this.button.addEventListener("click", this.play.bind(this), true); // Add click event to button
  (function() {
    var pressed = false; // Did we pressed the spacebar?

    document.addEventListener(
      "keydown",
      function(event) {
        if (event.keyCode == 32) {
          if (!pressed) this.play();

          this.button.classList.toggle("space", true);
          pressed = true;
        }
      }.bind(this),
      true
    ); // Add spacebar key down event

    document.addEventListener(
      "keyup",
      function(event) {
        if (event.keyCode == 32) {
          this.button.classList.toggle("space", false);
          pressed = false;
        }
      }.bind(this),
      true
    );
  }.bind(this)());
};

window.onload = function() {
  var rin = new this.Rin();
  rin.init(this.document.getElementById("rin"));
};
