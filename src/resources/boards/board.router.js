const router = require('express').Router();
// const Task = require('./task.model');
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const tasks = await boardService.getAll();
  res.json(tasks);
});

router.route('/:boardID').get(async (req, res) => {
  const board = await boardService.getByID(req.params.boardID);
  res.json(board);
});

module.exports = router;
