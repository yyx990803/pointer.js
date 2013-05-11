/**
 * Gesture recognizer for the `gesturetap` gesture.
 *
 * Taps happen when an element is pressed and then released.
 */
(function(POINTER) {

  var TAP_TIME = 600; // this should be the same with longpress trigger time
  var WIGGLE_THRESHOLD = 10;

  function pointerDown(e) {
    if (e.tapFired) return;
    e.tapFired = true;
    var pointers = e.getPointerList();
    if (pointers.length != 1) return;
    this.tapInitPosition = new POINTER.PointerPosition(pointers[0]);
    this.addEventListener('pointerup', pointerUp);
    this.addEventListener('pointermove', pointerMove);
    this.tapCancelTimer = setTimeout(cancelTap.bind(this), TAP_TIME);
  }

  function pointerMove(e) {
    if (e.tapFired) return;
    e.tapFired = true;
    var pointers = e.getPointerList();
    if(e.pointerType === POINTER.Types.MOUSE) {
      cancelTap.call(this);
    }
    else if(pointers.length === 1) {
      // but if the pointer is something else we allow a 
      // for a bit of smudge space
      var pos = this.tapInitPosition;
      if(pos && pos.calculateSquaredDistance(pointers[0]) > WIGGLE_THRESHOLD * WIGGLE_THRESHOLD) {
        cancelTap.call(this);
      }
    }
  }

  function pointerUp(e) {

    if (e.tapFired) return;
    e.tapFired = true;

    var pointers = e.getPointerList();
    if (pointers.length) return;

    cancelTap.call(this);

    // double / triple tap just triggered
    if (this.lastDoubleTapDownTime === 0 || this.lastTripleTapDownTime === 0) return;

    var pos = this.tapInitPosition;
    var payload = {
      clientX: pos.x,
      clientY: pos.y,
      pageX: pos.px,
      pageY: pos.py
    };
    POINTER.create('gesturetap', e.target, payload);
  }

  function cancelTap () {
    clearTimeout(this.tapCancelTimer);
    this.removeEventListener('pointerup', pointerUp);
    this.removeEventListener('pointermove', pointerMove);
  }

  /**
   * Make the specified element create gesturetap events.
   */
  function emitTaps(el) {
    el.addEventListener('pointerdown', pointerDown);
  }

  POINTER.gestureHandlers.gesturetap = emitTaps;

})(window.POINTER);
