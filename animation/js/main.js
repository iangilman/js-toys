/*globals Modernizr, jsToys */

// Copyright 2011-12, Ian Gilman
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function() {

  window.jsToys = {
    animations: {}
  };

  // ----------
  $(document).ready(function() {
    if (!Modernizr.canvas) {
      alert('This browser does not support the canvas tag.');
      return;
    }
  
    var animation = null;
    var $canvas = $('#main');
    var context = $canvas[0].getContext('2d');
    var windowSize = {}; 
    
    function resize() {  
      windowSize.x = $canvas.width();
      windowSize.y = $canvas.height();
      $canvas.attr('width', windowSize.x);
      $canvas.attr('height', windowSize.y);
      
      if (animation) {
        animation.resize(windowSize);
      }
    }
    
    $(window).resize(resize);
    resize();
    
    animation = jsToys.animations['flying-lines'];
    animation.init(windowSize);
    
    function frame() {
      animation.frame(windowSize, context);
      requestAnimationFrame(frame);
    }
    
    frame();
  });

})();
