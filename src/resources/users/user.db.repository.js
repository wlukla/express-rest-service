const User = require('./user.model');

const getAll = async () => {
  return await User.find({});
};

const addUser = async user => {
  return await User.create(user);
};

const updateUser = async (id, data) => {
  await User.updateOne({ id }, data);
};

const deleteUser = async id => {
  await User.deleteOne({ id });
};

module.exports = { getAll, addUser, updateUser, deleteUser };
