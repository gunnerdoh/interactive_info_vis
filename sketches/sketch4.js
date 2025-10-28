registerSketch("sk4", function (p) {
  const cols = 15, rows = 4, size = 60, pad = 100;
  const sounds = ["kick", "blip", null];
  let cells = [], kick, blip;
  let lastSecond = -1;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);

    // grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        cells.push({ x: pad + i * size, y: pad + j * size, sound: null });
      }
    }

    kick = new p5.Oscillator("sine");
    blip = new p5.Oscillator("square");
    kick.start(); kick.amp(0);
    blip.start(); blip.amp(0);

    p.textFont('monospace');
    p.textSize(32);
    p.fill(20);
  };

  p.draw = function () {
    p.background(240);
    drawClock();   
    drawGrid();
    playAndDrawNotes();
  };

  function drawClock() {
    const h = p.hour();
    const m = p.minute();
    const s = p.second();
    const timeLabel = `${p.nf(h, 2)}:${p.nf(m, 2)}:${p.nf(s, 2)}. Click on a box to change the sound!`;

    p.noStroke();
    p.fill(30);
    p.textAlign(p.LEFT, p.TOP);
    p.text(timeLabel, 20, 20);

    p.text("1 click: kick, 2 clicks: blip.", 20, 55)
  }

  function drawGrid() {
    for (let c of cells) {
      p.stroke(180);
      if (c.sound === "kick") p.fill("#ff6666");
      else if (c.sound === "blip") p.fill("#66aaff");
      else p.noFill();
      p.square(c.x, c.y, size);
    }
  }

  function playAndDrawNotes() {
    const currSecond = p.second();
    const idx = currSecond % cells.length;
    const c = cells[idx];

    drawNote(c.x + size / 2, c.y + size / 2);

    if (currSecond !== lastSecond) {
      if (c.sound === "kick") playKick();
      if (c.sound === "blip") playBlip();
      lastSecond = currSecond;
    }
  }

  function drawNote(x, y) {
    const w = 25, h = 18, stem = 40;
    p.push();
    p.translate(x, y);
    p.fill(0); p.noStroke();
    p.ellipse(0, 0, w, h);
    p.stroke(0); p.strokeWeight(3);
    p.line(w / 2 - 2, -h / 4, w / 2 - 2, -stem);
    p.pop();
  }

  function playKick() {
    kick.freq(100);
    kick.amp(0.6, 0.002);
    kick.freq(40, 0.05);
    kick.amp(0, 0.08);
  }

  function playBlip() {
    blip.freq(600);
    blip.amp(0.4, 0.002);
    blip.amp(0, 0.03);
  }

  p.mousePressed = function () {
    for (let c of cells) {
      if (
        p.mouseX > c.x && p.mouseX < c.x + size &&
        p.mouseY > c.y && p.mouseY < c.y + size
      ) {
        const i = sounds.indexOf(c.sound);
        c.sound = sounds[(i + 1) % sounds.length];
      }
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
