/*globals Modernizr, jsToys, requestAnimationFrame, alert */

// Copyright 2011-12, Ian Gilman
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function() {

  window.jsToys = {
    modules: {},
    currentModule: null,
    $canvas: null,
    context: null,
    windowSize: {},
    
    // ----------
    init: function() {
      var self = this;
      
      if (!Modernizr.canvas) {
        alert('This browser does not support the canvas tag.');
        return;
      }
    
      this.$canvas = $('#main');
      this.context = this.$canvas[0].getContext('2d');
      
      $(window).resize(function() {
        self.resize();
      });
      
      var $modules = $('#modules')
        .change(function() {
          self.loadModule($modules.val());
        });
        
      var entry;
      for (var i = 0; i < this.directory.length; i++) {
        entry = this.directory[i];
        $('<option>')
          .attr('value', entry)
          .text(entry)
          .appendTo($modules);
      }        
            
      this.resize();
      this.frame();
      this.loadModule(this.directory[0]);
    },
    
    // ----------
    resize: function() {
      this.windowSize.x = this.$canvas.width();
      this.windowSize.y = this.$canvas.height();
      this.$canvas.attr('width', this.windowSize.x);
      this.$canvas.attr('height', this.windowSize.y);
      
      if (this.currentModule) {
        this.currentModule.resize(this.windowSize);
      }
    },

    // ----------
    frame: function() {
      var self = this;
      
      if (this.currentModule) {
        this.currentModule.frame(this.windowSize, this.context);
      }
      
      requestAnimationFrame(function() {
        self.frame();
      });
    },
    
    // ----------
    loadModule: function(name) {
      var self = this;
      $.getScript('js/modules/' + name + '.js', function() {
        self.currentModule = self.modules[name];
        self.currentModule.init(self.windowSize);
      });
    }
  };

  // ----------
  $(document).ready(function() {
    jsToys.init();
  });

})();
