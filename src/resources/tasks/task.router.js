const router = require('express').Router();
// const Task = require('./task.model');
const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const users = await taskService.getAll();
  res.json(users);
});

router.route('/:taskID').get((req, res) => {
  const user = taskService.getByID(req.params.taskID);
  res.json(user);
});

module.exports = router;
