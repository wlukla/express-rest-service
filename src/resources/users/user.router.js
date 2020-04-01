const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
  .post((req, res) => {
    const user = new User();
    const newUser = { ...user, ...req.body };
    usersService.add(newUser);

    res.send('The user has been created.');
  });

router
  .route('/:userID')
  .get((req, res) => {
    const user = usersService.getByID(req.params.userID);
    res.json(user);
  })
  .put((req, res) => {
    usersService.update(req.params.userID, req.body);
    res.send('The user has been updated.');
  })
  .delete((req, res) => {
    usersService.deleteUser(req.params.userID);
    res.send('The user has been deleted');
  });

module.exports = router;
