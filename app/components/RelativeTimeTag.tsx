import { isValid } from 'date-fns';
import getRelativeDate from '~/utils/getRelativeDate';

export default function RelativeTimeTag({ dateTime }: { dateTime: string }) {
  const date = new Date(dateTime);

  if (!isValid(date)) {
    return null;
  }

  return <time dateTime={dateTime}>Updated {getRelativeDate(date)}</time>;
}
