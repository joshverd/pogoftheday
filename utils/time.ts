import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';

dayjs.extend(UTC);

export default {
  getTime,
  utc,
  getNumberOfMillisecondsUntilEndOfDay,
}

// Gets current UTC time formatted as an ISO String
function getTime(): string {
  return dayjs.utc().toISOString();
}

// Creates a UTC dayjs object using the dayjs UTC extended object
function utc(time?: string | number | Date, format?: string): dayjs.Dayjs {
  if(time) return dayjs.utc(time, format);

  return dayjs.utc();
}

// Gets the number of milliseconds until the end of the day
function getNumberOfMillisecondsUntilEndOfDay(): number {
  const now = utc();
  const endOfDay = utc().endOf('day');

  // Ms between now and the end of the day
  const diff = Math.abs(now.diff(endOfDay, 'millisecond'));

  return diff;
}