'use strict'

import models from '../../models'

export async function create(params, transaction) {
  return models
    .samples_database3
    .upsert(params, { transaction: transaction })
}