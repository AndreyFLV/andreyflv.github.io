function extend(base, sub, methods) {
  sub.prototype = Object.create(base.prototype);
  sub.prototype.constructor = sub;
  sub.base = base.prototype;
 
  // Copy the methods passed in to the prototype
  for (var name in methods) {
    sub.prototype[name] = methods[name];
  }
  // so we can define the constructor inline
  return sub;
}

String.prototype.format = function() {
  var args = arguments;
  return this.replace(/{(\d+)}/g, function(match, number) { 
    return typeof args[number] != 'undefined'
      ? args[number]
      : match
    ;
  });
};

// Extending Array prototype with new function,
// if that function is already defined in "Array.prototype", 
// then "Object.defineProperty" will throw an exception
Object.defineProperty(Array.prototype, "removeValue", {
    // Specify "enumerable" as "false" to prevent function enumeration
    enumerable: false,

    /**
    * Removes all occurence of specified item from array
    * @this Array
    * @param itemToRemove Item to remove from array
    * @returns {Number} Count of removed items
    */
    value: function (itemToRemove) {
        // Count of removed items
        var removeCounter = 0;

        // Iterate every array item
        for (var index = 0; index < this.length; index++) {
            // If current array item equals itemToRemove then
            if (this[index] === itemToRemove) {
                // Remove array item at current index
                this.splice(index, 1);

                // Increment count of removed items
                removeCounter++;

                // Decrement index to iterate current position 
                // one more time, because we just removed item 
                // that occupies it, and next item took it place
                index--;
            }
        }

        // Return count of removed items
        return removeCounter;
    }
});

function _doBlink(elm, blinksLeft, blinkSpacing) {
  if (blinksLeft <= 0)
    return;

  if (elm.css('visibility') != 'visible')
    elm.css('visibility', 'visible');
  else
    elm.css('visibility', 'hidden');

  setTimeout(function() {
    _doBlink(elm, blinksLeft - 1, blinkSpacing);
  }, blinkSpacing);
};

function _blink(elm, numBlinks, waitTime, blinkSpacing) {
  setTimeout(function() {
    _doBlink(elm, numBlinks, blinkSpacing);
  }, waitTime);
};

function _doBlinkCB(elm, blinksLeft, blinkSpacing, func) {
  if (blinksLeft <= 0)
    return;

  func();

  setTimeout(function() {
    _doBlinkCB(elm, blinksLeft - 1, blinkSpacing, func);
  }, blinkSpacing);
};

function _blinkCB(elm, numBlinks, waitTime, blinkSpacing, func) {
  setTimeout(function() {
    _doBlinkCB(elm, numBlinks, blinkSpacing, func);
  }, waitTime);
}
