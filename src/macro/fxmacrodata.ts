// Copyright (c) 2022 Onur Cinar. All Rights Reserved.
// https://github.com/cinar/indicatorts

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

export interface FXMacroDataCalendarOptions {
  currency?: string;
  limit?: number;
  minTier?: number;
  apiKey?: string;
  baseUrl?: string;
}

const DEFAULT_BASE_URL = 'https://fxmacrodata.com/api/v1';

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

  return events
    .filter((event) => (event.market_tier ?? 99) <= options.minTier!)
    .slice(0, limit);
}

export function hasMacroEventOnDate(
  events: FXMacroDataReleaseEvent[],
  date: Date,
): boolean {
  const isoDate = date.toISOString().slice(0, 10);
  return events.some((event) => event.date === isoDate);
}
