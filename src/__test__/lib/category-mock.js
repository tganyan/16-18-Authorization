'use strict';

const faker = require('faker');
const Category = require('../../model/category');

const categoryMock = module.exports = {};

categoryMock.pCreateCategoryMock = () => {
  return new Category({
    title: faker.lorem.words(3),
    content: faker.lorem.words(10),
  }).save();
};

categoryMock.pCleanCategoryMocks = () => {
  return Category.remove();
};
