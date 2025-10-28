registerSketch('sk4', function (p) {
  /* Thank you do Daniel Schiffman, to whom this code is 
  inspired by and built off of. */ 
  let xspacing = 16;     // distance between each x point
  let amplitude = 75.0;  // wave height
  let period = 500.0;    // how many pixels before wave repeats
  let dx;                // increment for x
  let yvaluesHour, yvaluesMin, yvaluesSec; // arrays for each wave
  let w;                 // wave width

  p.setup = function () {
    p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
    w = p.width + 16;
    dx = (p.TWO_PI / period) * xspacing;

    yvaluesHour = new Array(Math.floor(w / xspacing));
    yvaluesMin = new Array(Math.floor(w / xspacing));
    yvaluesSec = new Array(Math.floor(w / xspacing));
  };

  p.draw = function () {
    p.background(0);
    p.noStroke();

    const min = p.minute();
    const sec = p.second();
    const ms = p.millis() / 1000.0;

    const hourFraction = ((min * 60) + sec) / 3600;  
    const minuteFraction = ((ms / 1000) + ms) / 60;           
    const secondFraction = (sec + ms) / 1;  

    const thetaHour = hourFraction * p.TWO_PI;
    const thetaMin = minuteFraction * p.TWO_PI;
    const thetaSec = secondFraction * p.TWO_PI;


    drawWave(yvaluesHour, thetaHour, -p.height / 4, "#FF0000");
    drawWave(yvaluesMin, thetaMin, 0, "#FF8200");               
    drawWave(yvaluesSec, thetaSec, p.height / 4, "#FFC100");   
  };

  function drawWave(yArray, theta, yOffset, col) {
    let x = theta; 
    for (let i = 0; i < yArray.length; i++) {
      yArray[i] = p.sin(x) * amplitude;
      x += dx;
    }

    p.fill(col);
    p.push();
    p.translate(-w / 2, yOffset, 0); 
    for (let x = 0; x < yArray.length; x++) {
      p.ellipse(x * xspacing, yArray[x], 12, 12);
    }
    p.pop();
  }

  p.windowResized = function () {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    w = p.width + 16;
    dx = (p.TWO_PI / period) * xspacing;
    yvaluesHour = new Array(Math.floor(w / xspacing));
    yvaluesMin = new Array(Math.floor(w / xspacing));
    yvaluesSec = new Array(Math.floor(w / xspacing));
  };    
});