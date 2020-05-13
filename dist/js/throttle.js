"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = throttle;

function throttle(fn, delay) {
  var timer;
  return function () {
    var _arguments = arguments,
        _this = this;

    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        fn.apply(_this, _arguments);
      }, delay);
    }
  };
}