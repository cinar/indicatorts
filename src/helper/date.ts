// Copyright (c) 2022-2026 The Indicator Authors. All rights reserved.
// https://github.com/cinar/indicatorts

/**
 * To ISO date string. Formats the date's local calendar day as YYYY-MM-DD,
 * consistent with the other date helpers, regardless of the timezone.
 * @param date date object.
 * @return ISO date.
 */
export function toISODateString(date: Date): string {
  const pad = (value: number, length: number): string => {
    let text = value.toString();
    while (text.length < length) {
      text = '0' + text;
    }
    return text;
  };

  return (
    pad(date.getFullYear(), 4) +
    '-' +
    pad(date.getMonth() + 1, 2) +
    '-' +
    pad(date.getDate(), 2)
  );
}

/**
 * DaysAgo function returns a date for the given days ago.
 * @param days days ago.
 * @return date object.
 */
export function daysAgo(days: number): Date {
  const ago = new Date();
  ago.setDate(ago.getDate() - days);
  return ago;
}

/**
 * DaysLaterFrom function returns a date later from given
 * date in given days.
 * @param date date object.
 * @param days days later.
 * @return date object.
 */
export function daysLaterFrom(date: Date, days: number): Date {
  const later = new Date(date);
  later.setDate(later.getDate() + days);
  return later;
}

/**
 * ToMonthAndDay function returns string representation of
 * the date as month and day.
 * @param date date boject.
 * @return month and day string.
 */
export function toMonthAndDay(date: Date): string {
  return (date.getMonth() + 1).toString() + '/' + date.getDate().toString();
}
