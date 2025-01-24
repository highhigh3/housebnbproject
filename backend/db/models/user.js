'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Spot, {
        foreignKey: 'ownerId',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Booking, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Review, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        validate: {
          len: [60, 60],
        },
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: [
            'email',
            'hashedPassword',
            'firstName',
            'lastName',
            'createdAt',
            'updatedAt',
          ],
        },
      },
    }
  );
  return User;
};




// 'use strict';

// const { Model, Validator } = require('sequelize');

// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     static associate(models) {
//       // define association here
//     }
//   }

//   User.init(
//     {
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: false,
//         validate: {
//           len: [3, 30]
//         },
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: false,
//         validate: {
//           len: [3, 30]
//         },
//       },
//       username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           len: [4, 30],
//           isNotEmail(value) {
//             if (Validator.isEmail(value)) {
//               throw new Error('Cannot be an email.');
//             }
//           },
//         },
//       },
//       email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//           len: [3, 256],
//           isEmail: true,
//         },
//       },
//       hashedPassword: {
//         type: DataTypes.STRING.BINARY,
//         allowNull: false,
//         validate: {
//           len: [60, 60],
//         },
//       },
//     },
//     {
//       sequelize,
//       modelName: 'User',
//       tableName: 'Users',
//       defaultScope: {
//         attributes: {
//           exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
//         },
//       },
//     }
//   );
//   return User;
// };