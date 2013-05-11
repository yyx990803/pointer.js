/**
 * Gesture recognizer for the `doubletap` gesture.
 *
 * Taps happen when an element is pressed and then released.
 */
(function(POINTER) {
  var DOUBLETAP_TIME = 300;
  var WIGGLE_THRESHOLD = 20;
  var WIGGLE_THRESHOLD_MOUSE = 5;

  function pointerDown(e) {

    if (e.doubleTapFired) return;
    e.doubleTapFired = true;
    
    var pointers = e.getPointerList();
    if (pointers.length != 1) return;
    var now = new Date().getTime();
    var thresh = WIGGLE_THRESHOLD;
    if(e.pointerType === POINTER.Types.MOUSE) {
      thresh = WIGGLE_THRESHOLD_MOUSE;
    }
    if (now - this.lastDoubleTapDownTime < DOUBLETAP_TIME && this.lastPosition && this.lastPosition.calculateSquaredDistance(pointers[0]) < thresh * thresh) {
      this.lastDoubleTapDownTime = 0;
      this.lastPosition = null;
      var payload = {
        clientX: pointers[0].clientX,
        clientY: pointers[0].clientY
      };
      POINTER.create('gesturedoubletap', e.target, payload);
    } else {
      this.lastPosition = new POINTER.PointerPosition(pointers[0]);
      this.lastDoubleTapDownTime = now;
    }
  }

  /**
   * Make the specified element create gesturetap events.
   */
  function emitDoubleTaps(el) {
    el.addEventListener('pointerdown', pointerDown);
  }

  POINTER.gestureHandlers.gesturedoubletap = emitDoubleTaps;

})(window.POINTER);
