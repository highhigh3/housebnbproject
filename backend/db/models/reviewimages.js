'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    static associate(models) {
      // define association here
      ReviewImage.belongsTo(models.Review, {
        foreignKey: 'reviewId',
      });
    }
  }
  ReviewImage.init(
    {
      reviewId: DataTypes.INTEGER,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ReviewImage',
      defaultScope: {
        attributes: {
          include: ['id', 'url'],
          exclude: ['reviewId', 'createdAt', 'updatedAt'],
        },
      },
    }
  );
  return ReviewImage;
};
