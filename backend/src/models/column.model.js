const mongoose = require('mongoose')

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true
  },

}, {
  timestamps: true
})

const Column = mongoose.model('Column', columnSchema)

module.exports = Column