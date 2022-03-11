// crry - Copyright (c) 2017, Zach Dahl; This source code is licensed under the ISC-style license found in the LICENSE file in the root directory of this source tree
interface I__ {
  "@@functional/placeholder": true;
}

type TupleSplit<T extends any[], L extends number, F = (...a: T) => void> = [
  { init: []; rest: T },
  F extends (a: infer A, ...z: infer Z) => void
    ? { init: [A]; rest: Z }
    : never,
  F extends (a: infer A, b: infer B, ...z: infer Z) => void
    ? { init: [A, B]; rest: Z }
    : never,
  F extends (a: infer A, b: infer B, c: infer C, ...z: infer Z) => void
    ? { init: [A, B, C]; rest: Z }
    : never,
  // etc etc for tuples of length 4 and greater
  ...{ init: T; rest: [] }[]
][L];

type Curried<A extends any[], R> = <L extends TupleSplit<A, number>["init"]>(
  ...args: L
) => 0 extends L["length"]
  ? never
  : 0 extends TupleSplit<A, L["length"]>["rest"]["length"]
  ? R
  : Curried<TupleSplit<A, L["length"]>["rest"], R>;

const type = "@@functional/placeholder";
const __: I__ = {} as any;
__[type] = true;

function is__(p: any): boolean {
  return __ === p || (p && p[type]);
}

function find__(arr: any[], len: number, start: number) {
  while (start < len) {
    if (is__(arr[start])) return start;
    start++;
  }
  return start;
}

function makeCurriedFunction<A extends any[], R>(
  length: number,
  args: A,
  fn: (...args: A) => R
): Curried<A, R> {
  return <Curried<A, R>>function (this: any) {
    const combined = <A>args.slice();
    let next = find__(combined, length, 0);
    const aLen = arguments.length;
    let adx = 0;

    while (next < length && adx < aLen) {
      if (!is__(arguments[adx])) {
        combined[next] = arguments[adx];
      }
      next = find__(combined, length, next + 1);
      adx++;
    }

    let idx = 0;
    let left = 0;
    while (idx < length) {
      if (is__(combined[idx++])) left++;
    }

    return left <= 0
      ? fn.apply(this, combined)
      : arity(left, makeCurriedFunction(length, combined, fn));
  };
}

function arity<T>(n: number, fn: T): T {
  switch (n) {
    case 0:
      return fn;
    /* eslint-disable @typescript-eslint/no-unused-vars */
    case 1:
      return function (this: any, a: any) {
        return (fn as any).apply(this, arguments);
      } as unknown as T;
    case 2:
      return function (this: any, a: any, b: any) {
        return (fn as any).apply(this, arguments);
      } as unknown as T;
    case 3:
      return function (this: any, a: any, b: any, c: any) {
        return (fn as any).apply(this, arguments);
      } as unknown as T;
    case 4:
      return function (this: any, a: any, b: any, c: any, d: any) {
        return (fn as any).apply(this, arguments);
      } as unknown as T;
    case 5:
      return function (this: any, a: any, b: any, c: any, d: any, e: any) {
        return (fn as any).apply(this, arguments);
      } as unknown as T;
    case 6:
      return function (
        this: any,
        a: any,
        b: any,
        c: any,
        d: any,
        e: any,
        f: any
      ) {
        return (fn as any).apply(this, arguments);
      } as unknown as T;
    case 7:
      return function (
        this: any,
        a: any,
        b: any,
        c: any,
        d: any,
        e: any,
        f: any,
        g: any
      ) {
        return (fn as any).apply(this, arguments);
      } as unknown as T;
    case 8:
      return function (
        this: any,
        a: any,
        b: any,
        c: any,
        d: any,
        e: any,
        f: any,
        g: any,
        h: any
      ) {
        return (fn as any).apply(this, arguments);
      } as unknown as T;
    case 9:
      return function (
        this: any,
        a: any,
        b: any,
        c: any,
        d: any,
        e: any,
        f: any,
        g: any,
        h: any,
        i: any
      ) {
        return (fn as any).apply(this, arguments);
      } as unknown as T;
    case 10:
      return function (
        this: any,
        a: any,
        b: any,
        c: any,
        d: any,
        e: any,
        f: any,
        g: any,
        h: any,
        i: any,
        j: any
      ) {
        return (fn as any).apply(this, arguments);
      } as unknown as T;
    /* eslint-enable @typescript-eslint/no-unused-vars */
    default:
      throw new Error("curry only supports functions up to length 10");
  }
}

function curry<A extends any[], R>(fn: (...args: A) => R): Curried<A, R> {
  return curryN(fn.length, fn);
}

function curryN<A extends any[], R>(
  len: number,
  fn: (...args: A) => R
): Curried<A, R> {
  let i = 0;
  const args = <A>Array(len);
  while (i < len) {
    args[i++] = __;
  }
  return arity(len, makeCurriedFunction(len, args, fn));
}

export { __, curry, curryN };
