export { parseTime, formatTime, formatDate, rateFormat, parseDate, parseDateFormatRecommend, parseDateFormatNews } from '@/utils'

export function parsePrecision(value, precision = 12) {
  return +parseFloat((value * 100).toPrecision(precision))
}
