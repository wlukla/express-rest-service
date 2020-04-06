const router = require('express').Router();
const Task = require('./task.model');
const taskService = require('./task.service');

router
  .route('/boards/:boardID/tasks')
  .get(async (req, res) => {
    const tasks = taskService.getAll(req.params.boardID);
    res.json(tasks.map(Task.toResponse));
  })
  .post((req, res) => {
    const boardID = req.params.boardID;
    const data = req.body;
    const task = taskService.addTask(boardID, data);
    res.json(Task.toResponse(task));
  });

router
  .route('/boards/:boardID/tasks/:taskID')
  .get((req, res) => {
    const task = taskService.getByID(req.params.boardID, req.params.taskID);
    if (task) {
      res.json(task);
    } else {
      res.send({ code: 404, message: 'Task not found.' });
    }
  })
  .put((req, res) => {
    const task = taskService.getByID(req.params.boardID, req.params.taskID);
    if (!task) {
      res.status(404);
      res.send({ message: 'Task not found' });
    } else {
      taskService.updateTask(req.params.taskID, req.params.boardID, req.body);
      res.status(200);
      res.send({ message: 'The task has been updated.' });
    }
  })
  .delete((req, res) => {
    const task = taskService.getByID(req.params.boardID, req.params.taskID);
    if (!task) {
      res.status(404);
      res.send({ message: 'Task not found' });
    } else {
      taskService.deleteTask(req.params.taskID, req.params.boardID);
      res.send({ message: 'The Task has been deleted' });
    }
  });

module.exports = router;
