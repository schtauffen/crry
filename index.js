//! crry - Copyright (c) 2017, Zach Dahl; This source code is licensed under the ISC-style license found in the LICENSE file in the root directory of this source tree
var type = '@@functional/placeholder'
var __ = {}
__[type] = true

function makeCurriedFunction (len, args, placeholders, fn) {
  return function () {
    var pArgs = args.slice()
    var pPlaceholders = []

    var max = len - pArgs.length
    var il = Math.min(arguments.length, max)

    for (var i = 0; i < il; ++i) {
      var arg = arguments[i]
      if (arg === __ || arg && arg[type]) {
        if (placeholders.length > 0) {
          pPlaceholders.unshift(placeholders[0])
          placeholders = placeholders.slice(1)
        } else {
          pPlaceholders.push(pArgs.length + pPlaceholders.length + placeholders.length)
        }
      } else if (placeholders.length > 0) {
        pArgs.splice(placeholders[0], 0, arg)
        placeholders = placeholders.slice(1)
      } else {
        pArgs.push(arg)
      }
    }

    if (pArgs.length >= len) return fn.apply(fn, pArgs)

    return arity(len - pArgs.length, makeCurriedFunction(len, pArgs, placeholders.concat(pPlaceholders), fn))
  }
}

function arity (n, fn) {
  switch (n) {
    case  0: return fn
    case  1: return function (a) { return fn.apply(this, arguments) }
    case  2: return function (a, b) { return fn.apply(this, arguments) }
    case  3: return function (a, b, c) { return fn.apply(this, arguments) }
    case  4: return function (a, b, c, d) { return fn.apply(this, arguments) }
    case  5: return function (a, b, c, d, e) { return fn.apply(this, arguments) }
    case  6: return function (a, b, c, d, e, f) { return fn.apply(this, arguments) }
    case  7: return function (a, b, c, d, e, f, g) { return fn.apply(this, arguments) }
    case  8: return function (a, b, c, d, e, f, g, h) { return fn.apply(this, arguments) }
    case  9: return function (a, b, c, d, e, f, g, h, i) { return fn.apply(this, arguments) }
    case 10: return function (a, b, c, d, e, f, g, h, i, j) { return fn.apply(this, arguments) }
    default: throw new Error('arity requires 0 <= n <= 10, given: ' + n)
  }
}

function curry (fn) {
  return makeCurriedFunction(fn.length, [], [], fn)
}

function curryN (len, fn) {
  return makeCurriedFunction(len, [], [], fn)
}

module.exports = {
  __: __,
  curry: curry(curry),
  curryN: curry(curryN)
}

