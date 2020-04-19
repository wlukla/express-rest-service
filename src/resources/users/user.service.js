const usersRepo = require('./user.db.repository');
const taskRepo = require('../tasks/task.memory.repository');
const taskService = require('../tasks/task.service');
const User = require('./user.model');

const getAll = async () => await usersRepo.getAll();

const getById = async id => {
  const user = await usersRepo.getById(id);
  return User.toResponse(user);
};

const addUser = async user => {
  const newUser = await usersRepo.addUser(user);
  return User.toResponse(newUser);
};

const updateUser = async (id, data) => {
  const result = await usersRepo.updateUser(id, data);
  if (result) {
    return User.toResponse(result);
  }
};

const deleteUser = async id => {
  const isDeleted = await usersRepo.deleteUser(id);
  const tasks = taskRepo.getAll().filter(task => task.userId === id);

  tasks.forEach(task => {
    const { id: taskId, boardId } = task;
    taskService.updateTask(taskId, boardId, { ...tasks, userId: null });
  });
  return isDeleted;
};

module.exports = {
  getAll,
  getById,
  addUser,
  updateUser,
  deleteUser
};
