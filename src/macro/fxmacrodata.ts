// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

/**
 * Represents a single macroeconomic release-calendar event from the FXMacroData API.
 * For more details, see the official documentation at https://fxmacrodata.com/api-data-docs.
 */
export interface FXMacroDataReleaseEvent {
  date?: string;
  release?: string;
  name?: string;
  market_tier?: number;
  top_tier_for_currency?: boolean;
  announcement_datetime?: number;
  announcement_datetime_utc?: string;
  event_importance?: string;
  [key: string]: unknown;
}

/**
 * Configuration options for requesting the FXMacroData macroeconomic calendar.
 *
 * Note: Free access is provided for USD-based macroeconomic endpoints and forex price data
 * without requiring an API key. Paid options or commercial redistribution may require
 * an API key and additional licensing terms from FXMacroData.
 */
export interface FXMacroDataCalendarOptions {
  currency?: string;
  limit?: number;
  minTier?: number;
  apiKey?: string;
  baseUrl?: string;
}

const DEFAULT_BASE_URL = 'https://fxmacrodata.com/api/v1';

/**
 * Fetches release-calendar events from the FXMacroData API.
 *
 * For licensing details, terms of service, and api keys, please visit:
 * - Home Page: https://fxmacrodata.com
 * - API Documentation: https://fxmacrodata.com/api-data-docs
 *
 * @param options configuration options.
 * @return release-calendar events.
 */
export async function fxMacroDataReleaseCalendar(
  options: FXMacroDataCalendarOptions = {},
): Promise<FXMacroDataReleaseEvent[]> {
  const currency = options.currency ?? 'usd';
  const baseUrl = options.baseUrl ?? DEFAULT_BASE_URL;
  const limit = Math.max(1, Math.min(options.limit ?? 50, 100));
  const params = new URLSearchParams({
    limit: String(limit),
  });

  if (options.apiKey) {
    params.set('api_key', options.apiKey);
  }

  const response = await fetch(
    `${baseUrl.replace(/\/$/, '')}/calendar/${currency.toLowerCase()}?${params.toString()}`,
  );
  if (!response.ok) {
    throw new Error(`FXMacroData returned ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as { data?: FXMacroDataReleaseEvent[] };
  const events = payload.data ?? [];
  if (options.minTier === undefined) {
    return events.slice(0, limit);
  }

  const minTier = options.minTier;
  return events
    .filter((event) => (event.market_tier ?? 99) <= minTier)
    .slice(0, limit);
}

/**
 * Checks whether a release-calendar event falls on a given UTC date.
 *
 * @param events list of release-calendar events.
 * @param date the date to check.
 * @return true if a macro event falls on the given date, false otherwise.
 */
export function hasMacroEventOnDate(
  events: FXMacroDataReleaseEvent[],
  date: Date,
): boolean {
  const isoDate = date.toISOString().slice(0, 10);
  return events.some((event) => event.date === isoDate);
}
