const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router
  .route('/')
  .get((req, res, next) => {
    try {
      const boards = boardService.getAll();
      res.json(boards);
    } catch (err) {
      return next(err);
    }
  })
  .post((req, res, next) => {
    try {
      const { title, columns } = req.body;

      if (!title || !columns) {
        res.status(400);
        res.end({ message: 'Bad request' });
      } else {
        const newBoard = new Board({ title, columns });
        boardService.addBoard(newBoard);

        res.json(newBoard);
      }
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:boardID')
  .get((req, res, next) => {
    try {
      const board = boardService.getByID(req.params.boardID);
      if (board) {
        res.json(board);
      } else {
        res.status(404);
        res.send({ message: 'Board not found' });
      }
    } catch (err) {
      return next(err);
    }
  })
  .put((req, res, next) => {
    try {
      boardService.updateBoard(req.params.boardID, req.body);
      res.send({ message: 'The board has been updated.' });
    } catch (err) {
      return next(err);
    }
  })
  .delete((req, res, next) => {
    try {
      const board = boardService.getByID(req.params.boardID);
      if (!board) {
        res.status(404);
        res.send({ message: 'Board not found' });
      } else {
        boardService.deleteBoard(req.params.boardID);
        res.send({ message: 'The board has been deleted' });
      }
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
