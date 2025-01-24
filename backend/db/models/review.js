'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Define associations
      Review.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
      });
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        hooks: true, // Ensure cascading deletes work properly
      });
    }
  }

  Review.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      spotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Spots',
          key: 'id',
        },
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      stars: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
    },
    {
      sequelize,
      modelName: 'Review',
      scopes: {
        byUserId(userId) {
          return {
            where: {
              userId,
            },
          };
        },
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
  return Review;
};



// 'use strict';

// const { Model } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class Review extends Model {
//     static associate(models) {
//       // define association here
//       Review.belongsTo(models.User, {
//         foreignKey: 'userId',
//       });
//       Review.belongsTo(models.Spot, {
//         foreignKey: 'spotId',
//       });
//       Review.hasMany(models.ReviewImage, {
//         foreignKey: 'reviewId',
//         onDelete: 'CASCADE',
//       });
//     }
//   }
//   Review.init(
//     {
//       userId: DataTypes.INTEGER,
//       spotId: DataTypes.INTEGER,
//       review: DataTypes.TEXT,
//       stars: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: 'Review',
//       scopes: {
//         byUserId(userId) {
//           return {
//             where: {
//               userId: userId,
//             },
//           };
//         },
//         bySpotId(spotId) {
//           return {
//             where: {
//               spotId: spotId,
//             },
//           };
//         },
//       },
//     }
//   );
//   return Review;
// };



// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Review extends Model {

//     static associate(models) {
//       // define association here


//       Review.belongsTo(models.Spot, {
//         foreignKey: 'spotId',
//         as: 'spot', // Alias for association
//       });

//        // Review belongs to User
//       Review.belongsTo(models.User, {
//       foreignKey: 'userId',
//       as: 'user', // Alias for association
//       });
//       Review.hasMany(models.ReviewImages, {
//         foreignKey: 'reviewId',
//         as: 'ReviewImages',
//       });



//     }
//   }
//   Review.init({
//     userId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: false
//     },
//     spotId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: false
//     },
//     review: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: false,
//       validate: {
//         min: 10
//       }
//     },
//     stars: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: false,
//       validate: {
//         min: 1,
//         max: 5
//       },
//     },
//     imageUrl: {  // The column for the image URL
//       type: DataTypes.STRING,
//       allowNull: true,  // This is optional (not required to add an image)
//     },
//   }, {
//     sequelize,
//     modelName: 'Review',
//   });
//   return Review;
// };
