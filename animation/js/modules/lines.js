/*globals jsToys */

// Copyright 2011-12, Ian Gilman
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function() {

  jsToys.modules.lines = {
    maxVelocity: 10,
    pointsToMake: 7,
    points: [],
    
    // ----------
    init: function(windowSize) {
      for (var i = 0; i < this.pointsToMake; i++) {
        this.points.push({
          x: Math.random() * windowSize.x, 
          y: Math.random() * windowSize.y,
          vx: (Math.random() * this.maxVelocity * 2) - this.maxVelocity, 
          vy: (Math.random() * this.maxVelocity * 2) - this.maxVelocity
        });
      }
    },
    
    // ----------
    frame: function(windowSize, context) {
      var i;
      
      // clear the screen
      context.fillStyle = 'rgba(0, 0, 0, 0.1)'; // 10% opaque black 
      context.fillRect(0, 0, windowSize.x, windowSize.y);

      // draw the lines
      context.strokeStyle = '#a60';
      context.lineWidth = 6;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.beginPath();
      context.moveTo(this.points[0].x, this.points[0].y);
      
      for (i = 1; i < this.points.length; i++) {
        context.lineTo(this.points[i].x, this.points[i].y);
      }
      
      context.stroke();      

      // update positions and handle bounce
      for (i = 0; i < this.points.length; i++) {
        var p = this.points[i];
  
        p.x += p.vx;
        if (p.x < 0) { 
          p.x = 0;
          p.vx *= -1;
        } else if (p.x > windowSize.x) {
          p.x = windowSize.x;
          p.vx *= -1;
        }
          
        p.y += p.vy;
        if (p.y < 0) { 
          p.y = 0;
          p.vy *= -1;
        } else if (p.y > windowSize.y) {
          p.y = windowSize.y;
          p.vy *= -1;
        }
      }
    },
    
    // ----------
    resize: function(windowSize) {
    }
  };

})();
