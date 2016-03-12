require('babel-core/register')({
  presets: ['es2015-node5', 'stage-3'],
});
require('babel-polyfill');

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config').database;
const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const modeldir = `${__dirname}/../models`;
const basename = 'index.js';


fs.readdirSync(modeldir)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(modeldir, file));
    db[model.name] = model;
    db[model.name].sync({ force: true }).then((table) => {
      console.log(table);
    });
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
