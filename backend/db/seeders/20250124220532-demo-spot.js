'use strict';
/** @type {import('sequelize-cli').Migration} */

const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: '123 Rainbow Rd.',
          city: 'Sugar Land',
          state: 'Texas',
          country: 'United States',
          lat: 32.7767,
          lng: 96.797,
          name: 'Rainbow Roadside Lodge',
          description: `Rainbow Roadside Lodge is a cozy bungalow located on 7 acres of private property.
            Lorem ipsum odor amet, consectetuer adipiscing elit. Ultrices adipiscing sagittis maximus fames blandit vestibulum rhoncus. Justo odio ligula vitae natoque taciti, euismod vel donec! Fringilla vehicula amet sociosqu torquent velit nam felis odio donec. Potenti lacus sed iaculis dapibus non. Interdum taciti orci ridiculus primis efficitur per cras. Aptent curabitur et tempus mi eleifend. Sociosqu pharetra fermentum tristique class laoreet est.
            Mus quis nunc auctor; auctor tempor turpis. Iaculis et placerat interdum pulvinar fringilla. Ante massa sociosqu nisi curae pellentesque eros gravida suscipit. Dignissim pretium integer curabitur risus vulputate aptent diam? Dignissim curae inceptos orci cras id vitae faucibus. Leo feugiat suspendisse cursus in mauris aenean. Faucibus pellentesque venenatis fusce integer nec curabitur. Suspendisse efficitur sodales nibh in dolor odio ut? Elementum quisque aptent euismod mi posuere vehicula nostra tellus.`,
          price: 123.0,
        },
        {
          ownerId: 2,
          address: 'Test Address 1',
          city: 'Walnut',
          state: 'California',
          country: 'United States',
          lat: 77.777,
          lng: 99.999,
          name: 'Test Spot 1',
          description: `Lorem ipsum odor amet, consectetuer adipiscing elit. Faucibus consectetur phasellus amet sollicitudin id maximus nullam per dignissim. Tempus sollicitudin metus augue tellus eleifend. Nullam dictum convallis praesent vel et aliquet. Facilisi eu nullam est sodales, facilisis nec morbi. Sagittis netus pretium ultrices duis porttitor vulputate. Per ac non potenti class penatibus pharetra metus.
            Venenatis praesent metus morbi ultricies blandit hac magnis. Nostra eleifend vivamus cras eros senectus. Orci ex elementum eu quam faucibus; vulputate magnis condimentum. Ante bibendum posuere lobortis ex ac scelerisque sodales. Natoque molestie semper dis sodales varius nibh ut ut. Porta finibus molestie dapibus posuere condimentum fames. Fames aliquam ornare commodo hendrerit conubia facilisis taciti. Efficitur efficitur quis quisque ex elementum turpis. Aenean feugiat cursus mauris hac consequat.
            Netus et montes pretium, tempus parturient condimentum consectetur consectetur. Turpis laoreet bibendum mollis luctus parturient. Mauris inceptos dolor integer ex posuere; molestie hendrerit. Proin suscipit non consequat adipiscing, enim nisl. Condimentum turpis per rutrum adipiscing molestie. Lacinia rutrum velit primis, quis conubia etiam. Sagittis viverra facilisi nisi fermentum curabitur; curae efficitur. Suspendisse tellus nam dapibus a ultrices dictum ultricies orci. Blandit litora habitasse mollis in vulputate tortor. Nascetur vivamus curabitur ultricies commodo nibh placerat ac.`,
          price: 1.0,
        },
        {
          ownerId: 3,
          address: 'Test Address 2',
          city: 'Westminster',
          state: 'California',
          country: 'United States',
          lat: -77.777,
          lng: -99.999,
          name: 'Test Spot 2',
          description: `Lorem ipsum odor amet, consectetuer adipiscing elit. Faucibus consectetur phasellus amet sollicitudin id maximus nullam per dignissim. Tempus sollicitudin metus augue tellus eleifend. Nullam dictum convallis praesent vel et aliquet. Facilisi eu nullam est sodales, facilisis nec morbi. Sagittis netus pretium ultrices duis porttitor vulputate. Per ac non potenti class penatibus pharetra metus.
            Venenatis praesent metus morbi ultricies blandit hac magnis. Nostra eleifend vivamus cras eros senectus. Orci ex elementum eu quam faucibus; vulputate magnis condimentum. Ante bibendum posuere lobortis ex ac scelerisque sodales. Natoque molestie semper dis sodales varius nibh ut ut. Porta finibus molestie dapibus posuere condimentum fames. Fames aliquam ornare commodo hendrerit conubia facilisis taciti. Efficitur efficitur quis quisque ex elementum turpis. Aenean feugiat cursus mauris hac consequat.
            Netus et montes pretium, tempus parturient condimentum consectetur consectetur. Turpis laoreet bibendum mollis luctus parturient. Mauris inceptos dolor integer ex posuere; molestie hendrerit. Proin suscipit non consequat adipiscing, enim nisl. Condimentum turpis per rutrum adipiscing molestie. Lacinia rutrum velit primis, quis conubia etiam. Sagittis viverra facilisi nisi fermentum curabitur; curae efficitur. Suspendisse tellus nam dapibus a ultrices dictum ultricies orci. Blandit litora habitasse mollis in vulputate tortor. Nascetur vivamus curabitur ultricies commodo nibh placerat ac.`,
          price: 10000.0,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: ['Rainbow Roadside Lodge', 'Test Spot 1', 'Test Spot 2'],
        },
      },
      {}
    );
  },
};