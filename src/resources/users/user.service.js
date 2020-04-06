const usersRepo = require('./user.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getByID = id => {
  const users = getAll();
  const res = users.find(user => user.id === id);
  return res;
};

const addUser = user => {
  usersRepo.addUser(user);
};

const updateUser = (id, data) => {
  usersRepo.updateUser(id, data);
};

const deleteUser = id => {
  usersRepo.deleteUser(id);
  const tasks = taskRepo
    .getAll()
    .filter(task => task.userId === id)
    .map(task => {
      task.userId = null;
      return task;
    });
  if (tasks.length > 0) {
    for (let i = 0; i < tasks.length; i += 1) {
      taskService.updateTask(tasks[i].id, tasks[i]);
    }
  }
};

module.exports = {
  getAll,
  getByID,
  addUser,
  updateUser,
  deleteUser
};
