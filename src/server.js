/* eslint-disable no-process-exit */
const { PORT } = require('./common/config');
const app = require('./app');
const { processLogger } = require('./logger/index');

process.on('unhandledRejection', err => {
  processLogger('unhandledRejection', err.message);
});

process.on('uncaughtException', err => {
  processLogger('uncaughtException', err.message);
  process.exit(500);
});

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
