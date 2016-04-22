import Sequelize from 'sequelize';
import config from './config/sequelize.json';
import fs from 'fs';
import path from 'path';

const client = new Sequelize(config.database, config.username, config.password, config.option);

const models = {};

fs
  .readdirSync(__dirname + '/models')
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    console.log(file)
    var model = client.import(path.join(__dirname + '/models', file));
    models[model.name] = model;
  });

console.log(models);

export default models;
export { client };