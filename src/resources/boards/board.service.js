const boardRepo = require('./board.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = () => boardRepo.getAll();

const getByID = id => {
  const boards = getAll();
  const res = boards.find(board => board.id === id);
  return res;
};

const addBoard = board => {
  boardRepo.addBoard(board);
};

const updateBoard = (id, data) => {
  boardRepo.updateBoard(id, data);
};

const deleteBoard = id => {
  boardRepo.deleteBoard(id);
  const tasks = taskRepo
    .getAll()
    .filter(task => task.boardId === id)
    .map(task => task.id);
  if (tasks.length > 0) {
    taskService.forEach(task => taskService.deleteTask(task.id));
  }
};

module.exports = {
  getAll,
  getByID,
  addBoard,
  updateBoard,
  deleteBoard
};
