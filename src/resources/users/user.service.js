const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();
const getByID = async id => {
  const users = await usersRepo.getAll();
  const res = await users.find(user => user.id === id);
  return res;
};

module.exports = {
  getAll,
  getByID
};
