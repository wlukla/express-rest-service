const boardRepo = require('./board.memory.repository');

const getAll = () => boardRepo.getAll();
const getByID = async id => {
  const tasks = await boardRepo.getAll();
  const res = await tasks.find(user => user.id === id);
  return res;
};

module.exports = {
  getAll,
  getByID
};
