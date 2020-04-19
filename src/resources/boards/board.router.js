const router = require('express').Router();
const Board = require('./board.model');
const boardService = require('./board.service');
const ErrorHandler = require('../../common/ErrorHandler');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const boards = await boardService.getAll();

      res.status(200);
      res.json(boards);
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { title, columns } = req.body;
      if (title && columns) {
        const newBoard = new Board({ title, columns });
        await boardService.addBoard(newBoard);

        res.status(200);
        res.json(newBoard);
      } else {
        throw new ErrorHandler(400, 'Bad request');
      }
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:boardID')
  .get(async (req, res, next) => {
    try {
      const board = await boardService.getByID(req.params.boardID);
      if (board) {
        res.status(200);
        res.json(board);
      } else {
        throw new ErrorHandler(404, 'Board not found');
      }
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      await boardService.updateBoard(req.params.boardID, req.body);

      res.status(200);
      res.send({ message: 'The board has been updated.' });
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const board = await boardService.getByID(req.params.boardID);
      if (board) {
        await boardService.deleteBoard(req.params.boardID);

        res.status(200);
        res.send({ message: 'The board has been deleted' });
      } else {
        throw new ErrorHandler(404, 'Board not found');
      }
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
