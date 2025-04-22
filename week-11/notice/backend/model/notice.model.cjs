const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pin: {
    type: Boolean,
  },
}, { timestamps: true });

const Notice = mongoose.model('Notice', noticeSchema);

module.exports = Notice;
