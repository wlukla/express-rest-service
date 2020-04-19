const Board = require('./board.model');

const getAll = async () => {
  const boards = await Board.find({}).exec();
  return boards;
};

const getById = async id => await Board.find({ id });

const addBoard = async data => {
  const board = await Board.create(data);
  return board;
};

const updateBoard = async (id, data) =>
  (await Board.updateOne({ _id: id }, data)).ok;

const deleteBoard = async id => (await Board.deleteOne({ _id: id })).ok;

module.exports = { getAll, getById, addBoard, updateBoard, deleteBoard };
