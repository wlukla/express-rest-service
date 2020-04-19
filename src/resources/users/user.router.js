const router = require('express').Router();
const usersService = require('./user.service');
const ErrorHandler = require('../../common/ErrorHandler');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await usersService.getAll();

      res.status(200);
      res.json(users);
    } catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, login, password } = req.body;
      if (name && login && password) {
        const user = await usersService.addUser({ name, login, password });

        res.status(200);
        res.json(user);
      } else {
        throw new ErrorHandler(400, 'Bad request');
      }
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:userID')
  .get(async (req, res, next) => {
    try {
      const user = await usersService.getById(req.params.userID);
      if (user) {
        res.status(200);
        res.json(user);
      } else {
        throw new ErrorHandler(404, 'User not found');
      }
    } catch (err) {
      return next(err);
    }
  })
  .put(async (req, res, next) => {
    try {
      await usersService.updateUser(req.params.userID, req.body);

      res.status(200);
      res.send({ message: 'The user has been updated.' });
    } catch (err) {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      await usersService.deleteUser(req.params.userID);

      res.status(204);
      res.send({ message: 'The user has been deleted' });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
