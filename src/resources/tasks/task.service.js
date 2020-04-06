const taskRepo = require('./task.memory.repository');
const boardService = require('../boards/board.service');
const Task = require('./task.model');

const getAll = boardId => {
  const tasks = taskRepo.getAll();
  return tasks.filter(task => task.boardId === boardId);
};

const getByID = (boardId, taskId) => {
  const tasks = taskRepo.getAll();
  const task = tasks.find(
    item => item.boardId === boardId && item.id === taskId
  );
  return task;
};

const addTask = (boardId, data) => {
  const board = boardService.getByID(boardId);
  if (board) {
    const task = new Task({ ...data, boardId });
    taskRepo.addTask(task);
    return task;
  }
};

const updateTask = (taskId, boardId, data) => {
  taskRepo.updateTask(taskId, boardId, data);
};

const deleteTask = (taskId, boardId) => {
  taskRepo.deleteTask(taskId, boardId);
};

module.exports = {
  getAll,
  getByID,
  addTask,
  updateTask,
  deleteTask
};
