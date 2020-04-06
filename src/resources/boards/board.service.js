const boardRepo = require('./board.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

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
  const tasks = taskRepo.getAll().filter(task => task.boardId === id);

  for (let i = 0; i < tasks.length; i++) {
    const { id: taskId, boardId } = tasks[i];
    taskRepo.deleteTask(taskId, boardId);
  }
};

module.exports = {
  getAll,
  getByID,
  addBoard,
  updateBoard,
  deleteBoard
};
