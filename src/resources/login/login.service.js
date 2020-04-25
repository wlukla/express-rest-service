const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersRepo = require('../users/user.db.repository');
const ErrorHandler = require('../../common/ErrorHandler');

const { JWT_SECRET_KEY } = process.env;

const authorize = async user => {
  const userFound = await usersRepo.findUserBy({ login: user.login });
  if (!userFound) throw new ErrorHandler(403, 'Forbidden');

  const isPasswordValid = bcrypt.compare(user.password, userFound.password);
  if (!isPasswordValid) throw new ErrorHandler(403, 'Incorrect password');

  return jwt.sign(
    {
      id: userFound.id,
      login: userFound.login
    },
    JWT_SECRET_KEY
  );
};

module.exports = { authorize };
