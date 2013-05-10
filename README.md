# Heavily modified fork

## Fixes:

- pointerList data should be available when event is bubbled
- native events should only trigger one corresponding pointer event on nested elements
- `gesturedoubletap` should not keep firing on fast successive taps
- mouse down state should be detected globally
- `mouseout` should trigger `pointerup` only at appropriate times

## Changes:

- upgrade build process to use Grunt 0.4.1
- consolidate all global varialbes under `POINTER`
- move `PointerPosition` under `POINTER` for reuse across gesture modules

## Additions:

- `gesturetap` and `gesturedoubletap` events
- provide `ClientX` and `ClientY` in gesture events