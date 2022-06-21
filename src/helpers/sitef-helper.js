'use strict'

import { valueOrDefault } from '../helpers/string-helper'
import { fillChar } from './string-helper'

const TOTALDIGITSNSU = 20

const SitefLibrary = Object.freeze({
  MSITEF: 'msitef',
  CLISITEF: 'clisitef'
})

export function sitefLibrary(library) {
  library = valueOrDefault(library, '').toLowerCase()

  switch (library) {
  case SitefLibrary.MSITEF:
    return SitefLibrary.MSITEF

  case SitefLibrary.CLISITEF:
    return SitefLibrary.CLISITEF
  }
}

export function buildBrandNsu(nsu) {
  const convertedNsu = parseFloat(nsu).toString()
  const brandNsu =  fillChar(convertedNsu, TOTALDIGITSNSU, '0')
  return brandNsu
}