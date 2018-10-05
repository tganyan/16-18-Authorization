'use strict';

const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
  timestamp: {
    type: Date,
    default: () => new Date(),
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  guitars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'guitar',
    },
  ],
},
{
  usePushEach: true,
});

module.exports = mongoose.model('brand', brandSchema);
