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
    category: {
      type: DataTypes.STRING,
    },
    day: {
      type: DataTypes.INT,
      allowNull: false,
      validate: {
        len: [1],
        isNumeric: true,
      }
    },
    send_time: {
      type: DataTypes.STRING,
      allowNull: false,
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
