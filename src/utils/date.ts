import dayjs from 'dayjs';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';
import AdvancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(CustomParseFormat);
dayjs.extend(AdvancedFormat);
dayjs.extend(relativeTime);

export type DateType = Date | string | number;

export function getTodayDate() {
  return dayjs();
}

export function parseDate(date: DateType, format: string) {
  return dayjs(date, format).toDate();
}

export function formatDate(date: DateType, format: string) {
  return dayjs(date).format(format);
}

export function getDateRelativeToCurrentYear(date: DateType) {
  const date_ = dayjs(date);

  if (dayjs().isSame(date_, 'year')) {
    return date_.format('MMMM DD');
  }

  return date_.format('MMMM DD, YYYY');
}

export function toFormattedDate(date: DateType) {
  const date_ = dayjs(date);

  return date_.format('MMMM DD, YYYY');
}

export function timeAgo(date: DateType) {
  return dayjs(date).fromNow();
}
