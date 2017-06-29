/* eslint-env jest */
import { __, curry } from '../'

describe('curry', () => {
  it('should curry', () => {
    const sum3 = curry((a, b, c) => a + b + c)
    expect(sum3(1, 2, 3)).toBe(6)
    expect(sum3(1)(2)(3)).toBe(6)
    expect(sum3(7, 6)(5)).toBe(18)
    expect(sum3(9)(8, 7)).toBe(24)
  })

  it('should allow placeholders', () => {
    const fn = curry((a, b, c, d) => a + b + c + d)
    expect(fn('a', __, 'c', 'd')('b')).toBe('abcd')
    expect(fn(__, 'b')(__, __, 'd')(__, 'c')('a')).toBe('abcd')
  })

  it('should return function of appropriate arity', () => {
    const fns = [
      () => 0,
      (a) => 1,
      (a, b) => 2,
      (a, b, c) => 3,
      (a, b, c, d) => 4,
      (a, b, c, d, e) => 5,
      (a, b, c, d, e, f) => 6,
      (a, b, c, d, e, f, g) => 7,
      (a, b, c, d, e, f, g, h) => 8,
      (a, b, c, d, e, f, g, h, i) => 9,
      (a, b, c, d, e, f, g, h, i, j) => 10,
      (a, b, c, d, e, f, g, h, i, j, k) => 11
    ]
    fns.forEach((fn, idx) => expect(curry(fn).length).toBe(idx))
  })

  it('should handle functions of all lengths', () => {
    const fns = [
      () => 0,
      (a) => 1,
      (a, b) => 2,
      (a, b, c) => 3,
      (a, b, c, d) => 4,
      (a, b, c, d, e) => 5,
      (a, b, c, d, e, f) => 6,
      (a, b, c, d, e, f, g) => 7,
      (a, b, c, d, e, f, g, h) => 8,
      (a, b, c, d, e, f, g, h, i) => 9,
      (a, b, c, d, e, f, g, h, i, j) => 10,
      (a, b, c, d, e, f, g, h, i, j, k) => 11
    ]
    fns.map(fn => curry(fn)).forEach((fn, idx) => {
      if (idx === 0) return expect(fn()).toBe(0)

      for (var i = 0; i < idx; ++i) {
        fn = fn(i)
      }

      expect(fn).toBe(idx)
    })
  })
})
