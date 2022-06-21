import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'

import * as routesExport from './routes/routes-export'

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from './configs/swagger'

import cors from 'cors'

dotenv.config()

var app = express()

app.use(cors())

app.use(logger('dev'))

app.use(
  express.json({
    limit: '20mb'
  })
)

app.use(
  express.urlencoded({
    limit: '20mb',
    parameterLimit: 100000,
    extended: true
  })
)

app.use(cookieParser())

routesExport.exportRoutes(app)

app.use('/base-api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerOptions)))

export default app