'use strict'

import dotenv from 'dotenv'

dotenv.config()

import { generateHash } from '../../helpers/auth-helper'

import AWS from 'aws-sdk'

const sqs = awsConfigureSQS()
const s3 = awsConfigureS3()

function awsConfigureSQS() {
  AWS
    .config
    .update({
      secretAccessKey: process.env.AWS_SQS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.AWS_SQS_ACCESS_KEY_ID,
      region: process.env.AWS_REGION
    })

  return new AWS
    .SQS({
      apiVersion: process.env.AWS_SQS_API_VERSION
    })
}

export async function insertAwsSQS(sqsUrl, sqsRequest) {
  const params = {
    MessageAttributes: {},
    MessageBody: JSON.stringify(sqsRequest),
    QueueUrl: sqsUrl
  }

  const sqsMessage = await sqs
    .sendMessage(params)
    .promise()

  if (sqsMessage) {
    return true
  } else {
    return false
  }
}

function awsConfigureS3() {
  AWS
    .config
    .update({
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    })

  return new AWS
    .S3({
      apiVersion: process.env.AWS_S3_API_VERSION
    })
}

export async function uploadFileToS3(body) {
  const encryptedBucket = generateHashToS3(body.bucket)
  const bucketList = await listS3Buckets()

  if (!checkIfBucketExists(encryptedBucket, bucketList)) {
    await createBucket(encryptedBucket)
    await setUpBucketPolicy(encryptedBucket)
  }

  const uploadedFile = await uploadFile(encryptedBucket, body)
  return uploadedFile
}

async function uploadFile(bucket, body) {
  const { uploadParams, fileFullName } = generateUploadParams(bucket, body)

  await putObjectToS3(uploadParams)

  return { url: `https://${ bucket }.s3-${ process.env.AWS_REGION }.amazonaws.com/${ fileFullName }` }
}

function generateUploadParams(bucket, body) {
  const encryptedFileName = generateHashToS3(body.fileName)

  const fileFullName = `${ body.bucket }/${ encryptedFileName }.${ body.fileExt }`

  const uploadParams = {
    Bucket: bucket,
    Key: fileFullName,
    Body: body.fileContent
  }

  return {
    uploadParams,
    fileFullName
  }
}

function listS3Buckets() {
  return s3
    .listBuckets()
    .promise()
    .then(data => data.Buckets)
    .catch(err => err)
}

function checkIfBucketExists(cnpj, buckets) {
  return buckets.some(bucket => cnpj === bucket.Name)
}

function createBucket(cnpj) {
  const bucketParams = {
    Bucket: cnpj,
    ACL: 'public-read'
  }

  return s3
    .createBucket(bucketParams)
    .promise()
    .then(data => data.Location)
    .catch(err => err)
}

function setUpBucketPolicy(cnpj) {
  const bucketPolicyParams = generateBucketPolicyParams(cnpj)

  return s3
    .putBucketPolicy(bucketPolicyParams)
    .promise()
    .then(data => data)
    .catch(err => err)
}

function generateBucketPolicyParams(cnpj) {
  const allowPublicReadObject = {
    Version: '2008-10-17',
    Statement: [{
      Sid: 'PublicReadGetObject',
      Effect: 'Allow',
      Principal: '*',
      Action: 's3:GetObject',
      Resource: `arn:aws:s3:::${ cnpj }/*`
    }]
  }

  return {
    Bucket: cnpj,
    Policy: JSON.stringify(allowPublicReadObject),
  }
}

function putObjectToS3(uploadParams) {
  return s3
    .putObject(uploadParams)
    .promise()
}

function generateHashToS3(string) {
  const fullHash = generateHash(string)
  const slicedHash = fullHash.slice(0, 32)
  return slicedHash
}

export async function uploadBufferFileToS3(body) {
  const encryptedBucket = generateHashToS3(body.bucket)
  const bucketList = await listS3Buckets()

  if (!checkIfBucketExists(encryptedBucket, bucketList)) {
    await createBucket(encryptedBucket)
    await setUpBucketPolicy(encryptedBucket)
  }

  const uploadedFile = await uploadBufferFile(encryptedBucket, body)
  return uploadedFile
}

async function uploadBufferFile(bucket, body) {
  const { uploadParams, fileFullName } = await generateBufferFileUploadParams(bucket, body)

  await putObjectToS3(uploadParams)

  return { url: `https://${ bucket }.s3-${ process.env.AWS_REGION }.amazonaws.com/${ fileFullName }` }
}

function generateBufferFileUploadParams(bucket, body) {
  const encryptedFileName = generateHashToS3(`${ body.fileName }${ body.fileMime.ext }`)
  const fileFullName = `${ body.bucket }/${ encryptedFileName }.${ body.fileMime.ext }`

  const uploadParams = {
    Bucket: bucket,
    Key: fileFullName,
    Body: body.fileBuffer,
    ContentEncoding: 'base64',
    ContentType: body.fileMime.mime
  }

  return {
    uploadParams,
    fileFullName
  }
}