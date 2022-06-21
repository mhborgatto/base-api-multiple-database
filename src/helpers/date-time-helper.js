'use strict'

import moment from 'moment'

const DaysOfWeek = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado']

export function formatDateTimePtBr(date) {
  const validDate = new Date(date)
  return validDate > 0 ? moment(date).utcOffset('-0300').format('DD/MM/YYYY HH:mm:ss') : ''
}

export function formatDateTimeEnUsWithoutTime(date) {
  const validDate = new Date(date)
  return validDate > 0 ? moment(date).format('YYYY-MM-DD 00:00:00') : ''
}

export function formatDateTimeEnUs(date) {
  const validDate = new Date(date)
  return validDate > 0 ? moment(date).format('YYYY-MM-DD HH:mm:ss') : ''
}

export function dayOfWeekPtBr(date) {
  const validDate = new Date(date)
  return DaysOfWeek[validDate.getDay()]
}

export function formatTime(date) {
  const validDate = new Date(date)
  return validDate > 0 ? moment(date).format('HH:mm') : ''
}