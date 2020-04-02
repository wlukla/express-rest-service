const tasksRepo = require('./task.memory.repository');

const tasks = tasksRepo.getAll();
console.log(tasks);

const getAll = () => tasks;
const getByID = id => {
  const res = tasks.find(task => task.id === id);
  return res;
};

module.exports = {
  getAll,
  getByID
};
