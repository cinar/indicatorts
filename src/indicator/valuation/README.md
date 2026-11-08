# Valuation Functions

Valuation functions compute the time value of money: how an amount grows at a given rate, and what a future amount or a series of cash flows is worth today.

The API reference below is generated from the JSDoc comments by [tsdoc-markdown](https://github.com/peterpeterparker/tsdoc-markdown); run `npm run docs` after changing them.

<!-- TSDOC_START -->

## Functions

- [fv](#fv)
- [npv](#npv)
- [pv](#pv)

### fv

Future Value (FV). It is the value of a present amount after it grows at
the given rate, compounded once per year, for the given number of years.

```
FV = PV * (1 + rate)^years
```

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `fv`     | `(pv: number, rate: number, years: number) => number` |

Parameters:

- `pv`: present value.
- `rate`: rate per year, such as 0.05 for 5%.
- `years`: number of years.

Examples:

```TypeScript
import { fv } from 'indicatorts';

const result = fv(100, 0.05, 5); // 127.63

// Alternatively:
// const result = futureValue(100, 0.05, 5);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/valuation/futureValue.ts#L26)

### npv

Net Present Value (NPV). It is the sum of the present values of a series
of cash flows, one per period, with the first cash flow at the end of
the first period.

```
NPV = Sum(CF[i] / (1 + rate)^i), for i = 1 to n
```

| Function | Type                                            |
| -------- | ----------------------------------------------- |
| `npv`    | `(rate: number, cashFlows: number[]) => number` |

Parameters:

- `rate`: rate per period, such as 0.1 for 10%.
- `cashFlows`: cash flows, one per period.

Examples:

```TypeScript
import { npv } from 'indicatorts';

const result = npv(0.1, [100, 100, 100]); // 248.69

// Alternatively:
// const result = netPresentValue(0.1, [100, 100, 100]);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/valuation/netPresentValue.ts#L26)

### pv

Present Value (PV). It is the amount today that grows to the given future
value at the given rate, compounded once per year, in the given number
of years.

```
PV = FV / (1 + rate)^years
```

| Function | Type                                                  |
| -------- | ----------------------------------------------------- |
| `pv`     | `(fv: number, rate: number, years: number) => number` |

Parameters:

- `fv`: future value.
- `rate`: rate per year, such as 0.05 for 5%.
- `years`: number of years.

Examples:

```TypeScript
import { pv } from 'indicatorts';

const result = pv(100, 0.05, 5); // 78.35

// Alternatively:
// const result = presentValue(100, 0.05, 5);
```

[Source](https://github.com/cinar/indicatorts/tree/main/src/indicator/valuation/presentValue.ts#L27)

<!-- TSDOC_END -->

## Disclaimer

The information provided on this project is strictly for informational purposes and is not to be construed as advice or solicitation to buy or sell any security.

## License

Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.

The source code is provided under MIT License.
