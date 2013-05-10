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
    e.target.tapInitPosition = new POINTER.PointerPosition(pointers[0]);
    e.target.addEventListener('pointerup', pointerUp);
    setTimeout(function () {
      e.target.removeEventListener('pointerup', pointerUp);
    }, TAP_TIME);
  }

  function pointerUp(e) {
    if (e.tapFired) return;
    e.tapFired = true;
    var pointers = e.getPointerList();
    if (pointers.length) return;
    e.target.removeEventListener('pointerup', pointerUp);

    if (this.lastDownTime === 0) return; // doubletap just triggered

    var pos = e.target.tapInitPosition;
    if(pos && pos.calculateSquaredDistance(pointers[0]) > WIGGLE_THRESHOLD * WIGGLE_THRESHOLD) {
      var payload = {
        clientX: pos.x,
        clientY: pos.y
      };
      POINTER.create('gesturetap', e.target, payload);
    }
  }

  /**
   * Make the specified element create gesturetap events.
   */
  function emitTaps(el) {
    el.addEventListener('pointerdown', pointerDown);
  }

  POINTER.gestureHandlers.gesturetap = emitTaps;

})(window.POINTER);
