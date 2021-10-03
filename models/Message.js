const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Message extends Model {}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    event_name: {
      type: DataTypes.STRING,
      validate: {
        len: [1,250],
      },
    },
    content: {
      type: DataTypes.TEXT,
    },
    description: {
      type: DataTypes.STRING,
    },
    send_date: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // must be in a YYYY-MM-DD Format
        isDate: true,
      }
    },
    send_time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        // Must be in a HH:DD Format
        is: /^(0?[1-9]|1[0-2]):[0-5][0-9]$/,
      }
    },
    am_pm: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        // Can only be AM or PM
        is: /^[APap][mM]$/,
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'message',
  }
);

module.exports = Message;
