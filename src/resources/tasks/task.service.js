const taskRepo = require('./task.db.repository');
const boardRepo = require('../boards/board.db.repository');
const Task = require('./task.model');

const getAll = async boardId => {
  const tasks = await taskRepo.getAll();
  return tasks.filter(task => task.boardId === boardId);
};

const getByID = async (boardId, taskId) => {
  const tasks = await taskRepo.getAll();
  return tasks.find(item => item.boardId === boardId && item.id === taskId);
};

const addTask = async (boardId, data) => {
  const board = await boardRepo.getByID(boardId);
  if (board) {
    const task = new Task({ ...data, boardId });
    await taskRepo.addTask(task);
    return task;
  }
};

const updateTask = async (taskId, boardId, data) => {
  await taskRepo.updateTask(taskId, boardId, data);
};

const deleteTask = async (taskId, boardId) => {
  await taskRepo.deleteTask(taskId, boardId);
};

module.exports = {
  getAll,
  getByID,
  addTask,
  updateTask,
  deleteTask
};
