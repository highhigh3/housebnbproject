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



// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class ReviewImages extends Model {
//     static associate(models) {
//       // Define association here
//       ReviewImages.belongsTo(models.Review, {
//         foreignKey: 'reviewId',
//         as: 'Review', // Alias for association
//         onDelete: 'CASCADE', // Ensure cascading delete
//       });
//     }
//   }

//   ReviewImages.init(
//     {
//       reviewId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       url: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isUrl: true, // Validate the value is a URL
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: 'ReviewImages',
//     }
//   );

//   return ReviewImages;
// };
