#!/usr/bin/env node

import app from './app'
import http from 'http'

const port = process.env.APP_PORT

const dbHosts = {
  database1: `${ process.env.DATABASE1_HOST }. Port: ${ process.env.DATABASE1_PORT }`,
  database2: `${ process.env.DATABASE2_HOST }. Port: ${ process.env.DATABASE2_PORT }`,
  database3: `${ process.env.DATABASE3_HOST }. Port: ${ process.env.DATABASE3_PORT }`,
  database4: `${ process.env.DATABASE4_HOST }. Port: ${ process.env.DATABASE4_PORT }`,
  database5: `${ process.env.DATABASE5_HOST }. Port: ${ process.env.DATABASE5_PORT }`,
}

console.log(port)
app.set('port', port)

const server = http.createServer(app)

const listenner = server.listen(port)
listenner.on('error', onError)
listenner.on('listening', onListening)

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code) {
  case 'EACCES':
    console.error(bind + ' requires elevated privileges')
    process.exit(1)
    break
  case 'EADDRINUSE':
    console.error(bind + ' is already in use')
    process.exit(1)
    break
  default:
    throw error
  }
}

function onListening() {
  var addr = server.address()
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  console.log(`Listening on port ${ bind }`)
  console.log(dbHosts)
}

export default listenner