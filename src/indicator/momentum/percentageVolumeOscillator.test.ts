// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual } from 'assert';
import { roundDigitsAll } from '../../helper/numArray';
import { percentageVolumeOscillator } from './percentageVolumeOscillator';

describe('Percent Volume Oscillator (PVO)', () => {
  it('should be able to compute pvo', () => {
    const volumes = [
      6954, 4511, 4474, 4126, 4572, 3936, 3192, 3090, 3476, 3852, 3107, 3604,
      4145, 5192, 3560, 3961, 4322, 3901, 3392, 4278, 4212, 4428, 3846, 3824,
      4142, 4964, 4683, 4630, 4746, 4254, 4197, 4236, 3877, 4474, 3943, 3969,
      3876, 3760, 4061, 3930, 3833, 3678, 3197, 3509, 3634, 3273, 3451, 3452,
      3453, 4054, 4137, 3906, 3833, 3828, 3782, 3665, 4239, 3696, 3577, 3573,
      4014, 3962, 3961, 6681, 4174, 5002, 4331, 4757, 3877, 4008, 4220, 6237,
      5506, 4558, 4062, 4409, 4679, 4594, 3941, 5070, 3814, 4007, 3871, 3596,
      3478, 3363, 3466, 4164, 4490, 3662,
    ];

    const expectedPvo = [
      0, -2.88, -5.28, -7.67, -8.98, -10.88, -13.49, -15.76, -16.92, -17.12,
      -18.45, -18.51, -17.41, -14.45, -14.91, -14.4, -13.19, -12.87, -13.46,
      -12.11, -11.04, -9.66, -9.57, -9.45, -8.64, -6.34, -5.01, -4.01, -2.97,
      -3.01, -3.12, -3.1, -3.72, -3.05, -3.49, -3.75, -4.09, -4.55, -4.28,
      -4.28, -4.42, -4.79, -6.03, -6.32, -6.22, -6.85, -6.9, -6.88, -6.78,
      -5.32, -3.95, -3.32, -2.94, -2.63, -2.44, -2.52, -1.35, -1.55, -1.94,
      -2.23, -1.51, -1.04, -0.66, 4.99, 4.41, 5.45, 4.94, 5.27, 3.86, 2.94,
      2.59, 5.92, 7.04, 6.21, 4.63, 3.94, 3.82, 3.54, 2.13, 2.99, 1.42, 0.49,
      -0.5, -1.8, -3.06, -4.27, -5, -4.11, -2.72, -3.24,
    ];

    const expectedSignal = [
      0, -0.58, -1.52, -2.75, -3.99, -5.37, -6.99, -8.75, -10.38, -11.73,
      -13.07, -14.16, -14.81, -14.74, -14.77, -14.7, -14.4, -14.09, -13.97,
      -13.59, -13.08, -12.4, -11.83, -11.36, -10.81, -9.92, -8.94, -7.95, -6.96,
      -6.17, -5.56, -5.07, -4.8, -4.45, -4.26, -4.15, -4.14, -4.22, -4.23,
      -4.24, -4.28, -4.38, -4.71, -5.03, -5.27, -5.59, -5.85, -6.05, -6.2,
      -6.02, -5.61, -5.15, -4.71, -4.29, -3.92, -3.64, -3.18, -2.86, -2.67,
      -2.58, -2.37, -2.1, -1.81, -0.45, 0.52, 1.51, 2.19, 2.81, 3.02, 3, 2.92,
      3.52, 4.22, 4.62, 4.62, 4.49, 4.35, 4.19, 3.78, 3.62, 3.18, 2.64, 2.02,
      1.25, 0.39, -0.54, -1.43, -1.97, -2.12, -2.34,
    ];

    const expectedHistogram = [
      0, -2.3, -3.76, -4.92, -4.98, -5.51, -6.5, -7.02, -6.54, -5.39, -5.38,
      -4.35, -2.6, 0.29, -0.13, 0.3, 1.21, 1.22, 0.5, 1.48, 2.05, 2.74, 2.26,
      1.91, 2.17, 3.58, 3.93, 3.94, 3.99, 3.15, 2.44, 1.97, 1.08, 1.39, 0.77,
      0.41, 0.05, -0.33, -0.05, -0.03, -0.14, -0.41, -1.32, -1.28, -0.95, -1.26,
      -1.06, -0.82, -0.58, 0.7, 1.66, 1.83, 1.77, 1.67, 1.48, 1.12, 1.84, 1.31,
      0.74, 0.35, 0.86, 1.07, 1.16, 5.44, 3.89, 3.94, 2.75, 2.46, 0.84, -0.06,
      -0.33, 2.4, 2.82, 1.59, 0.01, -0.55, -0.53, -0.65, -1.65, -0.63, -1.76,
      -2.15, -2.51, -3.05, -3.45, -3.73, -3.56, -2.14, -0.6, -0.9,
    ];

    const actual = percentageVolumeOscillator(volumes);
    deepStrictEqual(roundDigitsAll(2, actual.pvo), expectedPvo);
    deepStrictEqual(roundDigitsAll(2, actual.signal), expectedSignal);
    deepStrictEqual(roundDigitsAll(2, actual.histogram), expectedHistogram);
  });
});
