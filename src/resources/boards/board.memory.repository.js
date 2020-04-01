const tasks = require('./boards.dummy');

const getAll = async () => {
  return tasks;
};

module.exports = { getAll };
