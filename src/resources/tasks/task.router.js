const router = require('express').Router();
const taskService = require('./task.service');
const ErrorHandler = require('../../common/ErrorHandler');

router
  .route('/boards/:boardID/tasks')
  .get(async (req, res, next) => {
    try {
      const tasks = await taskService.getAll(req.params.boardID);

      res.status(200);
      res.json(tasks);
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const task = await taskService.addTask(req.params.boardID, req.body);

      res.status(200);
      res.json(task);
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/boards/:boardID/tasks/:taskID')
  .get(async (req, res, next) => {
    try {
      const task = await taskService.getByID(
        req.params.boardID,
        req.params.taskID
      );
      if (task) {
        res.status(200);
        res.json(task);
      } else {
        throw new ErrorHandler(404, 'Task not found');
      }
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      const task = await taskService.getByID(
        req.params.boardID,
        req.params.taskID
      );
      if (task) {
        await taskService.updateTask(
          req.params.taskID,
          req.params.boardID,
          req.body
        );

        res.status(200);
        res.send({ message: 'The task has been updated.' });
      } else {
        throw new ErrorHandler(404, 'Task not found');
      }
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const task = await taskService.getByID(
        req.params.boardID,
        req.params.taskID
      );
      if (task) {
        await taskService.deleteTask(req.params.taskID, req.params.boardID);

        res.status(200);
        res.send({ message: 'The Task has been deleted' });
      } else {
        throw new ErrorHandler(404, 'Task not found');
      }
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
