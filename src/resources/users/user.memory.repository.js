const users = require('./users.dummy');

const getAll = async () => {
  return users;
};

module.exports = { getAll };
