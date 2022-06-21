require('dotenv').config()

import app from '../../src/app'
import request from 'supertest'

import * as samples from '../fixtures/samples'

const staticToken = process.env.STATIC_TOKEN

describe('Company Api', () => {
  describe('When Token is invalid', () => {
    it('Should receive unauthorized response because the token was not provided', async (done) => {
      const response = await request(app)
        .post('/base-api/samples')
        .send(samples.validSample)

      expect(response.statusCode).toBe(401)
      done()
    })

    it('Should receive forbidden response because the token provided was incorrect', async (done) => {
      const response = await request(app)
        .post('/base-api/samples')
        .send(samples.validSample)
        .set('authorization', `Bearer static:Incorrect${ staticToken }`)

      expect(response.statusCode).toBe(403)
      done()
    })
  })

  describe('When JSON schema is invalid', () => {
    it('Should receive bad request because the provided schema is invalid', async (done) => {
      const response = await request(app)
        .post('/base-api/samples')
        .send(samples.invalidSample)
        .set('authorization', `Bearer static:${ staticToken }`)

      expect(response.statusCode).toBe(400)
      done()
    })
  })

  describe('Sample round-trip', () => {
    it('Should create the sample', async (done) => {
      const response = await request(app)
        .post('/base-api/samples')
        .send(samples.validSample)
        .set('authorization', `Bearer static:${ staticToken }`)

      expect(response.statusCode).toBe(200)
      done()
    })
  })
})