/* eslint-disable no-unused-vars */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const winston = require('winston');
const expressWinston = require('express-winston');
const userRouter = require('./resources/users/user.router');
const taskRouter = require('./resources/tasks/task.router');
const boardRouter = require('./resources/boards/board.router');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console({ json: true })],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    // meta: false,
    msg: 'HTTP {{req.url}} {{req.body}} {{req.params}}'
    // expressFormat: true,
    // colorize: true,
    // ignoreRoute(req, res) {
    //   return false;
    // }
  })
);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/', taskRouter);

module.exports = app;
