// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Since value is changed.
 * @param values values array.
 * @return since changed.
 */
export function since(values: number[]): number[] {
  const result = new Array<number>(values.length);

  if (values.length > 0) {
    let last = null;
    let count = 0;

    for (let i = 0; i < values.length; i++) {
      if (last !== values[i]) {
        last = values[i];
        count = 0;
      } else {
        count++;
      }

      result[i] = count;
    }
  }

  return result;
}
