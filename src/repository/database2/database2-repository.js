'use strict'

import models from '../../models'

export async function create(params, transaction) {
  return models
    .samples_database2
    .upsert(params, { transaction: transaction })
}