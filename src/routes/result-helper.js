'use strict'

export function badRequest(res, message) {
  return res.status(400).json(message)
}

export function created(res, record) {
  return res.status(201).json(record)
}

export function emptyOk(res) {
  return res.status(200).send()
}

export function ok(res, data) {
  return res.status(200).json(data)
}

export function alreadyExists(res) {
  return res.status(208).send()
}

export function unauthorized(res, message) {
  return res.status(401).json(message)
}

export function forbidden(res, message) {
  return res.status(403).json(message)
}

export function notFound(res, message) {
  return res.status(404).json(message)
}

export function conflict(res, message) {
  return res.status(409).json(message)
}

export function preconditionFailed(res, message) {
  return res.status(412).json(message)
}

export function internalServerError(res, message) {
  return res.status(500).json(message)
}