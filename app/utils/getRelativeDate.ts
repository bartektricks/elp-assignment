import { differenceInMonths, format, formatDistanceToNow } from 'date-fns';

/**
 * Returns a relative date string based on the provided date.
 * If the date is within the last month, it returns a relative time string (e.g., "2 days ago").
 * Otherwise, it returns a formatted date string (e.g., "on 15 Jan 2022", "on 4 May").
 *
 * @param date - The date to calculate the relative date for.
 * @returns The relative date string.
 */
export default function getRelativeDate(date: Date) {
  const currentDate = new Date();
  const months = differenceInMonths(currentDate, date);
  const isDifferentYear = currentDate.getFullYear() !== date.getFullYear();

  if (months <= 1) {
    return formatDistanceToNow(date.getTime(), {
      addSuffix: true,
    });
  }

  return format(date, `'on' d MMM ${isDifferentYear ? 'yyyy' : ''}`).trim();
}
