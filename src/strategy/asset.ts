// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Asset object.
 */
export interface Asset {
  dates: Date[];
  openings: number[];
  closings: number[];
  highs: number[];
  lows: number[];
  volumes: number[];
}

/**
 * New asset with length.
 *
 * @param {number} length asset length.
 * @return {Asset} asset object.
 */
export function newAssetWithLength(length: number): Asset {
  return {
    dates: new Array<Date>(length),
    openings: new Array<number>(length),
    closings: new Array<number>(length),
    highs: new Array<number>(length),
    lows: new Array<number>(length),
    volumes: new Array<number>(length),
  };
}

/**
 * Concats the given assets.
 *
 * @param {Asset} asset1 first asset.
 * @param {Asset} asset2 second asset.
 * @return {Asset} new asset.
 */
export function concatAssets(asset1: Asset, asset2: Asset): Asset {
  return {
    dates: [...asset1.dates, ...asset2.dates],
    openings: [...asset1.openings, ...asset2.openings],
    closings: [...asset1.closings, ...asset2.closings],
    highs: [...asset1.highs, ...asset2.highs],
    lows: [...asset1.lows, ...asset2.lows],
    volumes: [...asset1.volumes, ...asset2.volumes],
  };
}
