'use strict'

import db from '../../models/index'

import { checkSchema } from '../../helpers/validators-helper'

import * as messageHelper from '../../helpers/message-helper'
import * as samplesHelper from './samples-helper'
import * as database1Repository from '../../repository/database1/database1-repository'
import * as database2Repository from '../../repository/database2/database2-repository'
import * as database3Repository from '../../repository/database3/database3-repository'
import * as database4Repository from '../../repository/database4/database4-repository'
import * as database5Repository from '../../repository/database5/database5-repository'

import * as samplesSchemas from '../../schemas/samples-schema'

export async function create(req) {
  const body = req.body
  const headers = req.headers

  const checkSchemaResult = await checkSchema(body, samplesSchemas.create)
  if (checkSchemaResult) {
    throw new samplesHelper.SamplesException(await messageHelper.errorHandler('invalid.schema', [{ key: ':schema', value: checkSchemaResult }], headers))
  }

  const sampleCreateRequest = new samplesHelper.SampleCreateRequest(body.description)

  const database1Transaction = await db.database1.transaction()
  const database2Transaction = await db.database2.transaction()
  const database3Transaction = await db.database3.transaction()
  const database4Transaction = await db.database4.transaction()
  const database5Transaction = await db.database5.transaction()

  let createdCompanyDatabase1, createdCompanyDatabase2, createdCompanyDatabase3, createdCompanyDatabase4, createdCompanyDatabase5

  try {
    createdCompanyDatabase1 = await database1Repository.create(sampleCreateRequest, database1Transaction)
    createdCompanyDatabase2 = await database2Repository.create(sampleCreateRequest, database2Transaction)
    createdCompanyDatabase3 = await database3Repository.create(sampleCreateRequest, database3Transaction)
    createdCompanyDatabase4 = await database4Repository.create(sampleCreateRequest, database4Transaction)
    createdCompanyDatabase5 = await database5Repository.create(sampleCreateRequest, database5Transaction)

    await database1Transaction.commit()
    await database2Transaction.commit()
    await database3Transaction.commit()
    await database4Transaction.commit()
    await database5Transaction.commit()
  } catch (error) {
    console.log({ error })
    await database1Transaction.rollback()
    await database2Transaction.rollback()
    await database3Transaction.rollback()
    await database4Transaction.rollback()
    await database5Transaction.rollback()
    throw error
  }

  return {
    company: {
      database1: {
        id: createdCompanyDatabase1.id
      },
      database2: {
        id: createdCompanyDatabase2.id
      },
      database3: {
        id: createdCompanyDatabase3.id
      },
      database4: {
        id: createdCompanyDatabase4.id
      },
      database5: {
        id: createdCompanyDatabase5.id
      }
    }
  }
}