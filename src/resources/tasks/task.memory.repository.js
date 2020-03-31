const tasks = require('./tasks.dummy');

const getAll = async () => {
  return tasks;
};

module.exports = { getAll };
