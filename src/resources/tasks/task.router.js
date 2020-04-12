const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router
  .route('/boards/:boardID/tasks')
  .get(async (req, res, next) => {
    try {
      const tasks = taskService.getAll(req.params.boardID);
      res.status(200);
      res.json(tasks.map(Task.toResponse));
    } catch (err) {
      return next(err);
    }
  })
  .post((req, res, next) => {
    try {
      const boardID = req.params.boardID;
      const data = req.body;
      const task = taskService.addTask(boardID, data);
      res.status(200);
      res.json(Task.toResponse(task));
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/boards/:boardID/tasks/:taskID')
  .get((req, res, next) => {
    try {
      const task = taskService.getByID(req.params.boardID, req.params.taskID);
      if (task) {
        res.status(200);
        res.json(task);
      } else {
        res.status(404);
        res.send({ message: 'Task not found.' });
      }
    } catch (err) {
      return next(err);
    }
  })
  .put((req, res, next) => {
    try {
      const task = taskService.getByID(req.params.boardID, req.params.taskID);
      if (!task) {
        res.status(404);
        res.send({ message: 'Task not found' });
      } else {
        taskService.updateTask(req.params.taskID, req.params.boardID, req.body);
        res.status(200);
        res.send({ message: 'The task has been updated.' });
      }
    } catch (err) {
      return next(err);
    }
  })
  .delete((req, res, next) => {
    try {
      const task = taskService.getByID(req.params.boardID, req.params.taskID);
      if (!task) {
        res.status(404);
        res.send({ message: 'Task not found' });
      } else {
        taskService.deleteTask(req.params.taskID, req.params.boardID);
        res.status(200);
        res.send({ message: 'The Task has been deleted' });
      }
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
