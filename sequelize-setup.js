const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('', 'yourusername', 'yourpassword', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {

});


sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = {
  sequelize,
  User
};
