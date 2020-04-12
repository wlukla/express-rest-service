const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');

router
  .route('/')
  .get((req, res, next) => {
    try {
      const boards = boardService.getAll();

      res.status(200);
      res.json(boards);
    } catch (err) {
      return next(err);
    }
  })
  .post((req, res, next) => {
    try {
      const { title, columns } = req.body;
      if (title && columns) {
        const newBoard = new Board({ title, columns });
        boardService.addBoard(newBoard);

        res.status(200);
        res.json(newBoard);
      } else {
        res.status(400);
        res.end({ message: 'Bad request' });
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
        res.status(200);
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

      res.status(200);
      res.send({ message: 'The board has been updated.' });
    } catch (err) {
      return next(err);
    }
  })
  .delete((req, res, next) => {
    try {
      const board = boardService.getByID(req.params.boardID);
      if (board) {
        boardService.deleteBoard(req.params.boardID);

        res.status(200);
        res.send({ message: 'The board has been deleted' });
      } else {
        res.status(404);
        res.send({ message: 'Board not found' });
      }
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
