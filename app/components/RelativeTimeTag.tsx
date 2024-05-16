import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function RelativeTimeTag({ dateTime }: { dateTime: string }) {
  return <time dateTime={dateTime}>Updated {dayjs(dateTime).fromNow()}</time>;
}
