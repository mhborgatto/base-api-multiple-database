'use strict'

import fs from 'fs'

export async function errorHandler(key, params, headers) {
  const path = checkPath(headers)

  const messages = JSON.parse(fs.readFileSync(path))

  const message = messages[key]
  if (message) {
    return buildMessage(message, params)
  }

  return 'Uncataloged error'
}

async function buildMessage(message, params) {
  const builtMessage = await replaceMessageParams(message, params)
  return builtMessage
}

async function replaceMessageParams(message, params) {
  await Promise.all(params.map(param => {
    const key = param.key
    const value = param.value
    message = message.replace(key, value)
  }))
  return message
}

function checkPath(headers) {
  const language = headers['x-lang'] ? headers['x-lang'] : 'pt-br'
  const path = `src/translations/${ language }.json`

  try {
    if (fs.existsSync(path)) {
      return path
    }
    return 'src/translations/pt-br.json'
  } catch (err) {
    return 'src/translations/pt-br.json'
  }
}