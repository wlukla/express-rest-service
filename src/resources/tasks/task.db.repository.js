const Task = require('./task.model');

const getAll = async () => {
  return await Task.find({});
};

const addTask = async task => {
  await Task.create(task);
};

const updateTask = async (taskId, boardId, data) => {
  await Task.updateOne({ id: taskId, boardId }, data);
};

const deleteTask = async (taskId, boardId) => {
  await Task.deleteOne({ id: taskId, boardId });
};

module.exports = { getAll, addTask, updateTask, deleteTask };
