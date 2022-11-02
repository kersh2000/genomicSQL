const { Sequelize } = require('sequelize');
const path = require('path');

const databaseName = 'my_books';

const db = new Sequelize({ //This is creating a new database
  dialect: 'sqlite', //Select dialect (MySQL, PostgreSQL)
  storage: path.join(__dirname, `${databaseName}.sqlite`), //'__dirname' is the current directory, and 'db.sqlite' will be the name of our SQL database/file. We use 'path' for this.
  logging: false //Stop logging the SQL commands to the console.
});

module.exports = db; //We export our database once we have connected to it.