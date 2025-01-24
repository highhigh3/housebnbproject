'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
      });
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId',
      });
    }
  }
  Booking.init(
    {
      spotId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      startDate: DataTypes.DATEONLY,
      endDate: DataTypes.DATEONLY,
    },
    {
      sequelize,
      modelName: 'Booking',
      scopes: {
        byUserId(userId) {
          return {
            where: {
              userId: userId,
            },
          };
        },
        bySpotId(spotId) {
          return {
            where: {
              spotId: spotId,
            },
          };
        },
      },
    }
  );
  return Booking;
};