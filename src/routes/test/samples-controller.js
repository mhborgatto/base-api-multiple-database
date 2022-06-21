'use strict'

import { ok, notFound, internalServerError, badRequest, unauthorized } from '../../routes/result-helper'
import * as samplesService from '../../services/samples/samples-service'
import * as samplesHelper from '../../services/samples/samples-helper'

export async function create(req, res) {
  try {
    const created = await samplesService.create(req)

    return ok(res, created)
  } catch (error) {
    console.log(`Error creating samples. Error: ${ JSON.stringify(error.message) }`)
    return errorHandler(error, res)
  }
}

function errorHandler(error, res) {
  if (error instanceof samplesHelper.SamplesException) {
    return badRequest(res, error)
  }

  if (error instanceof samplesHelper.SamplesNotFoundException) {
    return notFound(res, error)
  }

  if (error instanceof samplesHelper.SamplesUnAuthorizedException) {
    return unauthorized(res, error)
  }

  return internalServerError(res, error)
}