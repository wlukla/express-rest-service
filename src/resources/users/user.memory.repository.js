const users = [];

const getAll = () => {
  return users;
};

const addUser = user => {
  users.push(user);
};

const updateUser = (id, newUser) => {
  const userIdx = users.map(user => user.id).indexOf(id);
  if (userIdx > -1) {
    users[userIdx] = { ...users[userIdx], ...newUser };
  }
};

const deleteUser = id => {
  const userIdx = users.map(user => user.id).indexOf(id);
  if (userIdx > -1) {
    users.splice(userIdx, 1);
  }
};
module.exports = { getAll, addUser, updateUser, deleteUser };
