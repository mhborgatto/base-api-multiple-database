'use strict'

import { listDirFiles } from '../helpers/file-helper'

export function exportSwaggerApis() {
  let apis = new Array()
  let arrayOfFiles = new Array()

  listDirFiles('./', arrayOfFiles)

  const routesFiles = arrayOfFiles.filter(file => file.includes('routes.js'))

  routesFiles
    .forEach(file => {
      const posRoutes = file.indexOf('/routes/')
      const path = file.substring(posRoutes, file.length)
      apis.push(`./dist${ path }`)
      apis.push(`./src${ path }`)
    })

  return apis
}