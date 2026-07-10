# Macro

The macro module provides integration with macroeconomic data providers. The initial implementation supports fetching release-calendar events from FXMacroData.

- [Macro](#macro)
  - [FXMacroData Release Event](#fxmacrodata-release-event)
  - [FXMacroData Calendar Options](#fxmacrodata-calendar-options)
  - [FXMacroData Release Calendar Function](#fxmacrodata-release-calendar-function)
  - [Has Macro Event On Date Function](#has-macro-event-on-date-function)
  - [Disclaimer & Terms of Use](#disclaimer--terms-of-use)
  - [License](#license)

## FXMacroData Release Event

The [FXMacroDataReleaseEvent](./fxmacrodata.ts#L4-L14) interface represents a single macroeconomic event release from the calendar.

```TypeScript
interface FXMacroDataReleaseEvent {
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
```

## FXMacroData Calendar Options

The [FXMacroDataCalendarOptions](./fxmacrodata.ts#L16-L22) interface represents the configuration options for fetching the macroeconomic calendar.

```TypeScript
interface FXMacroDataCalendarOptions {
  currency?: string;
  limit?: number;
  minTier?: number;
  apiKey?: string;
  baseUrl?: string;
}
```

## FXMacroData Release Calendar Function

The [fxMacroDataReleaseCalendar](./fxmacrodata.ts#L29-L60) function fetches macroeconomic release-calendar events from the [FXMacroData API](https://fxmacrodata.com).

```TypeScript
import { fxMacroDataReleaseCalendar } from 'indicatorts';

// Fetch USD calendar events (free tier, no API key required)
const events = await fxMacroDataReleaseCalendar({
  currency: 'usd',
  limit: 50,
});
```

## Has Macro Event On Date Function

The [hasMacroEventOnDate](./fxmacrodata.ts#L65-L71) function checks whether a release-calendar event falls on a given UTC date.

```TypeScript
import { hasMacroEventOnDate } from 'indicatorts';

const hasEvent = hasMacroEventOnDate(events, new Date('2026-07-09'));
```

## Disclaimer & Terms of Use

This module integrates with the third-party [FXMacroData](https://fxmacrodata.com) service.

- **Attribution & API Usage:** Access to USD-based macroeconomic data is provided for free without an API key. For other currencies, higher limits, or advanced features, an API key must be supplied.
- **Redistribution & Licensing:** Depending on your usage (e.g., displaying data in a public/customer-facing dashboard), you may need a **Commercial Redistribution** license from FXMacroData. Please review their [Terms of Service](https://fxmacrodata.com) and [API Documentation](https://fxmacrodata.com/api-data-docs) to ensure compliance.
- **Affiliation:** This package is an independent integration and is not officially affiliated with, sponsored by, or endorsed by FXMacroData.

## License

Copyright (c) 2022 Onur Cinar. All Rights Reserved.

The source code is provided under MIT License.
