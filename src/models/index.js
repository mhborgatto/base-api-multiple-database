'use strict'

import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import * as config from '../configs/sequelize'

const basename = path.basename(__filename)
const db = {}

const databases = Object.keys(config.databases);

for (let i = 0; i < databases.length; ++i) {
  let database = databases[i];
  let dbPath = config.databases[database];
  db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath);
}

fs
  .readdirSync(__dirname + '/database1')
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = require(path.join(__dirname + '/database1', file))(db.database1, Sequelize.DataTypes);
    db[model.name] = model;
  });

fs
  .readdirSync(__dirname + '/database2')
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = require(path.join(__dirname + '/database2', file))(db.database2, Sequelize.DataTypes);
    db[model.name] = model;
  });

fs
  .readdirSync(__dirname + '/database3')
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = require(path.join(__dirname + '/database3', file))(db.database3, Sequelize.DataTypes);
    db[model.name] = model;
  });

fs
  .readdirSync(__dirname + '/database4')
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = require(path.join(__dirname + '/database4', file))(db.database4, Sequelize.DataTypes);
    db[model.name] = model;
  });

fs
  .readdirSync(__dirname + '/database5')
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = require(path.join(__dirname + '/database5', file))(db.database5, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize

export default db