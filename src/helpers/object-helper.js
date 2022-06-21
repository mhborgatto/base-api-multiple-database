'use strict'

export function nonEmpty(object) {
  return object && object.length != 0
}

export function isEmpty(object) {
  return Object.entries(object).length == 0
}