const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
  createTask,
  getTasksByBoard,
  updateTask,
  deleteTask,
} = require('../controllers/task.controller');

router.use(authMiddleware);

router.post('/', createTask);
router.get('/board/:boardId', getTasksByBoard);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;