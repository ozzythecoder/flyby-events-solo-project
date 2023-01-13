import { DateTime } from "luxon";

function formatDate(ISOdate) {
  return DateTime.fromISO(ISOdate).toLocaleString(DateTime.DATE_FULL)
}

function formatTime(ISOtime) {
  const { second, ...timeFormat } = DateTime.TIME_WITH_SHORT_OFFSET

  return DateTime.fromISO(ISOtime).toLocaleString(timeFormat)
}

export { formatDate, formatTime }