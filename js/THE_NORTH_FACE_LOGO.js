
/**
 * Draw "THE NORTH FACE" thrice half-dome logo
 *
 * usage:
 *  THE_NORTH_FACE.draw(
 *    context   // canvas.getContext('2d')
 *    x,        // x center of the dome 
 *    y,        // y center of the dome 
 *    width,    // width of the dome    
 *    height    // height of the dome   
 *    bgColor   // color of the background
 *    color     // foreground color
 *  );
 *
 * Here are some numbers about the logo itself:
 *  
 *  ratio of width / height   = ~0.75
 *
 * Made with luv by David G. Hong (davidhong.code+tnf AT GEE MAIL DOT COM)
 */

var THE_NORTH_FACE = (function (document) {
  var supportsCanvas,   // feature detection
      drawHalfDome;     // required for drawing 1⁄2 domes
  
  // If HTML5 Canvas is not supported, let's not even bother
  supportsCanvas = function (document) {
    var canvas = document.createElement('canvas');
    return !!(canvas.getContext && canvas.getContext('2d'));
  }(document);
  
  // Responsible for drawing a Half Dome
  drawHalfDome = function (context, x, y, width, height) {
    var radius = width > height ? height : width;
    
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y - height);
    context.arcTo(x + width, y - height, x + width, y - height + radius, radius);
    context.lineTo(x + width, y);
    context.closePath();
    context.fill();
  };
  
  // Public API
  return {
    draw: function (context, x, y, width, height, bgColor, color) {
      if (!supportsCanvas) {
        return;
      }
      
      // Start outside (outer-dome)
      var rings = 5,
          ring = rings;
      while (ring--) {
        var index   = rings - ring,
            swidth  = index === 1 ? width :
                      index === 2 ? 0.598 * width :
                      index === 3 ? 0.579 * width :
                      index === 4 ? 0.252 * width :
                      index === 5 ? 0.233 * width :
                      0,
            sheight = index === 1 ? height :
                      index === 2 ? 0.676 * height :
                      index === 3 ? 0.661 * height :
                      index === 4 ? 0.338 * height :
                      index === 5 ? 0.323 * height :
                      0;
          
         // ewww.
                      
            
        context.fillStyle = ring % 2 === 0 ? color : bgColor;
        
        drawHalfDome(context, x, y, swidth, sheight);
      }
    }
  };
}(this.document));
