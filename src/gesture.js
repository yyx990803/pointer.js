(function(POINTER) {

  /**
   * A simple object for storing the position of a pointer.
   */
  function PointerPosition(pointer) {
    this.x = pointer.clientX;
    this.y = pointer.clientY;
    this.px = pointer.pageX;
    this.py = pointer.pageY;
  }

  /**
   * calculate the squared distance of the given pointer from this 
   * PointerPosition's pointer
   */
  PointerPosition.prototype.calculateSquaredDistance = function(pointer) {
    var dx = this.x - pointer.clientX;
    var dy = this.y - pointer.clientY;
    return dx*dx + dy*dy;
  };

  function synthesizeGestureEvents(type, listener, useCapture) {
    if (type.indexOf('gesture') === 0) {
      var handler = POINTER.gestureHandlers[type];
      if (handler) {
        handler(this);
      } else {
        console.error('Warning: no handler found for {{evt}}.'
                      .replace('{{evt}}', type));
      }
    }
  }

  // Note: Firefox doesn't work like other browsers... overriding HTMLElement
  // doesn't actually affect anything. Special case for Firefox:
  if (navigator.userAgent.match(/Firefox/)) {
    // TODO: fix this for the general case.
    POINTER.augment(HTMLDivElement, synthesizeGestureEvents);
    POINTER.augment(HTMLCanvasElement, synthesizeGestureEvents);
  } else {
    POINTER.augment(HTMLElement, synthesizeGestureEvents);
  }

  POINTER.gestureHandlers = POINTER.gestureHandlers || {};
  POINTER.PointerPosition = PointerPosition;

})(window.POINTER);
