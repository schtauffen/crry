// crry - Copyright (c) 2017-2022, Zach Dahl; This source code is licensed under the ISC-style license found in the LICENSE file in the root directory of this source tree
import { A, F } from "ts-toolbelt";

const type = "@@functional/placeholder";
const __ = {} as A.x;
(__ as any)[type] = true;

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

function makeCurriedFunction<Fn extends F.Function>(
  length: number,
  args: any[],
  fn: Fn
): F.Curry<Fn> {
  return function (this: any) {
    const combined = args.slice();
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

function curry<Fn extends F.Function>(fn: Fn): F.Curry<Fn> {
  return curryN(fn.length, fn);
}

function curryN<Fn extends F.Function>(len: number, fn: Fn): F.Curry<Fn> {
  let i = 0;
  const args = Array(len);
  while (i < len) {
    args[i++] = __;
  }
  return arity(len, makeCurriedFunction(len, args, fn));
}

export { __, curry, curryN };
