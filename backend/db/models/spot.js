'use strict';

const { Model, Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    static associate(models) {
      // Define associations here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId',
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true, // Ensure cascading deletes work properly
      });
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      });
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true,
      });
    }
  }

  Spot.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Spot',
      scopes: {
        byOwnerId(ownerId) {
          return {
            where: { ownerId },
          };
        },
        page(page, size = 20) {
          return {
            offset: (page - 1) * size,
            limit: size,
          };
        },
        minLat(minLat) {
          return {
            where: {
              lat: {
                [Op.gte]: minLat,
              },
            },
          };
        },
        maxLat(maxLat) {
          return {
            where: {
              lat: {
                [Op.lte]: maxLat,
              },
            },
          };
        },
        minLng(minLng) {
          return {
            where: {
              lng: {
                [Op.gte]: minLng,
              },
            },
          };
        },
        maxLng(maxLng) {
          return {
            where: {
              lng: {
                [Op.lte]: maxLng,
              },
            },
          };
        },
        minPrice(minPrice) {
          return {
            where: {
              price: {
                [Op.gte]: minPrice,
              },
            },
          };
        },
        maxPrice(maxPrice) {
          return {
            where: {
              price: {
                [Op.lte]: maxPrice,
              },
            },
          };
        },
      },
    }
  );

  return Spot;
};