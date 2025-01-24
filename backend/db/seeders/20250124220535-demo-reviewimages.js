'use strict';
/** @type {import('sequelize-cli').Migration} */

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: 'https://picsum.photos/500?v=1',
        },
        {
          reviewId: 2,
          url: 'https://picsum.photos/500?v=2',
        },
        {
          reviewId: 3,
          url: 'https://picsum.photos/500?v=3',
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        reviewId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};