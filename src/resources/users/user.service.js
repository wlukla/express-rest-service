const usersRepo = require('./user.db.repository');
const taskRepo = require('../tasks/task.db.repository');
const User = require('./user.model');

const getAll = async () => await usersRepo.getAll();

const getById = async id => {
  const users = await usersRepo.getAll();
  const res = users.find(user => user.id === id);
  if (res) {
    return User.toResponse(res);
  }
};

const addUser = async user => {
  return User.toResponse(await usersRepo.addUser(user));
};

const updateUser = async (id, data) => {
  await usersRepo.updateUser(id, data);
};

const deleteUser = async id => {
  await usersRepo.deleteUser(id);
  const tasks = (await taskRepo.getAll()).filter(task => task.userId === id);

  tasks.forEach(async task => {
    const { id: taskId, boardId } = task;
    await taskRepo.updateTask(taskId, boardId, { ...tasks, userId: null });
  });
};

module.exports = {
  getAll,
  getById,
  addUser,
  updateUser,
  deleteUser
};
