import { exportSwaggerApis } from '../helpers/swagger-helper'

const swaggerApis = exportSwaggerApis()

export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Backend Api - Node.js - Multiple Databases',
      description: 'Cloud Api em Node.js para multiplos bancos de dados MySQL',
      contact: {
        name: 'Umbrella Corp Ltda'
      },
      servers: ['localhost:3000']
    },
    securityDefinitions: {
      BearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'Bearer',
        in: 'header',
      },
    },
  },

  apis: swaggerApis
}