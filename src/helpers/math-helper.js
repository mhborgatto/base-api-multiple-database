'use strict'

const MAX_DECIMAL_PLACES = 15

export function calculateRoundAbnt(qty, value, decimalPlaces) {
  const totalValue = parseFloat(qty * value).toFixed(MAX_DECIMAL_PLACES)
  const calculatedValue = roundAbnt(totalValue, decimalPlaces)
  return parseFloat(calculatedValue)
}

function roundAbnt(value, decimalPlaces) {
  let calculatedValue = parseFloat(value)
  const splitedValue = calculatedValue.toString().split('.')
  const decimalValue = splitedValue[1] ? splitedValue[1] : ''
  const subsequentNumber = decimalPlaces

  if (decimalPlaces < 1) {
    return parseInt(calculatedValue)
  }

  if (decimalValue.length <= decimalPlaces) {
    return parseFloat(calculatedValue)
  }

  const substr = decimalValue.substring(subsequentNumber, subsequentNumber + 1)
  if (substr != '5') {
    return calculatedValue.toFixed(2)
  }

  const substr1 = decimalValue.substring(subsequentNumber, subsequentNumber + 1)
  if (substr1 == '5') {
    const substr2 = decimalValue.substring(subsequentNumber, subsequentNumber - 1)
    if ((substr2 % 2) != 0) {
      return round(calculatedValue, 2)
    }

    const substr3 = decimalValue.substring(subsequentNumber + 2, subsequentNumber + 3)
    if (substr3 > 0) {
      return calculatedValue.toFixed(2)
    }

    return truncate(value, decimalPlaces)
  }
}

function truncate(value, decimalsQty) {
  var calculatedValue = value
  const splitedValue = value.toString().split('.')
  const decimalPlaces = splitedValue[1]

  if (decimalsQty < 1) {
    return parseInt(calculatedValue)
  }

  if (decimalPlaces.length <= decimalsQty) {
    return calculatedValue
  }

  calculatedValue = parseInt(value.toString()) + '.' + decimalPlaces.substr(0, decimalsQty)
  calculatedValue = parseFloat(calculatedValue)

  return calculatedValue
}

function round(value, decimalsQty) {
  if (!('' + value).includes('e')) {
    return +(Math.round(value + 'e+' + decimalsQty) + 'e-' + decimalsQty)
  } else {
    const splitedValue = ('' + value).split('e')
    let signal = ''

    if (+splitedValue[1] + decimalsQty > 0) {
      signal = '+'
    }

    return +(Math.round(+splitedValue[0] + 'e' + signal + (+splitedValue[1] + decimalsQty)) + 'e-' + decimalsQty)
  }
}