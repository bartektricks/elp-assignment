import { sub } from 'date-fns';
import getRelativeDate from '~/utils/getRelativeDate';

const staticDateInThePast = new Date(2024, 3, 31);

test('should return relative date a minute ago', () => {
  const minuteAgo = sub(new Date(), { minutes: 1 });
  const result = getRelativeDate(minuteAgo);

  expect(result).toBe('1 minute ago');
});

test('should return relative date 30 minutes ago', () => {
  const minuteAgo = sub(new Date(), { minutes: 30 });
  const result = getRelativeDate(minuteAgo);

  expect(result).toBe('30 minutes ago');
});

test('should return a relative less than a month', () => {
  const minuteAgo = sub(new Date(), { days: 31 });
  const result = getRelativeDate(minuteAgo);

  expect(result).toBe('about 1 month ago');
});

test('should return a "on d MMM" format if it\'s more than a month but same year', () => {
  const minuteAgo = sub(staticDateInThePast, { days: 80 });
  const result = getRelativeDate(minuteAgo);

  expect(result).toBe('on 11 Feb');
});

test('should return a "on d MMM YYYY" format if it\'s a different year', () => {
  const minuteAgo = sub(staticDateInThePast, { years: 1 });
  const result = getRelativeDate(minuteAgo);

  expect(result).toBe('on 1 May 2023');
});

test('should return formatted date when months >= 1', () => {
  const date = new Date(2022, 0, 1); // Update the date based on your test case
  const result = getRelativeDate(date);
  const expected = 'on 1 Jan 2022'; // Update the expected value based on your locale

  expect(result).toBe(expected);
});
