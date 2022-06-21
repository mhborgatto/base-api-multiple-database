'use strict'

import * as messageHelper from '../helpers/message-helper'
import * as results from '../routes/result-helper.js'
import * as dotenv from 'dotenv'
import { validateToken } from '../helpers/auth-helper'

dotenv.config()

export async function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return results.unauthorized(res, await buildMessage('missing.authorization', req.headers))
  }

  if (req.headers.authorization.indexOf('Basic ') != -1) {
    const base64Credentials = req.headers.authorization.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
    const [username, password] = credentials.split(':')
    if (username === process.env.APP_USERNAME && password === process.env.APP_PASSWORD) {
      next()
    } else {
      return results.forbidden(res, await buildMessage('incorrect.authentication', req.headers))
    }
  } else {
    let token = req.headers['authorization']

    if (token.startsWith('Bearer static:')) {
      token = token.slice(14, token.length)

      if (token != process.env.STATIC_TOKEN) {
        return results.forbidden(res, await buildMessage('incorrect.static.token', req.headers))
      } else {
        next()
      }
    } else {

      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length)
      } else {
        return results.forbidden(res, await buildMessage('incorrect.token', req.headers))
      }

      try {
        const validToken = validateToken(token)
        req.autenticatedUserId = validToken.userId
        next()
      } catch (err) {
        return results.forbidden(res, await buildMessage('unauthorized', req.headers))
      }
    }
  }
}

async function buildMessage(command, headers) {
  const message = await messageHelper.errorHandler(command, [], headers)
  return { message }
}