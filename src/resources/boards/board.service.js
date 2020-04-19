const boardRepo = require('./board.db.repository');
const taskRepo = require('../tasks/task.db.repository');

const getAll = async () => await boardRepo.getAll();

const getByID = async id => {
  return await boardRepo.getByID(id);
};

const addBoard = async board => {
  await boardRepo.addBoard(board);
};

const updateBoard = async (id, data) => {
  await boardRepo.updateBoard(id, data);
};

const deleteBoard = async id => {
  await boardRepo.deleteBoard(id);
  const tasks = (await taskRepo.getAll()).filter(task => task.boardId === id);

  tasks.forEach(async task => {
    const { id: taskId, boardId } = task;
    await taskRepo.deleteTask(taskId, boardId);
  });
};

module.exports = {
  getAll,
  getByID,
  addBoard,
  updateBoard,
  deleteBoard
};
