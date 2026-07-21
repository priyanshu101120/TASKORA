const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const {
  createColumn,
  getColumns,
  updateColumn,
  deleteColumn,
} = require('../controllers/column.controller');

router.use(authMiddleware);

router.post('/', createColumn);
router.get('/board/:boardId', getColumns);
router.put('/:id', updateColumn);
router.delete('/:id', deleteColumn);

module.exports = router;