'use strict'

require('dotenv').config()

const NodeCache = require('node-cache')

const cache = new NodeCache({
  stdTTL: 60,
  checkperiod: 300
})

export async function setCache(key, obj, ttl) {
  ttl = parseInt(ttl)
  return cache.mset([
    { key: key, val: obj, ttl },
  ])
}

export async function getCache(key) {
  return await cache.get(key)
}