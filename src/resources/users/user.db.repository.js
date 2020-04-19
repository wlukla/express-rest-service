const User = require('./user.model');

const getAll = async () => await User.find({});

const getById = async id => await User.findOne({ id });

const addUser = async user => await User.create(user);

const updateUser = async (id, data) => (await User.updateOne({ id }, data)).ok;

const deleteUser = async id => (await User.deleteOne({ id })).ok;

module.exports = { getAll, getById, addUser, updateUser, deleteUser };
