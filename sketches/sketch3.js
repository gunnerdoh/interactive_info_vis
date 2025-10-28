// Instance-mode sketch for tab 4
registerSketch('sk4', function (p) {
  // Click and drag the mouse to view the scene from different angles.
// Double-click to change the falloff rate.

let useFalloff = false;
p.setup = function () {
  p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
};

p.draw = function() {
  p.background(0);
  

  if (useFalloff === true) {
    p.lightFalloff(2, 0, 0);
  }

  let sec = p.second() % 60;

  p.pointLight(255, 0, 0, 0, 0, 50);

  p.noStroke();

  // s.size = p.map(min, 60, 0, 0, s.size); 
  // Draw the sphere.
  p.sphere(40);
}

// Change the falloff value when the user double-clicks.
function doubleClicked() {
  useFalloff = true;
}
});
