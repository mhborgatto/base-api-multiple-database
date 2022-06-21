'use strict'

import fileType from 'file-type'
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

async function formatFile(base64) {
  if (base64.substring(0, 4) === 'data')
    base64 = (base64.split(';base64,'))[1]

  let fileMime
  const base64Buffer = new Buffer.from(base64, 'base64')
  fileMime = await fileType.fromBuffer(base64Buffer)

  if (!fileMime) {
    fileMime = buildFileMime(base64)
    console.log({ manualMime: fileMime })
  }

  return {
    fileBuffer: base64Buffer,
    fileMime: fileMime,
  }
}

export async function uploadBufferFileToS3(fileName, base64) {
  const { fileBuffer, fileMime } = await formatFile(base64)

  const awsBody = {
    bucket: 'PandoraSales',
    fileBuffer,
    fileMime,
    fileName
  }

  const response = await aws.uploadBufferFileToS3(awsBody)
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

function buildFileMime(base64) {
  switch (base64.charAt(0)) {
  case FileTypes.PDF.char:
    return FileTypes.PDF.fullMime

  case FileTypes.XML.char:
    return FileTypes.XML.fullMime
  }
}