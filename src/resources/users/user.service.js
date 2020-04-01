const usersRepo = require('./user.memory.repository');

const users = usersRepo.getAll();

const getAll = () => users;

const getByID = id => {
  const res = users.find(user => user.id === id);
  return res;
};

const add = user => {
  users.push(user);
};

const update = (id, data) => {
  const userIdx = users.map(user => user.id).indexOf(id);
  users[userIdx] = { ...users[userIdx], ...data };
};

const deleteUser = id => {
  const userIdx = users.map(user => user.id).indexOf(id);
  if (userIdx > -1) {
    users.splice(userIdx, 1);
  }
};

module.exports = {
  getAll,
  getByID,
  add,
  update,
  deleteUser
};
