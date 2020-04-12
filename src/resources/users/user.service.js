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
  const tasks = taskRepo.getAll().filter(task => task.userId === id);

  tasks.forEach(task => {
    const { id: taskId, boardId } = task;
    taskService.updateTask(taskId, boardId, { ...tasks, userId: null });
  });
};

module.exports = {
  getAll,
  getByID,
  addUser,
  updateUser,
  deleteUser
};
