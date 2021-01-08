import dayjs from 'dayjs';
import dayjsLocalized from 'dayjs';
import UTC from 'dayjs/plugin/utc';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(UTC);
dayjsLocalized.extend(LocalizedFormat);

export default {
  utc,
  localized,
}

// Creates a UTC dayjs object using the dayjs UTC extended object
function utc(time?: string | number | Date, format?: string): dayjs.Dayjs {
  if(time) return dayjs.utc(time, format);

  return dayjs.utc();
}

// Creates a localized dayjs object using the dayjs localized extended object
function localized(time?: string | number | Date, format?: string): dayjs.Dayjs {
  if(time) return dayjsLocalized(time, format);

  return dayjsLocalized();
}
