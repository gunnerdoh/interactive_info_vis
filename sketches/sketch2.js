registerSketch('sk2', function (p) {
  let hrOsc, minOsc;
  let lastSec = -1;

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.textAlign(p.CENTER);
    p.textSize(20);
    p.fill(255);

    hrOsc = new p5.Oscillator('sine');
    minOsc = new p5.Oscillator('triangle');

    hrOsc.start();
    minOsc.start();

    hrOsc.amp(0.2);
    minOsc.amp(0.15);
  };

  p.draw = function () {
    p.background(0);
    const h = p.windowHeight / 2;
    let hrDiameter = 200;
    let minDiameter = 150;
    let secDiameter = 50;

    let stars = [
      { x: p.windowWidth * 0.25, y: h, size: hrDiameter, color: "#FF0000", label: "Hour" },
      { x: p.windowWidth * 0.5, y: h, size: minDiameter, color: "#FF8200", label: "Minute" },
      { x: p.windowWidth * 0.75, y: h, size: secDiameter, color: "#FFC100", label: "Second" },
    ];

    p.starShade(h);
    p.clock(stars, hrDiameter, minDiameter, secDiameter);
    p.drawLabels(h, stars);
  };

  p.starShade = function (h) {
    const shades = [
      { x: 0.25, c: p.color(255, 0, 0, 70), d: 200 },
      { x: 0.5, c: p.color(255, 130, 0, 70), d: 150 },
      { x: 0.75, c: p.color(255, 193, 0, 70), d: 50 },
    ];
    for (let s of shades) {
      p.fill(s.c);
      p.circle(p.windowWidth * s.x, h, s.d);
    }
  };

  p.clock = function (stars, hrDiameter, minDiameter, secDiameter) {
    let hr = p.hour() % 12;
    let min = p.minute();
    let sec = p.second();
    let ms = p.millis() % 1000;

    for (let s of stars) {
      p.fill(s.color);
      p.noStroke();

      if (s.label === "Hour") {
        s.size = p.map(min, 60, 0, 0, hrDiameter);
      } else if (s.label === "Minute") {
        s.size = p.map(sec, 60, 0, 0, minDiameter);
      } else {
        s.size = p.map(ms, 0, 1000, secDiameter, 0);
      }

      p.circle(s.x, s.y, s.size);
    }

    hrOsc.freq(p.map(hr, 0, 11, 110, 220)); 
    minOsc.freq(p.map(min, 0, 59, 220, 264)); 

    let hrAmp = p.map(stars[0].size, 0, hrDiameter, 0.05, 0.25);
    let minAmp = p.map(stars[1].size, 0, minDiameter, 0.05, 0.2);

    hrOsc.amp(hrAmp, 0.05);
    minOsc.amp(minAmp, 0.05);

    if (sec !== lastSec) {
      playKick();
      lastSec = sec;
    }
  };

  function playKick() {
    const osc = new p5.Oscillator('sine');
    const env = new p5.Envelope();
  
    env.setADSR(0.001, 0.15, 0, 0.05);
    env.setRange(0.8, 0);
  
    let startFreq = 150;
    let endFreq = 50;
    let dur = 0.15;
  
    osc.freq(startFreq);
    osc.start();
    osc.amp(env);
    env.play(osc);
  
    osc.freq(startFreq);
    osc.freq(endFreq, dur); 
    osc.stop(p.millis() / 1000 + dur + 0.05);
  }
  

  p.drawLabels = function (h, stars) {
    let hr = p.hour() % 12;
    let min = p.minute();
    let sec = p.second();
    for (let s of stars) {
      let value = s.label === "Hour" ? hr : s.label === "Minute" ? min : sec;
      p.fill(255);
      p.text(`${s.label}: ${value}`, s.x, h * 1.4);
    }
  };

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
});
