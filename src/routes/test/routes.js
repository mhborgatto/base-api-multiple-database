'use strict'

import express from 'express'

import { verifyToken } from '../../services/authorization-service'
import * as samplesController from './samples-controller'

const testRouter = express.Router()

/**
 * @swagger
 * /base-api/samples:
 *   post:
 *     summary: The endpoint used to create test
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: body
 *         name: promotions
 *         description: The company promotions object
 *         schema:
 *           type: object
 *           $ref: '#/definitions/SampleRequest'
 *     responses:
 *        '200':
 *          description: Sucessful
 *          schema:
 *            type: object
 *            $ref: '#/definitions/SampleResponse'
 *        '208':
 *          description: Already exists
 *        '400':
 *          description: Bad request
 *        '401':
 *          description: Unauthorized request
 *        '404':
 *          description: Not found
 *        '500':
 *          description: Something went wrong
 */
testRouter.post('/base-api/samples', verifyToken, samplesController.create)

/**
 * @swagger
 * definitions:
 *   SampleRequest:
 *     properties:
 *       description:
 *         type: string
 *         example: "Descrição de testes"
 *   SampleResponse:
 *     properties:
 *       id:
 *         type: integer
 *         example: 1
 */

export default testRouter