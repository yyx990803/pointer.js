/**
 * Gesture recognizer for the `longpress` gesture.
 *
 * Longpress happens when pointer is pressed and doesn't get released
 * for a while (without movement).
 */
(function(POINTER) {
  var LONGPRESS_TIME = 600;
  var WIGGLE_THRESHOLD = 5;

  function pointerDown(e) {

    if (e.longpressFired) return;
    e.longpressFired = true;

    // Something went down. Clear the last press if there was one.

    clearTimeout(this.longPressTimer);

    var pointers = e.getPointerList();

    // check that we only have one pointer down
    if(pointers.length === 1) {

      // cache the position of the pointer on the target
      this.longpressInitPosition = new POINTER.PointerPosition(pointers[0]);

      // Start a timer.
      this.longPressTimer = setTimeout(function() {
        var payload = {
          clientX: pointers[0].clientX,
          clientY: pointers[0].clientY
        };
        POINTER.create('gesturelongpress', e.target, payload);
      }, LONGPRESS_TIME);

    }
    
  }

  function pointerMove(e) {

    if (e.longpressFired) return;
    e.longpressFired = true;

    var pointers = e.getPointerList();
    
    if(e.pointerType === POINTER.Types.MOUSE) {
      // if the pointer is a mouse we cancel the longpress 
      // as soon as it starts wiggling around
      clearTimeout(this.longPressTimer);
    }
    else if(pointers.length === 1) {
      // but if the pointer is something else we allow a 
      // for a bit of smudge space
      var pos = this.longpressInitPosition;
      
      if(pos && pos.calculateSquaredDistance(pointers[0]) > WIGGLE_THRESHOLD * WIGGLE_THRESHOLD) {
        clearTimeout(this.longPressTimer);
      }
    }
    
  }

  function pointerUp(e) {
    if (e.longpressFired) return;
    e.longpressFired = true;
    clearTimeout(this.longPressTimer);
  }

  /**
   * Make the specified element create gesturetap events.
   */
  function emitLongPresses(el) {
    el.addEventListener('pointerdown', pointerDown);
    el.addEventListener('pointermove', pointerMove);
    el.addEventListener('pointerup', pointerUp);
  }

  POINTER.gestureHandlers.gesturelongpress = emitLongPresses;

})(window.POINTER);
