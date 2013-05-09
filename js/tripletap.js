/**
 * Gesture recognizer for the `doubletap` gesture.
 *
 * Taps happen when an element is pressed and then released.
 */
(function(exports) {
  var INTERVAL_TIME = 300;
  var WIGGLE_THRESHOLD = 10;

  /**
   * A simple object for storing the position of a pointer.
   */
  function PointerPosition(pointer) {
    this.x = pointer.clientX;
    this.y = pointer.clientY;
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

  function pointerDown(e) {
    if (e.gestureFired) return;
    e.gestureFired = true;
    var pointers = e.getPointerList();
    if (pointers.length != 1) return;
    var now = new Date().getTime();
    if (this.lastTripleTapPosition &&
      now - this.lastTripleTapDownTime < INTERVAL_TIME &&
      this.lastTripleTapPosition.calculateSquaredDistance(pointers[0]) < WIGGLE_THRESHOLD * WIGGLE_THRESHOLD &&
      this.tapCount >= 2
    ) {
      this.lastTripleTapDownTime = 0;
      this.lastTripleTapPosition = null;
      this.tapCount = 0;
      var payload = {
        pageX: pointers[0].pageX,
        pageY: pointers[0].pageY
      };
      window._createCustomEvent('gesturetripletap', e.target, payload);
    } else {
      if (now - this.lastTripleTapDownTime > INTERVAL_TIME) {
        this.tapCount = 1;
      } else {
        this.tapCount = (this.tapCount || 0) + 1;
      }
      this.lastTripleTapPosition = new PointerPosition(pointers[0]);
      this.lastTripleTapDownTime = now;
    }
  }

  /**
   * Make the specified element create gesturetap events.
   */
  function emitTripleTaps(el) {
    el.addEventListener('pointerdown', pointerDown);
  }

  exports.Gesture._gestureHandlers.gesturetripletap = emitTripleTaps;

})(window);