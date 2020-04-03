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
      res.send('Bad request');
    } else {
      const user = new User();
      const newUser = { ...user, ...req.body };
      usersService.add(newUser);

      res.send('The user has been created.');
    }
  });

router
  .route('/:userID')
  .get((req, res) => {
    const user = usersService.getByID(req.params.userID);
    if (!user) {
      res.status(404);
      res.send('User not found');
    } else {
      res.json(user);
    }
  })
  .put((req, res) => {
    const user = usersService.getByID(req.params.userID);
    if (!user) {
      res.status(404);
      res.send('User not found');
    } else {
      usersService.update(req.params.userID, req.body);
      res.send('The user has been updated.');
    }
  })
  .delete((req, res) => {
    const user = usersService.getByID(req.params.userID);
    if (!user) {
      res.status(404);
      res.send('User not found');
    } else {
      usersService.deleteUser(req.params.userID);
      res.send('The user has been deleted');
    }
  });

module.exports = router;
