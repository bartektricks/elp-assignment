import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function RelativeTimeTag({ dateTime }: { dateTime: string }) {
  const date = dayjs(dateTime);

  if (!date.isValid()) {
    return null;
  }

  return <time dateTime={dateTime}>Updated {date.fromNow()}</time>;
}
