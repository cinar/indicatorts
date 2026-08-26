// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

import { deepStrictEqual, rejects, strictEqual } from 'assert';
import {
  fxMacroDataReleaseCalendar,
  hasMacroEventOnDate,
  FXMacroDataReleaseEvent,
} from './fxmacrodata';

describe('FXMacroData Integration', () => {
  const originalFetch = global.fetch;
  let mockFetch: jest.Mock;

  beforeAll(() => {
    mockFetch = jest.fn();
    global.fetch = mockFetch;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('should fetch calendar with default options successfully', async () => {
    const mockEvents: FXMacroDataReleaseEvent[] = [
      {
        date: '2026-07-09',
        release: 'Non-Farm Payrolls',
        name: 'NFP',
        market_tier: 1,
        top_tier_for_currency: true,
        announcement_datetime: 1783680000,
        announcement_datetime_utc: '2026-07-09T12:30:00Z',
        event_importance: 'high',
      },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: mockEvents }),
    });

    const result = await fxMacroDataReleaseCalendar();

    strictEqual(mockFetch.mock.calls.length, 1);
    strictEqual(
      mockFetch.mock.calls[0][0],
      'https://api.fxmacrodata.com/v1/calendar/usd?limit=50',
    );
    deepStrictEqual(result, mockEvents);
  });

  it('should fetch calendar with custom options successfully', async () => {
    const mockEvents: FXMacroDataReleaseEvent[] = [
      { date: '2026-07-09', market_tier: 1 },
      { date: '2026-07-10', market_tier: 2 },
      { date: '2026-07-11', market_tier: 3 },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: mockEvents }),
    });

    const result = await fxMacroDataReleaseCalendar({
      currency: 'eur',
      limit: 10,
      minTier: 2,
      apiKey: 'test-api-key',
      baseUrl: 'https://custom-api.com/',
    });

    strictEqual(mockFetch.mock.calls.length, 1);
    strictEqual(
      mockFetch.mock.calls[0][0],
      'https://custom-api.com/calendar/eur?limit=10&api_key=test-api-key',
    );
    deepStrictEqual(result, [
      { date: '2026-07-09', market_tier: 1 },
      { date: '2026-07-10', market_tier: 2 },
    ]);
  });

  it('should enforce limit boundaries', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: [] }),
    });

    await fxMacroDataReleaseCalendar({ limit: 150 });
    strictEqual(
      mockFetch.mock.calls[0][0],
      'https://api.fxmacrodata.com/v1/calendar/usd?limit=100',
    );

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: [] }),
    });

    await fxMacroDataReleaseCalendar({ limit: 0 });
    strictEqual(
      mockFetch.mock.calls[1][0],
      'https://api.fxmacrodata.com/v1/calendar/usd?limit=1',
    );
  });

  it('should handle API errors', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
    });

    await rejects(
      fxMacroDataReleaseCalendar(),
      /FXMacroData returned 403 Forbidden/,
    );
  });

  it('should handle payload with missing data field', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const result = await fxMacroDataReleaseCalendar();
    deepStrictEqual(result, []);
  });

  it('should handle events with missing market_tier', async () => {
    const mockEvents: FXMacroDataReleaseEvent[] = [
      { date: '2026-07-09' },
    ];

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ data: mockEvents }),
    });

    const result = await fxMacroDataReleaseCalendar({
      minTier: 2,
    });
    deepStrictEqual(result, []);
  });

  it('should check if macro event falls on a date correctly', () => {
    const mockEvents: FXMacroDataReleaseEvent[] = [
      { date: '2026-07-09', name: 'Event A' },
      { date: '2026-07-10', name: 'Event B' },
    ];

    strictEqual(
      hasMacroEventOnDate(mockEvents, new Date('2026-07-09T10:00:00Z')),
      true,
    );
    strictEqual(
      hasMacroEventOnDate(mockEvents, new Date('2026-07-10T23:59:59Z')),
      true,
    );
    strictEqual(
      hasMacroEventOnDate(mockEvents, new Date('2026-07-11T00:00:00Z')),
      false,
    );
  });
});
