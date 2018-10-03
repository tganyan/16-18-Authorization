'use strict';

const mongoose = require('mongoose');
const HttpError = require('http-errors');
const Category = require('./category');

const blogPostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  content: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'category',
  },
});

function blogPostPreHook(done) {
  return Category.findById(this.category)
    .then((categoryFound) => {
      if (!categoryFound) {
        throw new HttpError(404, 'category not found');
      }
      categoryFound.blogPosts.push(this._id);
      return categoryFound.save();
    })
    .then(() => done())
    .catch(error => done(error));
}

const blogPostPostHook = (document, done) => {
  return Category.findById(document.category)
    .then((categoryFound) => {
      if (!categoryFound) {
        throw new HttpError(500, 'category not found');
      }
      categoryFound.blogPosts = categoryFound.blogPosts.filter((blogPost) => {
        return blogPost._id.toString() !== document._id.toString();
      });
      return categoryFound.save();
    })
    .then(() => done())
    .catch(error => done(error));
};

blogPostSchema.pre('save', blogPostPreHook);
blogPostSchema.post('remove', blogPostPostHook);

module.exports = mongoose.model('blog-post', blogPostSchema);
