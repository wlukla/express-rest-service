/* eslint-disable no-unused-vars */
const winston = require('winston');
const path = require('path');

const logFilePath = path.resolve(__dirname, '../combined.log');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: logFilePath, flags: 'a' })
  ],
  format: winston.format.cli()
});

const requestLogger = (req, res, next) => {
  const { method, url, params, body } = req;
  logger.log(
    'info',
    `${method} url: ${url} params: ${JSON.stringify(
      params
    )} body: ${JSON.stringify(body)}`
  );
  next();
};

const errorLogger = (err, req, res, next) => {
  const { statusCode, message } = err;
  res.status(500).send(message);
  logger.log('error', `CODE 500: ${message}`);
};

const processLogger = (err, message) => {
  logger.log('error', `${err}: ${message}`);
};

module.exports = { requestLogger, errorLogger, processLogger };
