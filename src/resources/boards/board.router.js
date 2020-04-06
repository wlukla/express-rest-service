const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router
  .route('/')
  .get((req, res) => {
    const tasks = boardService.getAll();
    res.json(tasks);
  })
  .post((req, res) => {
    const { title, columns } = req.body;

    if (!title || !columns) {
      res.status(400);
      res.end({ message: 'Bad request' });
    } else {
      const newBoard = new Board({ title, columns });
      boardService.addBoard(newBoard);

      res.json(newBoard);
    }
  });

router
  .route('/:boardID')
  .get((req, res) => {
    const board = boardService.getByID(req.params.boardID);
    if (board) {
      res.json(board);
    } else {
      res.status(404);
      res.send({ message: 'Board not found' });
    }
  })
  .put((req, res) => {
    boardService.updateBoard(req.params.boardID, req.body);
    res.send({ message: 'The board has been updated.' });
  })
  .delete((req, res) => {
    const task = boardService.getByID(req.params.boardID);
    if (!task) {
      res.status(404);
      res.send({ message: 'Task not found' });
    } else {
      boardService.deleteBoard(req.params.boardID);
      res.send({ message: 'The Task has been deleted' });
    }
  });

module.exports = router;
