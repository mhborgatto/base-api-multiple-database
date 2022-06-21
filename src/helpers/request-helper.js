'use strict'

export function buildError(error) {
  if (error.response) {

    if (error.response.status === 404) {
      return `${ error.response.status } - ${ error.response.statusText }`
    }

    if (error.response.data.message){
      return error.response.data.message
    }

    if (error.response.data.parent){
      return JSON.stringify(error.response.data.parent)
    }

    return JSON.stringify(error.response)
  }

  return error.message
}