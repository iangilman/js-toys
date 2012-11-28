/*globals jsToys */

// Copyright 2011-12, Ian Gilman
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function() {

  jsToys.modules.drops = {
    drops: [],
    
    // ----------
    init: function(windowSize) {
    },
    
    // ----------
    frame: function(windowSize, context) {
      var i, drop;
      var maxRadius = Math.max(windowSize.x, windowSize.y) / 2;
            
      // clear the screen
      context.fillStyle = 'rgba(0, 0, 0, 0.1)'; // 10% opaque black 
      context.fillRect(0, 0, windowSize.x, windowSize.y);

      // draw the drops
      context.strokeStyle = '#088';
      context.lineWidth = 6;
      
      for (i = 1; i < this.drops.length; i++) {
        drop = this.drops[i];
        context.beginPath();
        context.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
        context.stroke(); 
        drop.radius *= 1.01;
        if (drop.radius > maxRadius) {
          this.drops.splice(i, 1);
          i--;
        }
      }

      // possibly add a new drop
      if (this.drops.length === 0 || Math.random() > 0.9) {
        this.drops.push({
          x: Math.random() * windowSize.x, 
          y: Math.random() * windowSize.y,
          radius: 10
        });
      }
    },
    
    // ----------
    resize: function(windowSize) {
    }
  };

})();
