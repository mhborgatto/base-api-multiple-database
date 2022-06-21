'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class samples_database3 extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  samples_database3.init({
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'samples_database3',
    tableName: 'Samples',
    freezeTableName: true,
    timestamps: true
  });
  return samples_database3;
};