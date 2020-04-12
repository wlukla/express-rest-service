const boardRepo = require('./board.memory.repository');
const taskRepo = require('../tasks/task.memory.repository');

const getAll = () => boardRepo.getAll();

const getByID = id => {
  return boardRepo.getByID(id);
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

  tasks.forEach(task => {
    const { id: taskId, boardId } = task;
    taskRepo.deleteTask(taskId, boardId);
  });
};

module.exports = {
  getAll,
  getByID,
  addBoard,
  updateBoard,
  deleteBoard
};
