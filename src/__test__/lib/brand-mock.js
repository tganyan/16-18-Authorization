'use strict';

const faker = require('faker');
const Brand = require('../../model/brand');

const brandMock = module.exports = {};

brandMock.pCreateBrandMock = () => {
  return new Brand({
    name: faker.lorem.words(3),
  }).save();
};

brandMock.pCleanBrandMocks = () => {
  return Brand.remove();
};
