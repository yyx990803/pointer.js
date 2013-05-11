/* Modernizr 2.5.3 (Custom Build) | MIT & BSD
 * Build: http://www.modernizr.com/download/#-touch-teststyles-prefixes
 */



window.Modernizr = (function( window, document, undefined ) {

    var version = '2.5.3',

    Modernizr = {},


    docElement = document.documentElement,

    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    inputElem  ,


    toString = {}.toString,

    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName, 


    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node,
          div = document.createElement('div'),
                body = document.body, 
                fakeBody = body ? body : document.createElement('body');

      if ( parseInt(nodes, 10) ) {
                      while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

                style = ['&#173;','<style>', rule, '</style>'].join('');
      div.id = mod;
          (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if(!body){
                fakeBody.style.background = "";
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
        !body ? fakeBody.parentNode.removeChild(fakeBody) : div.parentNode.removeChild(div);

      return !!ret;

    },
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProperty;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProperty = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProperty = function (object, property) { 
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }


    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F;

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    function setCss( str ) {
        mStyle.cssText = str;
    }

    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    function is( obj, type ) {
        return typeof obj === type;
    }

    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }


    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                            if (elem === false) return props[i];

                            if (is(item, 'function')){
                                return item.bind(elem || obj);
                }

                            return item;
            }
        }
        return false;
    }


    var testBundle = (function( styles, tests ) {
        var style = styles.join(''),
            len = tests.length;

        injectElementWithStyles(style, function( node, rule ) {
            var style = document.styleSheets[document.styleSheets.length - 1],
                                                    cssText = style ? (style.cssRules && style.cssRules[0] ? style.cssRules[0].cssText : style.cssText || '') : '',
                children = node.childNodes, hash = {};

            while ( len-- ) {
                hash[children[len].id] = children[len];
            }

                       Modernizr['touch'] = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch || (hash['touch'] && hash['touch'].offsetTop) === 9; 
                                }, len, tests);

    })([
                       ,['@media (',prefixes.join('touch-enabled),('),mod,')',
                                '{#touch{top:9px;position:absolute}}'].join('')           ],
      [
                       ,'touch'                ]);



    tests['touch'] = function() {
        return Modernizr['touch'];
    };



    for ( var feature in tests ) {
        if ( hasOwnProperty(tests, feature) ) {
                                    featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }
    setCss('');
    modElem = inputElem = null;


    Modernizr._version      = version;

    Modernizr._prefixes     = prefixes;

    Modernizr.testStyles    = injectElementWithStyles;
    return Modernizr;

})(this, this.document);
;

(function() {
  var MOUSE_ID = 1;

  function Pointer(identifier, type, event) {
    this.screenX = event.screenX || 0;
    this.screenY = event.screenY || 0;
    this.pageX = event.pageX || 0;
    this.pageY = event.pageY || 0;
    this.clientX = event.clientX || 0;
    this.clientY = event.clientY || 0;
    this.tiltX = event.tiltX || 0;
    this.tiltY = event.tiltY || 0;
    this.pressure = event.pressure || 0.0;
    this.hwTimestamp = event.hwTimestamp || 0;
    this.pointerType = type;
    this.identifier = identifier;
  }

  var PointerTypes = {
    TOUCH: 'touch',
    MOUSE: 'mouse',
    PEN:   'pen'
  };

  function setMouse(mouseEvent) {
    mouseEvent.target.mouseEvent = mouseEvent;
  }

  function unsetMouse(mouseEvent) {
    mouseEvent.target.mouseEvent = null;
  }

  function setTouch(touchEvent) {
    touchEvent.target.touchList = touchEvent.targetTouches;
  }

  /**
   * Returns an array of all pointers currently on the screen.
   */
  function getPointerList() {
    // Note: "this" is the element.
    var pointers = [];
    var pointer;
    if (this.touchList) {
      for (var i = 0; i < this.touchList.length; i++) {
        var touch = this.touchList[i];
        // Add 2 to avoid clashing with the mouse identifier.
        pointer = new Pointer(touch.identifier + 2, PointerTypes.TOUCH, touch);
        pointers.push(pointer);
      }
    } else if (this.msPointerList) {
      for (var identifier in this.msPointerList) {
        if (!this.msPointerList.hasOwnProperty(identifier)) continue;
        pointer = this.msPointerList[identifier];
        pointer = new Pointer(identifier, pointer.textPointerType, pointer);
        pointers.push(pointer);
      }
    }
    if (this.mouseEvent) {
      pointers.push(new Pointer(MOUSE_ID, PointerTypes.MOUSE, this.mouseEvent));
    }
    return pointers;
  }

  function createCustomEvent(eventName, target, payload) {
    var event = document.createEvent('Event');
    event.initEvent(eventName, true, true);
    for (var k in payload) {
      event[k] = payload[k];
    }
    target.dispatchEvent(event);
  }

  /*************** Mouse event handlers *****************/

  var globalMouseDown = false;

  window.addEventListener('mousedown', function () {
    globalMouseDown = true;
  });

  window.addEventListener('mouseout', function (e) {
    if (!e.toElement && !e.relatedTarget) {
      globalMouseDown = false;
    }
  });

  window.addEventListener('mouseup', function () {
    globalMouseDown = false;
  });

  function mouseDownHandler(event) {
    if (event.pointerFired) return;
    event.pointerFired = true;
    event.preventDefault();
    setMouse(event);
    var payload = {
      pointerType: 'mouse',
      getPointerList: getPointerList.bind(event.target),
      originalEvent: event
    };
    createCustomEvent('pointerdown', event.target, payload);
  }

  function mouseMoveHandler(event) {
    if (event.pointerFired) return;
    event.pointerFired = true;
    event.preventDefault();
    if (globalMouseDown) {
      setMouse(event);
    }
    var payload = {
      pointerType: 'mouse',
      getPointerList: getPointerList.bind(event.target),
      originalEvent: event
    };
    createCustomEvent('pointermove', event.target, payload);
  }

  function mouseUpHandler(event) {
    if (event.pointerFired) return;
    event.pointerFired = true;
    event.preventDefault();
    unsetMouse(event);
    var payload = {
      pointerType: 'mouse',
      getPointerList: getPointerList.bind(event.target),
      originalEvent: event
    };
    createCustomEvent('pointerup', event.target, payload);
  }

  function mouseOutHandler(event) {
    if (event.pointerFired) return;
    event.pointerFired = true;
    var to = event.toElement || event.relatedTarget;
    var from = event.fromElement || event.originalTarget;
    if (globalMouseDown) {
      event.preventDefault();
      unsetMouse(event);
      if (!this.contains(to) && !(this.contains(from) && this.contains(to))) {
        var payload = {
          pointerType: 'mouse',
          getPointerList: getPointerList.bind(event.target),
          originalEvent: event
        };
        createCustomEvent('pointerup', event.target, payload);
      }
    }
  }

  /*************** Touch event handlers *****************/

  function touchStartHandler(event) {
    if (event.pointerFired) return;
    event.pointerFired = true;
    event.preventDefault();
    setTouch(event);
    var payload = {
      pointerType: 'touch',
      getPointerList: getPointerList.bind(event.target),
      originalEvent: event
    };
    createCustomEvent('pointerdown', event.target, payload);
  }

  function touchMoveHandler(event) {
    if (event.pointerFired) return;
    event.pointerFired = true;
    event.preventDefault();
    setTouch(event);
    var payload = {
      pointerType: 'touch',
      getPointerList: getPointerList.bind(event.target),
      originalEvent: event
    };
    createCustomEvent('pointermove', event.target, payload);
  }

  function touchEndHandler(event) {
    if (event.pointerFired) return;
    event.pointerFired = true;
    event.preventDefault();
    setTouch(event);
    var payload = {
      pointerType: 'touch',
      getPointerList: getPointerList.bind(event.target),
      originalEvent: event
    };
    createCustomEvent('pointerup', event.target, payload);
  }

  /*************** MSIE Pointer event handlers *****************/

  function pointerDownHandler(event) {
    if (event.pointerType == 2) {
      event.textPointerType = PointerTypes.TOUCH;
    } else if (event.pointerType == 3) {
      event.textPointerType = PointerTypes.PEN;
    } else if (event.pointerType == 4) {
      event.textPointerType = PointerTypes.MOUSE;
    }
    if (event.textPointerType == PointerTypes.MOUSE) {
        event.target.msMouseDown = true;
    }
    if (!event.target.msPointerList) event.target.msPointerList = {};
    event.target.msPointerList[event.pointerId] = event;
    var payload = {
      pointerType: event.textPointerType,
      getPointerList: getPointerList.bind(event.target),
      originalEvent: event
    };

    createCustomEvent('pointerdown', event.target, payload);
  }

  function pointerMoveHandler(event) {
    if (event.pointerType == 2) {
      event.textPointerType = PointerTypes.TOUCH;
    } else if (event.pointerType == 3) {
      event.textPointerType = PointerTypes.PEN;
    } else if (event.pointerType == 4) {
      event.textPointerType = PointerTypes.MOUSE;
    }
    if (event.textPointerType == PointerTypes.MOUSE && !event.target.msMouseDown) {
      return;
    }
    if (!event.target.msPointerList) event.target.msPointerList = {};
    event.target.msPointerList[event.pointerId] = event;
    var payload = {
      pointerType: event.textPointerType,
      getPointerList: getPointerList.bind(event.target),
      originalEvent: event
    };
    createCustomEvent('pointermove', event.target, payload);
  }

  function pointerUpHandler(event) {
    if (event.target.msPointerList) {
      delete event.target.msPointerList[event.pointerId];
    }
    if (event.pointerType == 2) {
      event.textPointerType = PointerTypes.TOUCH;
    } else if (event.pointerType == 3) {
      event.textPointerType = PointerTypes.PEN;
    } else if (event.pointerType == 4) {
      event.textPointerType = PointerTypes.MOUSE;
    }
    if (event.textPointerType == PointerTypes.MOUSE) {
        event.target.msMouseDown = false;
    }
    var payload = {
      pointerType: event.textPointerType,
      getPointerList: getPointerList.bind(event.target),
      originalEvent: event
    };
    createCustomEvent('pointerup', event.target, payload);
  }

  /**
   * Causes the passed in element to broadcast pointer events instead
   * of mouse/touch/etc events.
   */
  function emitPointers(el) {
    if (!el.isPointerEmitter) {
      // Latch on to all relevant events for this element.
      if (isPointer()) {
        el.addEventListener('pointerdown', pointerDownHandler);
        el.addEventListener('pointermove', pointerMoveHandler);
        el.addEventListener('pointerup', pointerUpHandler);
      } else if (isMSPointer()) {
        el.addEventListener('MSPointerDown', pointerDownHandler);
        el.addEventListener('MSPointerMove', pointerMoveHandler);
        el.addEventListener('MSPointerUp', pointerUpHandler);
      } else {
        if (isTouch()) {
          el.addEventListener('touchstart', touchStartHandler);
          el.addEventListener('touchmove', touchMoveHandler);
          el.addEventListener('touchend', touchEndHandler);
        }
        el.addEventListener('mousedown', mouseDownHandler);
        el.addEventListener('mousemove', mouseMoveHandler);
        el.addEventListener('mouseup', mouseUpHandler);
        // Necessary for the edge case that the mouse is down and you drag out of
        // the area.
        el.addEventListener('mouseout', mouseOutHandler);
      }

      el.isPointerEmitter = true;
    }
  }

  /**
   * @return {Boolean} Returns true iff this user agent supports touch events.
   */
  function isTouch() {
    return Modernizr.touch;
  }

  /**
   * @return {Boolean} Returns true iff this user agent supports MSIE pointer
   * events.
   */
  function isMSPointer() {
    return window.navigator.msPointerEnabled;
  }

   /**
   * @return {Boolean} Returns true iff this user agent supports pointer
   * events.
   */
  function isPointer() {
    return window.navigator.pointerEnabled;
  }

  /**
   * Option 1: Require emitPointers call on all pointer event emitters.
   */
  //exports.pointer = {
  //  emitPointers: emitPointers,
  //};

  /**
   * Option 2: Replace addEventListener with a custom version.
   */
  function augmentAddEventListener(baseElementClass, customEventListener) {
    var oldAddEventListener = baseElementClass.prototype.addEventListener;
    baseElementClass.prototype.addEventListener = function(type, listener, useCapture) {
      customEventListener.call(this, type, listener, useCapture);
      oldAddEventListener.call(this, type, listener, useCapture);
    };
  }

  function synthesizePointerEvents(type, listener, useCapture) {
    if (type.indexOf('pointer') === 0) {
      emitPointers(this);
    }
  }

  // Note: Firefox doesn't work like other browsers... overriding HTMLElement
  // doesn't actually affect anything. Special case for Firefox:
  if (navigator.userAgent.match(/Firefox/)) {
    // TODO: fix this for the general case.
    augmentAddEventListener(HTMLDivElement, synthesizePointerEvents);
    augmentAddEventListener(HTMLCanvasElement, synthesizePointerEvents);
  } else {
    augmentAddEventListener(HTMLElement, synthesizePointerEvents);
  }

  window.POINTER = {
    create : createCustomEvent,
    augment: augmentAddEventListener,
    Types: PointerTypes
  };

})();

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
        clientY: pointers[0].clientY,
        pageX: pointers[0].pageX,
        pageY: pointers[0].pageY
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
          clientY: pointers[0].clientY,
          pageX: pointers[0].pageX,
          pageY: pointers[0].pageY
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

/**
 * Gesture recognizer for the `scale` gesture.
 *
 * Scale happens when two fingers are placed on the screen, and then
 * they move so the the distance between them is greater or less than a
 * certain threshold.
 */
(function(POINTER) {

  var SCALE_THRESHOLD = 0.2;

  function PointerPair(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  /**
   * Calculate the center of the two pointers.
   */
  PointerPair.prototype.center = function() {
    return [(this.p1.pageX + this.p2.pageX) / 2, (this.p1.pageY + this.p2.pageY) / 2];
  };

  /**
   * Calculate the distance between the two pointers.
   */
  PointerPair.prototype.span = function() {
    var dx = this.p1.pageX - this.p2.pageX;
    var dy = this.p1.pageY - this.p2.pageY;
    return Math.sqrt(dx*dx + dy*dy);
  };

  /**
   * Given a reference pair, calculate the scale multiplier difference.
   */
  PointerPair.prototype.scaleSince = function(referencePair) {
    var originalSpan = this.span();
    var referenceSpan = referencePair.span();
    if (referenceSpan === 0) {
      return 0;
    }
    else return originalSpan / referenceSpan;
  };

  function pointerDown(e) {
    if (e.scaleFired) return;
    e.scaleFired = true;
    var pointerList = e.getPointerList();
    // If there are exactly two pointers down,
    if (pointerList.length == 2) {
      // Record the initial pointer pair.
      this.scaleReferencePair = new PointerPair(pointerList[0],
                                                    pointerList[1]);
    }
  }

  function pointerMove(e) {
    if (e.scaleFired) return;
    e.scaleFired = true;
    var pointerList = e.getPointerList();
    // If there are two pointers down, compare to the initial pointer pair.
    if (pointerList.length == 2 && this.scaleReferencePair) {
      var pair = new PointerPair(pointerList[0], pointerList[1]);
      // Compute the scaling value according to the difference.
      var scale = pair.scaleSince(this.scaleReferencePair);
      // If the movement is drastic enough:
      if (Math.abs(1 - scale) > SCALE_THRESHOLD) {
        // Create the scale event as a result.
        var payload = {
          scale: scale,
          centerX: (this.scaleReferencePair.p1.clientX + this.scaleReferencePair.p2.clientX) / 2,
          centerY: (this.scaleReferencePair.p1.clientY + this.scaleReferencePair.p2.clientY) / 2
        };
        POINTER.create('gesturescale', e.target, payload);
      }
    }
  }

  function pointerUp(e) {
    if (e.scaleFired) return;
    e.scaleFired = true;
    this.scaleReferencePair = null;
  }

  /**
   * Make the specified element create gesturetap events.
   */
  function emitScale(el) {
    el.addEventListener('pointerdown', pointerDown);
    el.addEventListener('pointermove', pointerMove);
    el.addEventListener('pointerup', pointerUp);
  }

  POINTER.gestureHandlers.gesturescale = emitScale;

})(window.POINTER);

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