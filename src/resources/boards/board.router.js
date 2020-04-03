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
    const newBoard = { ...new Board(), ...req.body };
    boardService.add(newBoard);

    res.send('The board has been created.');
  });

router
  .route('/:boardID')
  .get((req, res) => {
    const board = boardService.getByID(req.params.boardID);
    res.json(board);
  })
  .put((req, res) => {
    boardService.update(req.params.boardID, req.body);
    res.send('The board has been updated.');
  })
  .delete((req, res) => {
    boardService.deleteBoard(req.params.boardID);
    res.send('The board has been deleted.');
  });

module.exports = router;
