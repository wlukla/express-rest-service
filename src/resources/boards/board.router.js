const router = require('express').Router();
// const Task = require('./task.model');
const boardService = require('./board.service');

router.route('/').get((req, res) => {
  const tasks = boardService.getAll();
  res.json(tasks);
});

router.route('/:boardID').get((req, res) => {
  const board = boardService.getByID(req.params.boardID);
  res.json(board);
});

module.exports = router;
