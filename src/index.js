//! crry - Copyright (c) 2017, Zach Dahl; This source code is licensed under the ISC-style license found in the LICENSE file in the root directory of this source tree
var type = '@@functional/placeholder'
var __ = {}
__[type] = true

function is__ (p) {
  return __ === p || p && p[type]
}

function find__ (arr, len, start) {
  while (start < len) {
    if (is__(arr[start])) return start
    start++
  }
  return start
}

function makeCurriedFunction (length, args, fn) {
  return function () {
    var combined = args.slice()
    var next = find__(combined, length, 0)
    var aLen = arguments.length
    var adx = 0

    while (next < length && adx < aLen) {
      if (!is__(arguments[adx])) {
        combined[next] = arguments[adx]
      }
      next = find__(combined, length, next + 1)
      adx++
    }

    var idx = 0
    var left = 0
    while (idx < length) {
      if (is__(combined[idx++])) left++
    }

    return left <= 0
      ? fn.apply(this, combined)
      : arity(left, makeCurriedFunction(length, combined, fn))
  }
}

function arity (n, fn) {
  switch (n) {
    case 0: return fn
    case 1: return function (a) { return fn.apply(this, arguments) }
    case 2: return function (a, b) { return fn.apply(this, arguments) }
    case 3: return function (a, b, c) { return fn.apply(this, arguments) }
    case 4: return function (a, b, c, d) { return fn.apply(this, arguments) }
    case 5: return function (a, b, c, d, e) { return fn.apply(this, arguments) }
    case 6: return function (a, b, c, d, e, f) { return fn.apply(this, arguments) }
    case 7: return function (a, b, c, d, e, f, g) { return fn.apply(this, arguments) }
    case 8: return function (a, b, c, d, e, f, g, h) { return fn.apply(this, arguments) }
    case 9: return function (a, b, c, d, e, f, g, h, i) { return fn.apply(this, arguments) }
    case 10: return function (a, b, c, d, e, f, g, h, i, j) { return fn.apply(this, arguments) }
    default:
      var args = []
      for (var i = 0; i < n; ++i) args.push('a' + i)
      // eslint-disable-next-line
      return eval('0||function(' + args.join(',') + '){return fn.apply(this, arguments)}')
  }
}

function curry (fn) {
  return curryN(fn.length, fn)
}

function curryN (len, fn) {
  var i = 0
  var args = Array(len)
  while (i < len) {
    args[i++] = __
  }
  return arity(len, makeCurriedFunction(len, args, fn))
}

export { __, curry, curryN }
