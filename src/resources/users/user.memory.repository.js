const uuid = require('uuid').v4;
const User = require('./user.model');

const getAll = () => {
  return [
    new User(uuid(), 'Andrew', 'andy', 'PSSWRD'),
    new User(uuid(), 'Alex', 'AleXXX333', 'PSSWRD'),
    new User(uuid(), 'Gordon', 'GrDn', 'PSSWRD'),
    new User(uuid(), 'Sofia', 'sonyPS', 'PSSWRD'),
    new User(uuid(), 'Brenda', 'HI_THERE', 'PSSWRD')
  ];
};

module.exports = { getAll };
