'use strict';

const faker = require('faker');
const brandMock = require('./brand-mock');
const Guitar = require('../../model/guitar');

const guitarMock = module.exports = {};

guitarMock.pCreateGuitarMock = () => {
  const resultMock = {};

  return brandMock.pCreateBrandMock()
    .then((createdBrandMock) => {
      resultMock.brand = createdBrandMock;

      return new Guitar({
        type: faker.lorem.words(3),
        brand: createdBrandMock._id,
        style: faker.lorem.words(1),
      }).save();
    })
    .then((createdGuitarMock) => {
      resultMock.guitar = createdGuitarMock;
      return resultMock;
    });
};

guitarMock.pCleanGuitarMocks = () => {
  return Promise.all([
    Guitar.remove({}),
    brandMock.pCleanBrandMocks(),
  ]);
};
