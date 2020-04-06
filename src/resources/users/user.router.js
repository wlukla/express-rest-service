const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post((req, res) => {
    const { name, login, password } = req.body;
    if (!name || !login || !password) {
      res.status(400);
      res.end({ message: 'Bad request' });
    } else {
      const user = new User({ name, login, password });
      usersService.addUser(user);

      res.json(User.toResponse(user));
    }
  });

router
  .route('/:userID')
  .get((req, res) => {
    const user = usersService.getByID(req.params.userID);
    if (!user) {
      res.status(404);
      res.send({ message: 'User not found' });
    } else {
      res.json(user);
    }
  })
  .put((req, res) => {
    const user = usersService.getByID(req.params.userID);
    if (!user) {
      res.status(404);
      res.send({ message: 'User not found' });
    } else {
      usersService.updateUser(req.params.userID, req.body);
      res.status(200);
      res.send({ message: 'The user has been updated.' });
    }
  })
  .delete((req, res) => {
    const user = usersService.getByID(req.params.userID);
    if (!user) {
      res.status(404);
      res.send({ message: 'User not found' });
    } else {
      usersService.deleteUser(req.params.userID);
      res.send({ message: 'The user has been deleted' });
    }
  });

module.exports = router;
