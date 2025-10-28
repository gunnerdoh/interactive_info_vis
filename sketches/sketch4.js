registerSketch('sk2', function (p) {
  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
  
  p.draw = function () {
    p.background(0);

    const h = p.windowHeight / 2
    let hrDiameter = 200;
    let minDiameter = 150;
    let secDiameter = 50;

    let stars = [
      { x: p.windowWidth * 0.25, y: h, size: hrDiameter, color: "#FF0000" },
      { x: p.windowWidth * 0.5, y: h, size: minDiameter, color: "#FF8200" },
      { x: p.windowWidth * 0.75, y: h, size: secDiameter, color: "#FFC100" },
    ]

    p.starShade(h);
    p.clock(stars, hrDiameter, minDiameter, secDiameter)
  };

  p.starShade = function(h) {
    let c = p.color(255, 0, 0); 
    c.setAlpha(70);
    p.fill(c);                 
    p.circle(p.windowWidth * 0.25, h, 200); 

    c = p.color(255, 130, 0); 
    c.setAlpha(70);
    p.fill(c);          
    p.circle(p.windowWidth * 0.5, h, 150); 

    c = p.color(255, 193, 0); 
    c.setAlpha(70);
    p.fill(c);                 
    p.circle(p.windowWidth * 0.75, h, 50); 
  }

  p.clock = function(stars, hrDiameter, minDiameter, secDiameter) {
    let hr = p.hour() % 12; 
    let min = p.minute() % 60;
    let sec = p.second() % 60;
    let ms = p.millis() % 1000;

    
    for (let s of stars) {
      p.fill(s.color);
      p.noStroke();
      if (s.color == "#FF0000") {
        s.size = p.map(min, 60, 0, 0, s.size); 
        p.circle(s.x, s.y, s.size, s.color);
      } else if (s.color == "#FF8200") {
        s.size = p.map(sec, 60, 0, 0, s.size); 
        p.circle(s.x, s.y, s.size, s.color);
      } else {
        s.size = p.map(ms, 0, 1000, s.size, 0); 
        p.circle(s.x, s.y, s.size, s.color);
      }
    }
  }

  function triggerNoise() {

  }


  p.windowResized = function () { 
    p.resizeCanvas(p.windowWidth, p.windowHeight); 
  };
});