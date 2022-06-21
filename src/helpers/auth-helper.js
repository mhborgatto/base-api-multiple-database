'use strict'

require('dotenv').config()

import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const Tokens = Object.freeze({
  PASSWORD: '171f8d889147b73fde979135eb4cc04ee4a4611ca06669e436f30ff5a6e14aa0',
  STRING: 'df151cc4a61a46663b6e2a3cabf6cf58'
})

export function encryptPassword(password) {
  const encryptedPassword = crypto
    .createHmac('sha256', Tokens.PASSWORD)
    .update(password)
    .digest('hex')
  return encryptedPassword
}

export function generateToken(params) {
  return jwt
    .sign(params, Tokens.PASSWORD, {
      expiresIn: process.env.USER_TOKEN_TTL
    })
}

export function validateToken(token) {
  try {
    return jwt.verify(token, Tokens.PASSWORD)
  } catch (err) {
    throw new Error(err)
  }
}

export function randomToken() {
  return crypto.randomBytes(10).toString('hex').slice(0, 10)
}

export function encryptString(text) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(Tokens.STRING), iv)
  const encrypted = cipher.update(text)
  const buffer = Buffer.concat([encrypted, cipher.final()])
  return iv.toString('hex') + ':' + buffer.toString('hex')
}

export function decryptString(text) {
  const textParts = text.split(':')
  const iv = Buffer.from(textParts.shift(), 'hex')
  const encryptedText = Buffer.from(textParts.join(':'), 'hex')
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(Tokens.STRING), iv)
  const buffer = decipher.update(encryptedText)
  const decrypted = Buffer.concat([buffer, decipher.final()])
  return decrypted.toString()
}

export function generateHash(string) {
  const encryptedString = crypto
    .createHmac('sha256', Tokens.STRING)
    .update(string)
    .digest('hex')
  return encryptedString
} 