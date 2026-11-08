// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

import { describe, it, expect } from 'vitest';
import { Action } from '../src/strategy/action';
import { Asset } from '../src/strategy/asset';
import { STRATEGY_INFOS } from './strategyInfo';

/**
 * Generates a deterministic random walk with consistent OHLCV bars, so
 * that every closing and opening lies within its bar's high and low.
 */
function randomWalkAsset(length: number, seed: number): Asset {
  let state = seed;
  const random = (): number => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };

  const asset: Asset = {
    dates: [],
    openings: [],
    closings: [],
    highs: [],
    lows: [],
    volumes: [],
  };

  let price = 100;
  for (let i = 0; i < length; i++) {
    const opening = price;
    price *= 1 + (random() - 0.5) * 0.04;
    asset.dates.push(new Date(2020, 0, i + 1));
    asset.openings.push(opening);
    asset.closings.push(price);
    asset.highs.push(Math.max(opening, price) * (1 + random() * 0.01));
    asset.lows.push(Math.min(opening, price) * (1 - random() * 0.01));
    asset.volumes.push(1000 + Math.floor(random() * 9000));
  }

  return asset;
}

function sliceAsset(asset: Asset, end: number): Asset {
  return {
    dates: asset.dates.slice(0, end),
    openings: asset.openings.slice(0, end),
    closings: asset.closings.slice(0, end),
    highs: asset.highs.slice(0, end),
    lows: asset.lows.slice(0, end),
    volumes: asset.volumes.slice(0, end),
  };
}

describe('Example strategy infos', () => {
  const asset = randomWalkAsset(300, 7);
  const validActions = [Action.BUY, Action.SELL, Action.HOLD];

  it('should have unique names', () => {
    const names = STRATEGY_INFOS.map((info) => info.name);
    expect(new Set(names).size).toBe(names.length);
  });

  describe.each(STRATEGY_INFOS.map((info) => [info.name, info] as const))(
    '%s',
    (_, info) => {
      it('should return one valid action per bar', () => {
        const actions = info.strategy(asset);
        expect(actions).toHaveLength(asset.closings.length);
        for (const action of actions) {
          expect(validActions).toContain(action);
        }
      });

      it('should not use future bars', () => {
        // The actions for the first n bars must not change when the
        // later bars are removed, otherwise the strategy is looking ahead.
        const actions = info.strategy(asset);
        for (const end of [1, 2, 60, 150, 299]) {
          expect(info.strategy(sliceAsset(asset, end))).toStrictEqual(
            actions.slice(0, end)
          );
        }
      });

      it('should return no actions for an empty asset', () => {
        expect(info.strategy(sliceAsset(asset, 0))).toStrictEqual([]);
      });
    }
  );
});
