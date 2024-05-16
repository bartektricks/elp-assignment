import { differenceInMonths, format, formatDistanceToNow } from 'date-fns';

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
