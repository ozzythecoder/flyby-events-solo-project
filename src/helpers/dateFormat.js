import { DateTime } from "luxon";

function formatDate(ISOdate) {
  return DateTime.fromISO(ISOdate).toLocaleString(DateTime.DATE_FULL)
}

function formatDay(ISOdate) {
  return DateTime.fromISO(ISOdate).toLocaleString({ day: 'numeric' })  
}

function formatDateMD(ISOdate) {
  return DateTime.fromISO(ISOdate).toLocaleString({ month: 'short', day: 'numeric' })
}

function formatTime(ISOtime) {
  const { second, ...timeFormat } = DateTime.TIME_WITH_SHORT_OFFSET

  return DateTime.fromISO(ISOtime).toLocaleString(timeFormat)
}

export { formatDate, formatDay, formatTime, formatDateMD }