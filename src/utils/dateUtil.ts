import { format } from 'date-fns'

const DATE_TIME_FORMAT = 'yyyy-MM-dd HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD '

export function formatToDateTime(date: number | Date, formatStr = DATE_TIME_FORMAT): string {
  return format(date, formatStr)
}

export function formatToDate(date: number | Date, formatStr = DATE_FORMAT): string {
  return format(date, formatStr)
}

// 格式化日期, 如果包含00:00:00则去掉
export function handlerDate(date: string | undefined) {
  if (!date) {
    return '--'
  }
  if (date.includes('00:00:00')) {
    date = date.substring(0, date.indexOf('00:00:00'))
  }

  if (date.length > 10) {
    date = date.substring(0, 10)
  }

  return date.trim()
}
