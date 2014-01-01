/*globals jsToys */

// Copyright 2011-12, Ian Gilman
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

(function() {

  jsToys.modules.mutation = {
    // ----------
    init: function(windowSize) {
      this.grid = {};
      this.grid['0x0'] = {
        body: {
          size: {
            x: 20,
            y: 20
          },
          color: {
            r: 128,
            g: 128,
            b: 128
          },
          rotation: 0
        },
        vector: {
          size: {
            x: 0,
            y: 0
          },
          color: {
            r: 0,
            g: 0,
            b: 0
          },
          rotation: 0
        }
      };

      this.frameCount = 0;
    },
    
    // ----------
    frame: function(windowSize, context) {
      var newGrid = {};

      // clear the screen
      context.fillStyle = '#000';  
      context.fillRect(0, 0, windowSize.x, windowSize.y);

      // Draw the grid
      var unitSize = 50;
      var halfUnit = unitSize / 2;
      var columnCount = Math.ceil(windowSize.x / unitSize) + 1;
      var rowCount = Math.ceil(windowSize.y / unitSize) + 1;
      var c, r, x, y, key, unit, otherKey, otherUnit;
      var cStart = Math.ceil(-columnCount * 0.5);
      var rStart = Math.ceil(-rowCount * 0.5);
      var cEnd = cStart + columnCount;
      var rEnd = rStart + rowCount;
      var xStart = (windowSize.x / 2) - (columnCount * unitSize * 0.5);
      var yStart = (windowSize.y / 2) - (rowCount * unitSize * 0.5);
      
      y = yStart;
      for (r = rStart; r < rEnd; r++) {
        x = xStart;
        for (c = cStart; c < cEnd; c++) {
          context.save();

          key = c + 'x' + r;
          otherKey = 'none';
          if (Math.abs(c) > Math.abs(r)) {
            if (c > 0) {
              otherKey = (c - 1) + 'x' + r;
            } else if (c < 0) {
              otherKey = (c + 1) + 'x' + r;
            }
          } else {
            if (r > 0) {
              otherKey = c + 'x' + (r - 1);
            } else if (r < 0) {            
              otherKey = c + 'x' + (r + 1);              
            }
          }

          unit = this.grid[key];
          if (unit) {
            otherUnit = this.grid[otherKey];
            if (otherUnit && this.frameCount % 100 === 0) {
              unit.vector.size.x = (unit.vector.size.x + otherUnit.vector.size.x) / 2;
              unit.vector.size.y = (unit.vector.size.y + otherUnit.vector.size.y) / 2;
              unit.vector.color.r = (unit.vector.color.r + otherUnit.vector.color.r) / 2;
              unit.vector.color.g = (unit.vector.color.g + otherUnit.vector.color.g) / 2;
              unit.vector.color.b = (unit.vector.color.b + otherUnit.vector.color.b) / 2;
              unit.vector.rotation = (unit.vector.rotation + otherUnit.vector.rotation) / 2;
            }            
          } else if (this.frameCount % 10 === 0) {
            otherUnit = this.grid[otherKey];
            if (otherUnit) {
              unit = $.extend(true, {}, otherUnit);              
              unit.vector.size.x += (Math.random() - 0.5) * 0.1;
              unit.vector.size.y += (Math.random() - 0.5) * 0.1;
              unit.vector.color.r += (Math.random() - 0.5) * 0.1;
              unit.vector.color.g += (Math.random() - 0.5) * 0.1;
              unit.vector.color.b += (Math.random() - 0.5) * 0.1;
              unit.vector.rotation += (Math.random() - 0.5) * 0.1;
            }
          }

          if (unit) {
            newGrid[key] = unit;

            unit.body.size.x += unit.vector.size.x;
            unit.body.size.y += unit.vector.size.y;
            unit.body.color.r += unit.vector.color.r;
            unit.body.color.g += unit.vector.color.g;
            unit.body.color.b += unit.vector.color.b;
            unit.body.rotation += unit.vector.rotation;

            context.fillStyle = 'rgb(' + Math.floor(unit.body.color.r) + ',' 
              + Math.floor(unit.body.color.g) + ',' + Math.floor(unit.body.color.b) + ')';

            context.translate(x + halfUnit, y + halfUnit);
            context.rotate(unit.body.rotation);
            context.fillRect(-unit.body.size.x * 0.5, -unit.body.size.y * 0.5, unit.body.size.x, unit.body.size.y);

            unit.vector.size.x += (Math.random() - 0.5) * 0.01;
            unit.vector.size.y += (Math.random() - 0.5) * 0.01;
            unit.vector.color.r += (Math.random() - 0.5) * 0.01;
            unit.vector.color.g += (Math.random() - 0.5) * 0.01;
            unit.vector.color.b += (Math.random() - 0.5) * 0.01;
            unit.vector.rotation += (Math.random() - 0.5) * 0.01;

            unit.vector.size.x = this.boundsCheck(unit.body.size.x, 0, unitSize, unit.vector.size.x);
            unit.vector.size.y = this.boundsCheck(unit.body.size.y, 0, unitSize, unit.vector.size.y);
            unit.vector.color.r = this.boundsCheck(unit.body.color.r, 0, 255, unit.vector.color.r);
            unit.vector.color.g = this.boundsCheck(unit.body.color.g, 0, 255, unit.vector.color.g);
            unit.vector.color.b = this.boundsCheck(unit.body.color.b, 0, 255, unit.vector.color.b);
          }

          context.restore();

          x += unitSize;
        }

        y += unitSize;
      }

      this.grid = newGrid;
      this.frameCount++;
    },

    // ----------
    boundsCheck: function(value, min, max, vector) {
      if (value > max && vector > 0) {
        return -vector;
      }

      if (value < min && vector < 0) {
        return -vector;
      }

      return vector;
    },
    
    // ----------
    resize: function(windowSize) {
    }
  };

})();
