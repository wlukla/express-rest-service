const boardRepo = require('./board.memory.repository');

const boards = boardRepo.getAll();

const getAll = () => boards;
const getByID = id => {
  const res = boards.find(board => board.id === id);
  return res;
};
const add = board => {
  boards.push(board);
};

const update = (id, data) => {
  const boardIdx = boards.map(board => board.id).indexOf(id);
  boards[boardIdx] = { ...boards[boardIdx], ...data };
};

const deleteBoard = id => {
  console.log(id);
  const boardIdx = boards.map(board => board.id).indexOf(id);
  if (boardIdx > -1) {
    boards.splice(boardIdx, 1);
  }
};

module.exports = {
  getAll,
  getByID,
  add,
  update,
  deleteBoard
};
