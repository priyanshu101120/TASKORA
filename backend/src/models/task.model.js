const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  assignee: {
    type: String,
    trim: true,
    default: '',
  },
  dueDate: {
    type: Date,
  },
  column: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Column',
    required: true,
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;