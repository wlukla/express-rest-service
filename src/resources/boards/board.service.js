const tasksRepo = require('./board.memory.repository');

const getAll = () => tasksRepo.getAll();
const getByID = async id => {
  const tasks = await tasksRepo.getAll();
  const res = await tasks.find(user => user.id === id);
  return res;
};

module.exports = {
  getAll,
  getByID
};
