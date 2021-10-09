const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    theme: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '/css/style.css'
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: `Welcome to your new Remindr account! You are just a few clicks away from setting up your first Remindr. To get started, click on the 'New Remindr' button. Fill out the form and save your new Remindr by clicking "Create Remindr". And that's it! Your Remindr is all set up and you will receive a notification for your specified date and time. To remove this message, simply change your bio in the Edit Account settings. You will also find other customization options in the Account settings to make your profile unique to you!`
    },
    timeZone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true,
        len: [10]
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        // In this case, we are taking the user's email address, and making all letters lower case before adding it to the database.
        if (updatedUserData.changed('password')) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
    },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
