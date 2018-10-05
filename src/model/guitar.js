'use strict';

const mongoose = require('mongoose');
const HttpError = require('http-errors');
const Brand = require('./brand');

const guitarSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  style: {
    type: String,
    required: true,
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'brand',
  },
});

function guitarPreHook(done) {
  return Brand.findById(this.brand)
    .then((brandFound) => {
      if (!brandFound) {
        throw new HttpError(404, 'brand not found');
      }
      brandFound.guitars.push(this._id);
      return brandFound.save();
    })
    .then(() => done())
    .catch(error => done(error));
}

const guitarPostHook = (document, done) => {
  return Brand.findById(document.brand)
    .then((brandFound) => {
      if (!brandFound) {
        throw new HttpError(500, 'brand not found');
      }
      brandFound.guitars = brandFound.guitars.filter((guitar) => {
        return guitar._id.toString() !== document._id.toString();
      });
      return brandFound.save();
    })
    .then(() => done())
    .catch(error => done(error));
};

guitarSchema.pre('save', guitarPreHook);
guitarSchema.post('remove', guitarPostHook);

module.exports = mongoose.model('guitar', guitarSchema);
