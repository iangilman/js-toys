# Getting started

1. Pull this repository down to your hard drive and open index.html into your browser. 
1. Take a look at js/modules/lines.js and fiddle with it in your text editor. 
1. Refresh the browser. 
1. Rinse, repeat.

These animations use the HTML5 canvas. Here's a cheatsheet: 

* http://simon.html5.org/dump/html5-canvas-cheat-sheet.html

... and here are some tutorials:

* http://diveintohtml5.info/canvas.html

# Adding modules

This project is set up so it's easy to add new modules. To do so:

1. Pick a name for your new module. It should be alphanumeric only; no spaces or symbols. For this example we'll use "foo".
1. In the js/modules folder, make a copy of empty.js and give it your module name (e.g. foo.js).
1. Replace MODULE_NAME_GOES_HERE with your module name (e.g. foo).
1. Add a new line for your module in js/directory.js.
1. Add some code to the functions in your module.
1. Open index.html in your browser and use the menu in the upper-left of the page to select your module for viewing.

Once you have a module in a state you like, send me a pull request, or email the code to ian@iangilman.com, and I'll add it to this repository!

# Animation ideas

* Fireworks
* Wobbly text
* Warp drive
* Snow falling
* Flying toasters
