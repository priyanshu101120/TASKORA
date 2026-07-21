const Columns = require('../models/column.model');
const Task = require('../models/task.model');
const Board = require('../models/board.model');

const verifyBoard = async (boardId, userId) => {
  const board = await Board.findOne({ _id: boardId, owner: userId });
  return board;
};

const createColumn = async (req, res) => {
  try {
    const { name, boardId } = req.body;
    if (!name || !boardId) {
      return res.status(400).json({ success: false, message: 'Name and Board ID are required' });
    }
    const board = await verifyBoard(boardId, req.user.id);
    if (!board) {
      return res.status(404).json({ success: false, message: 'Board not found or you do not have permission' });
    }
    const columnCount = await Columns.countDocuments({ board: boardId });
    if (columnCount >= 4) {
      return res.status(400).json({ success: false, message: 'Maximum of 4 columns allowed per board' });
    }

    const column = await Columns.create({ name, board: boardId, order: columnCount });
    res.status(201).json({ success: true, column });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error creating column' });
  }
};

const getColumns = async (req, res) => {
  try {
    const { boardId } = req.params;
    const board = await verifyBoard(boardId, req.user.id);
    if (!board) {
      return res.status(404).json({ success: false, message: 'Board not found or you do not have permission' });
    }
    const columns = await Columns.find({ board: boardId }).sort({ order: 1 });
    res.status(200).json({ success: true, columns });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching columns' });
  }
};

const updateColumn = async (req, res) => {
  try {
    const { name } = req.body;
    const column = await Columns.findById(req.params.id);
    if (!column) {
      return res.status(404).json({ success: false, message: 'Column not found' });
    }

    const board = await verifyBoard(column.board, req.user.id);
    if (!board) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (name !== undefined) column.name = name;
    await column.save();

    res.status(200).json({ success: true, column });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating column' });
  }
};

const deleteColumn = async (req, res) => {
  try {
    const column = await Columns.findById(req.params.id);
    if (!column) {
      return res.status(404).json({ success: false, message: 'Column not found' });
    }

    const board = await verifyBoard(column.board, req.user.id);
    if (!board) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await Task.deleteMany({ column: column._id });
    await column.deleteOne();

    res.status(200).json({ success: true, message: 'Column deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting column' });
  }
};

module.exports = { createColumn, getColumns, updateColumn, deleteColumn };