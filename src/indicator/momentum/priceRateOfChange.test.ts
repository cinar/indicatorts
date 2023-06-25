import { deepStrictEqual } from "assert";
import { roundDigitsAll } from "../../helper/numArray";
import { roc } from "./priceRateOfChange";

describe("Price Rate of Change (ROC)", () => {
  it("should be able to compute ROC", () => {
    const values = [1, 3, 5, 4, 2, 4];
    const expected = [0, 0, 400, 33.33, -60, 0];
    const period = 3;

    const actual = roc(period, values);
    deepStrictEqual(roundDigitsAll(2, actual), expected);
  });
});
