// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Optional configuration of SMA parameters.
 */
export interface SMAConfig {
	period?: number;
}

/**
 * The default configuration of SMA.
 */
export const SMADefaultConfig: Required<SMAConfig> = {
	period: 2,
};

/**
 * Simple moving average (SMA).
 * @param values values array.
 * @param config configuration.
 * @return SMA values.
 */
export function sma(values: number[], config: SMAConfig = {}): number[] {
	const { period } = { ...SMADefaultConfig, ...config };
	return values.map((_, i) => {
		const range = values.slice(Math.max(0, i - period + 1), i + 1);
		const valid = range.filter((v) => !Number.isNaN(v));
		return valid.length < period
			? Number.NaN
			: valid.reduce((a, b) => a + b, 0) / period;
	});
}

// Export full name
export { sma as simpleMovingAverage };
