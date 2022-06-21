'use strict'

export async function withTransaction(block, db) {
  const transaction = await db.transaction()
  try {
    await block(transaction)
    await transaction.commit()
  } catch (error) {
    console.log({ error })
    await transaction.rollback()
    throw new TransactionException(error)
  }
}

export class TransactionException {
  constructor(error) {
    this.error = error
  }
}