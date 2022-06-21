require('dotenv').config()

module.exports = {
  databases: {
    database1: {
      database: 'database1',
      username: process.env.DATABASE1_USERNAME,
      password: process.env.DATABASE1_PASSWORD,
      host: process.env.DATABASE1_HOST,
      port: process.env.DATABASE1_PORT,
      dialect: 'mysql',
      timezone: '-03:00',
      migrationStorageTableName: 'SequelizeMeta',
      logging: false
    },
    database2: {
      database: 'database2',
      username: process.env.DATABASE2_USERNAME,
      password: process.env.DATABASE2_PASSWORD,
      host: process.env.DATABASE2_HOST,
      port: process.env.DATABASE2_PORT,
      dialect: 'mysql',
      timezone: '-03:00',
      migrationStorageTableName: 'SequelizeMeta',
      logging: false
    },
    database3: {
      database: 'database3',
      username: process.env.DATABASE3_USERNAME,
      password: process.env.DATABASE3_PASSWORD,
      host: process.env.DATABASE3_HOST,
      port: process.env.DATABASE3_PORT,
      dialect: 'mysql',
      timezone: '-03:00',
      migrationStorageTableName: 'SequelizeMeta',
      logging: false
    },
    database4: {
      database: 'database4',
      username: process.env.DATABASE4_USERNAME,
      password: process.env.DATABASE4_PASSWORD,
      host: process.env.DATABASE4_HOST,
      port: process.env.DATABASE4_PORT,
      dialect: 'mysql',
      timezone: '-03:00',
      migrationStorageTableName: 'SequelizeMeta',
      logging: false
    },
    database5: {
      database: 'database5',
      username: process.env.DATABASE5_USERNAME,
      password: process.env.DATABASE5_PASSWORD,
      host: process.env.DATABASE5_HOST,
      port: process.env.DATABASE5_PORT,
      dialect: 'mysql',
      timezone: '-03:00',
      migrationStorageTableName: 'SequelizeMeta',
      logging: false
    }
  },
  database1: {
    database: 'database1',
    username: process.env.DATABASE1_USERNAME,
    password: process.env.DATABASE1_PASSWORD,
    host: process.env.DATABASE1_HOST,
    port: process.env.DATABASE1_PORT,
    dialect: 'mysql',
    timezone: '-03:00',
    migrationStorageTableName: 'SequelizeMeta',
    logging: false
  },
  database2: {
    database: 'database2',
    username: process.env.DATABASE2_USERNAME,
    password: process.env.DATABASE2_PASSWORD,
    host: process.env.DATABASE2_HOST,
    port: process.env.DATABASE2_PORT,
    dialect: 'mysql',
    timezone: '-03:00',
    migrationStorageTableName: 'SequelizeMeta',
    logging: false
  },
  database3: {
    database: 'database3',
    username: process.env.DATABASE3_USERNAME,
    password: process.env.DATABASE3_PASSWORD,
    host: process.env.DATABASE3_HOST,
    port: process.env.DATABASE3_PORT,
    dialect: 'mysql',
    timezone: '-03:00',
    migrationStorageTableName: 'SequelizeMeta',
    logging: false
  },
  database4: {
    database: 'database4',
    username: process.env.DATABASE4_USERNAME,
    password: process.env.DATABASE4_PASSWORD,
    host: process.env.DATABASE4_HOST,
    port: process.env.DATABASE4_PORT,
    dialect: 'mysql',
    timezone: '-03:00',
    migrationStorageTableName: 'SequelizeMeta',
    logging: false
  },
  database5: {
    database: 'database5',
    username: process.env.DATABASE5_USERNAME,
    password: process.env.DATABASE5_PASSWORD,
    host: process.env.DATABASE5_HOST,
    port: process.env.DATABASE5_PORT,
    dialect: 'mysql',
    timezone: '-03:00',
    migrationStorageTableName: 'SequelizeMeta',
    logging: false
  }
}