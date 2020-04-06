const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getByID = id => {
  const users = usersRepo.getAll();
  const res = users.find(user => user.id === id);
  return res;
};

const add = user => {
  usersRepo.addUser(user);
};

const update = (id, data) => {
  usersRepo.updateUser(id, data);
};

const deleteUser = id => {
  usersRepo.deleteUser(id);
};

module.exports = {
  getAll,
  getByID,
  add,
  update,
  deleteUser
};
