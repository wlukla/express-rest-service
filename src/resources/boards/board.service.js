const boardRepo = require('./board.memory.repository');

const boards = boardRepo.getAll();
console.log(boards);

const getAll = () => boards;
const getByID = id => {
  const res = boards.find(board => board.id === id);
  return res;
};

module.exports = {
  getAll,
  getByID
};
