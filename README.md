# crry
crry is a small library intended to offer currying similar to [ramda](https://github.com/ramda/ramda) and [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide).  
However, it only focuses on such and therefore does not bring any bloat into your code.  
  
I created this after finding that [curry](https://github.com/dominictarr/curry) does not support placeholders, does not have a LICENSE associated with it, and appears to be inactive.  

## Usage
crry exports two functions and a constant:
```js
import { curry, curryN, __ } from 'crry'
```

### curry
`curry` takes a function as its lone argument and returns a curried version of that function.
```js
const sumTrio = curry((a, b, c) => a + b + c)

sumTrio(1, 2, 3) // -> 6
sumTrio(1, 2)(3) // -> 6
sumTrio(1)(2, 3) // -> 6
sumTrio(1)(2)(3) // -> 6
```

### curryN
`curryN` is for when your function cannot be automatically determined by `curry`
```js
const calculate = curryN(3, (...args) => args[0] + args[1] * args[2])

calculate(7)(2)(3) // -> 13
```

### __
`__` is a placeholder, which allows you to wait for arguments in specific positions.
```js
const calculate = curry((a, b, c) => (b - a) * c

calculate(2, __, 3)(1) // -> -3
```

