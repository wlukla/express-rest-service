const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get((req, res, next) => {
    try {
      const users = usersService.getAll();

      res.status(200);
      res.json(users.map(User.toResponse));
    } catch (err) {
      return next(err);
    }
  })
  .post((req, res, next) => {
    try {
      const { name, login, password } = req.body;
      if (name && login && password) {
        const user = new User({ name, login, password });
        usersService.addUser(user);

        res.status(200);
        res.json(User.toResponse(user));
      } else {
        res.status(400);
        res.end({ message: 'Bad request' });
      }
    } catch (err) {
      return next(err);
    }
  });

router
  .route('/:userID')
  .get((req, res, next) => {
    try {
      const user = usersService.getByID(req.params.userID);
      if (user) {
        res.status(200);
        res.json(user);
      } else {
        res.status(404);
        res.send({ message: 'User not found' });
      }
    } catch (err) {
      return next(err);
    }
  })
  .put((req, res, next) => {
    try {
      const user = usersService.getByID(req.params.userID);
      if (user) {
        usersService.updateUser(req.params.userID, req.body);

        res.status(200);
        res.send({ message: 'The user has been updated.' });
      } else {
        res.status(404);
        res.send({ message: 'User not found' });
      }
    } catch (err) {
      return next(err);
    }
  })
  .delete((req, res, next) => {
    try {
      usersService.deleteUser(req.params.userID);

      res.status(204);
      res.send({ message: 'The user has been deleted' });
    } catch (err) {
      return next(err);
    }
  });

module.exports = router;
