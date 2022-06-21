'use strict'

import { listDirFiles } from '../helpers/file-helper'

export function exportRoutes(app) {
  let arrayOfFiles = new Array()

  listDirFiles(__dirname, arrayOfFiles)

  const routesFiles = arrayOfFiles.filter(file => file.includes('routes.js'))

  routesFiles
    .forEach(file => {
      const router = require(file).default
      app.use(router)
    })
}