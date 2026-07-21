const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const { createBoard, getBoards, getBoardById, updateBoard, deleteBoard } = require('../controllers/board.controller');

router.use(authMiddleware);

router.post('/', createBoard);
router.get('/', getBoards);
router.get('/:id', getBoardById);
router.put('/:id', updateBoard);
router.delete('/:id', deleteBoard);

module.exports = router;