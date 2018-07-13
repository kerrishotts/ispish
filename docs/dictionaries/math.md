# Math

The mathematics dictionary provides useful mathematical constants and definitions.

```text
require math
math.pi
→ 3.141592653589793
```

## Mathematical Constants

The following constants are provided:

symbol | constant
-------|---------
&pi;   | `math.pi`

## Geometry Definitions

### math.cos

Returns the _cosine_ of the provided angle in radians. You can use `math.from.deg.to.rad` to convert from degrees to radians.

```text
require math
math.cos math.pi
→ -1
math.cos (math.from.deg.to.rad 180)
→ -1
```

### math.sin

Returns the _sine_ of the provided angle in radians. You can use `math.from.deg.to.rad` to convert from degrees to radians.


```text
require math
math.sin math.pi
→ 1.2246467991473532e-16
math.sin (math.from.deg.to.rad 180)
→ 1.2246467991473532e-16
```

## Mathematical Conversion

### math.from.deg.to.rad _x_
### math.from.rad.to.deg _x_
### math.to.deg.from.rad _x_
### math.to.rad.from.deg _x_

## Randomness

### math.random

Returns a random number between zero and one.

```text
require math
math.random
→ 0.1593227320383903
```

### math.random.integer.between _low_ _high_

### math.random.between _low_ _high_


## Rounding

### math.floor _x_

### math.ceil _x_

### math.round _x_

### math.integer _x_
