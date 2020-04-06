const boards = [];

const getAll = () => {
  return boards;
};

const addBoard = board => {
  boards.push(board);
};

const updateBoard = (id, data) => {
  const boardIdx = boards.map(board => board.id).indexOf(id);
  if (boardIdx > -1) {
    boards[boardIdx] = { ...boards[boardIdx], ...data };
  }
};

const deleteBoard = id => {
  const boardIdx = boards.map(board => board.id).indexOf(id);
  if (boardIdx > -1) {
    boards.splice(boardIdx, 1);
  }
};

module.exports = { getAll, addBoard, updateBoard, deleteBoard };
