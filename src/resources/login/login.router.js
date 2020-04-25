const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res, next) => {
  try {
    const token = await loginService.authorize(req.body);

    res.status(200);
    res.json({ token });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
