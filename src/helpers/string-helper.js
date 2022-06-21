'use strict'

import md5 from 'md5'
import moment from 'moment'

export function onlyNumbers(document) {
  return document.replace(/([^\d])+/gim, '')
}

export function valueOrDefault(field, defaultValue) {
  return field ? field : defaultValue
}

export function generateHashMd5(string) {
  return md5(string)
}

export function capitalize(string) {
  if (string) {
    return `${ string[0].toUpperCase() }${ string.substr(1).toLowerCase() }`
  }
  return string
}

export function valueLessThanDefault(field, defaultValue) {
  return field < defaultValue ? defaultValue : field
}

export function formatFloat(value, decimalPlaces) {
  return parseFloat(valueOrDefault(value, 0).toFixed(decimalPlaces ? decimalPlaces : 2))
}

export function generateKey() {
  return moment(new Date()).format('YYYYMMDDHHmmssSSS')
}

export function fillChar(string, totalDigits, char) {
  const filledString = `${ string.padStart(totalDigits, char) }`
  return filledString
}

export function formatFloatWithDecimalPlaces(value, decimalPlaces) {
  return valueOrDefault(value, 0).toFixed(decimalPlaces ? decimalPlaces : 2)
}