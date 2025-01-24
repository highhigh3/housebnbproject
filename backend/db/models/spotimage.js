'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpotImage extends Model {
    static associate(models) {
      // Define association
      SpotImage.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE', // Ensure cascade delete for SpotImage when Spot is deleted
        hooks: true, // Enables cascading functionality
      });
    }
  }

  SpotImage.init(
    {
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Spots',
          key: 'id',
        },
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true, // Ensure the URL is valid
        },
      },
      preview: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // Set a default value
      },
    },
    {
      sequelize,
      modelName: 'SpotImage',
      defaultScope: {
        attributes: {
          include: ['id', 'url', 'preview'],
          exclude: ['spotId', 'createdAt', 'updatedAt'],
        },
      },
      scopes: {
        bySpotId(spotId) {
          return {
            where: {
              spotId,
            },
          };
        },
      },
    }
  );

  return SpotImage;
};




// 'use strict';
// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class SpotImage extends Model {
//     static associate(models) {
//       // Associate SpotImage with Spot (foreign key: spotId)
//       SpotImage.belongsTo(models.Spot, { foreignKey: 'spotId', as: 'spot' });
//     }
//   }
//   SpotImage.init({
//     url: {
//       type: DataTypes.STRING,
//       allowNull: false, // Make URL required
//     },
//     preview: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false, // Make preview required
//     },
//     spotId: {
//       type: DataTypes.INTEGER,
//       allowNull: false, // Make spotId required
//       references: {
//         model: 'Spots',
//         key: 'id',
//       },
//     },
//   }, {
//     sequelize,
//     modelName: 'SpotImage',
//   });

//   return SpotImage;
// };
