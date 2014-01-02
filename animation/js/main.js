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
      
      $(window)
        .resize(function() {
          self.resize();
        })
        .bind('hashchange', function() {
          var value = location.hash.replace(/^#/, '');  
          self.loadModule(value);
        });
      
      var $modules = $('#modules')
        .change(function() {
          var value = $modules.val();
          location.hash = value;
          self.loadModule(value);
        });
        
      var startModuleIndex = 0;
      var hash = location.hash.replace(/^#/, '');
      var entry;
      for (var i = 0; i < this.directory.length; i++) {
        entry = this.directory[i];
        if (entry === hash) {
          startModuleIndex = i;
        }

        $('<option>')
          .attr('value', entry)
          .text(entry)
          .appendTo($modules);
      }        
            
      this.resize();
      this.frame();

      entry = this.directory[startModuleIndex];
      $modules.val(entry);
      this.loadModule(entry);
    },
    
    // ----------
    resize: function() {
      this.windowSize.x = this.$canvas.width();
      this.windowSize.y = this.$canvas.height();
      this.$canvas.attr('width', this.windowSize.x);
      this.$canvas.attr('height', this.windowSize.y);
      
      if (this.currentModule) {
        this.currentModule.resize(this.windowSize, this.context);
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
      this.modules = {};  
      $.getScript('js/modules/' + name + '.js', function() {
        self.currentModule = self.modules[name];
        self.currentModule.init(self.windowSize, self.context);
      });
    }
  };

  // ----------
  $(document).ready(function() {
    jsToys.init();
  });

})();
