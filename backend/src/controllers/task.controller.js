const Task = require('../models/task.model');
const Column = require('../models/column.model');
const Board = require('../models/board.model');

const verifyBoardOwnership = async (boardId, userId) => {
  const board = await Board.findOne({ _id: boardId, owner: userId });
  return board;
};

const createTask = async (req, res) => {
  try {
    const { title, description, assignee, dueDate, columnId, boardId } = req.body;

    if (!title || !columnId || !boardId) {
      return res.status(400).json({ success: false, message: 'Title, columnId and boardId are required' });
    }

    const board = await verifyBoardOwnership(boardId, req.user.id);
    if (!board) {
      return res.status(404).json({ success: false, message: 'Board not found' });
    }

    const taskCount = await Task.countDocuments({ column: columnId });

    const task = await Task.create({
      title,
      description,
      assignee,
      dueDate,
      column: columnId,
      board: boardId,
      order: taskCount,
    });

    res.status(201).json({ success: true, task });
  } catch (error) {
    console.error('CREATE TASK ERROR:', error);
    res.status(500).json({ success: false, message: 'Error creating task' });
  }
};

const getTasksByBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await verifyBoardOwnership(boardId, req.user.id);
    if (!board) {
      return res.status(404).json({ success: false, message: 'Board not found' });
    }

    const tasks = await Task.find({ board: boardId }).sort({ order: 1 });
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching tasks' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, assignee, dueDate, columnId } = req.body;
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const board = await verifyBoardOwnership(task.board, req.user.id);
    if (!board) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (assignee !== undefined) task.assignee = assignee;
    if (dueDate !== undefined) task.dueDate = dueDate;
    if (columnId !== undefined) task.column = columnId; // drag-drop ke liye — column change

    await task.save();

    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating task' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const board = await verifyBoardOwnership(task.board, req.user.id);
    if (!board) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await task.deleteOne();
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting task' });
  }
};

module.exports = { createTask, getTasksByBoard, updateTask, deleteTask };