const Board = require('../models/board.model');
const Column = require('../models/column.model');
const Task = require('../models/task.model');


const createBoard = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }
    const board = await Board.create({
      title,
      description,
      owner: req.user.id
    })
    res.status(201).json({ success: true, board })
  } catch (error) {
    console.error('CREATE BOARD ERROR:', error);   // ← yeh line add karo
    res.status(500).json({ success: false, message: 'Error creating board' });
  }
}

const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, boards })

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching boards' });
  }
}

const getBoardById = async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.id, owner: req.user.id });
    if (!board) {
      return res.status(404).json({ success: false, message: 'Board not found' });
    }
    res.status(200).json({ success: true, board });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching board' });
  }
}

const updateBoard = async (req, res) => {
  try {
    const { title, description } = req.body;
    const board = await Board.findOne({ _id: req.params.id, owner: req.user.id });
    if (!board) {
      return res.status(404).json({ success: false, message: 'Board not found' });
    }
    if (title !== undefined) board.title = title;
    if (description !== undefined) board.description = description;
    await board.save();
    res.status(200).json({ success: true, board });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating board' });
  }
}

const deleteBoard = async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.id, owner: req.user.id });
    if (!board) {
      return res.status(404).json({ success: false, message: 'Board not found' });
    }
    // const columns = await Column.find({ board: board._id });
    // const columnIds = columns.map(column => column._id);

    // await Task.deleteMany({ column: { $in: clumnsIds } })
    // await Column.deleteMany({ board: board._id });
    await board.deleteOne();
    res.status(200).json({ success: true, message: 'Board deleted successfully' });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting board' });
  }
}
module.exports = {
  createBoard,
  getBoards,
  getBoardById,
  updateBoard,
  deleteBoard
}