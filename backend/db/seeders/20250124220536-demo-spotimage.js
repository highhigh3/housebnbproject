'use strict';
/** @type {import('sequelize-cli').Migration} */

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: 'https://picsum.photos/500?v=10',
          preview: true,
        },
        {
          spotId: 1,
          url: 'https://picsum.photos/500?v=11',
          preview: false,
        },
        {
          spotId: 1,
          url: 'https://picsum.photos/500?v=12',
          preview: false,
        },
        {
          spotId: 1,
          url: 'https://picsum.photos/500?v=13',
          preview: false,
        },
        {
          spotId: 1,
          url: 'https://picsum.photos/500?v=14',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://picsum.photos/500?v=20',
          preview: true,
        },
        {
          spotId: 2,
          url: 'https://picsum.photos/500?v=21',
          preview: false,
        },
        {
          spotId: 2,
          url: 'https://picsum.photos/500?v=22',
          preview: false,
        },
        {
          spotId: 3,
          url: 'https://picsum.photos/500?v=30',
          preview: true,
        },
        {
          spotId: 3,
          url: 'https://picsum.photos/500?v=31',
          preview: false,
        },
        {
          spotId: 3,
          url: 'https://picsum.photos/500?v=32',
          preview: false,
        },
        {
          spotId: 3,
          url: 'https://picsum.photos/500?v=33',
          preview: false,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: {
          [Op.in]: [1, 2, 3],
        },
      },
      {}
    );
  },
};