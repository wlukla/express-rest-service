/* eslint-disable no-unused-vars */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');

const { requestLogger, errorLogger } = require('./middlewares/loggers');
const { tokenChecker } = require('./middlewares/token-checker');

const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/task.router');
const boardRouter = require('./resources/boards/board.router');
const loginRouter = require('./resources/login/login.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());
app.use(requestLogger, tokenChecker);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/login', loginRouter);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/', taskRouter);

app.use(errorLogger);

module.exports = app;
