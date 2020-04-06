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
    res.json(board);
  })
  .put((req, res) => {
    boardService.updateBoard(req.params.boardID, req.body);
    res.send({ message: 'The board has been updated.' });
  })
  .delete((req, res) => {
    const board = boardService.getByID(req.params.userID);
    if (!board) {
      res.send({ code: 404, message: 'Board not found' });
    } else {
      boardService.deleteBoard(req.params.userID);
      res.send({ code: 204, message: 'The board has been deleted' });
    }
  });

module.exports = router;
