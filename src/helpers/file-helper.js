'use strict'

import fs from 'fs'
import path from 'path'

import * as aws from '../services/aws/aws-service'

export function getFileExtension(fileName) {
  return fileName.split('.').pop()
}

export async function writeFileSync(path, fileName, content) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }

  fs.writeFileSync(`${ path }/${ fileName }`, content)
}

export async function uploadFileToS3(fileName) {
  const fileExt = getFileExtension(fileName)
  const fileContent = fs.readFileSync(fileName)

  const awsBody = {
    bucket: 'PandoraSales',
    fileName,
    fileContent,
    fileExt
  }

  const response = await aws.uploadFileToS3(awsBody)

  fs.unlinkSync(fileName)

  return response
}

export function listDirFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = listDirFiles(dirPath + '/' + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file))
    }
  })

  return arrayOfFiles
}