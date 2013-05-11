/**
 * Gesture recognizer for the `doubletap` gesture.
 *
 * Taps happen when an element is pressed and then released.
 */
(function(POINTER) {
  var INTERVAL_TIME = 300;
  var WIGGLE_THRESHOLD = 20;
  var WIGGLE_THRESHOLD_MOUSE = 5;

  function pointerDown(e) {
    if (e.tripleTapFired) return;
    e.tripleTapFired = true;
    var pointers = e.getPointerList();
    if (pointers.length != 1) return;
    var now = new Date().getTime();
    var thresh = WIGGLE_THRESHOLD;
    if(e.pointerType === POINTER.Types.MOUSE) {
      thresh = WIGGLE_THRESHOLD_MOUSE;
    }
    if (this.lastTripleTapPosition &&
      now - this.lastTripleTapDownTime < INTERVAL_TIME &&
      this.lastTripleTapPosition.calculateSquaredDistance(pointers[0]) < thresh * thresh &&
      this.tapCount >= 2
    ) {
      this.lastTripleTapDownTime = 0;
      this.lastTripleTapPosition = null;
      this.tapCount = 0;
      var payload = {
        clientX: pointers[0].clientX,
        clientY: pointers[0].clientY,
        pageX: pointers[0].pageX,
        pageY: pointers[0].pageY
      };
      POINTER.create('gesturetripletap', e.target, payload);
    } else {
      if (now - this.lastTripleTapDownTime > INTERVAL_TIME) {
        this.tapCount = 1;
      } else {
        this.tapCount = (this.tapCount || 0) + 1;
      }
      this.lastTripleTapPosition = new POINTER.PointerPosition(pointers[0]);
      this.lastTripleTapDownTime = now;
    }
  }

  /**
   * Make the specified element create gesturetap events.
   */
  function emitTripleTaps(el) {
    el.addEventListener('pointerdown', pointerDown);
  }

  POINTER.gestureHandlers.gesturetripletap = emitTripleTaps;

})(window.POINTER);