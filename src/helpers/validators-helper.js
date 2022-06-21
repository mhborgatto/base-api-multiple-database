'use strict'

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function safeEmail(email){
  return email.trim()
}

export function checkCriteria(param, criteria) {
  return eval(criteria)
}

export async function checkSchema(input, schema) {
  const validator = new(require('jsonschema').Validator)
  const errors = (validator.validate(input, schema).errors || [])
  return sanitizeErrors(errors)
}

function sanitizeErrors(errors) {
  let sanitizedErrors = ''

  errors.map(e => {
    sanitizedErrors = sanitizedErrors == '' ? e.stack : `${ sanitizedErrors } | ${ e.stack }`
  })

  return sanitizedErrors
}