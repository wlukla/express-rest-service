const morgan = require('morgan');

morgan.token('query', req => {
  return JSON.stringify(req.query);
});

morgan.token('body', req => {
  return JSON.stringify(req.body);
});

const logger = morgan((tokens, req) =>
  [
    tokens.method(req),
    'URL:',
    tokens.url(req),
    'query:',
    tokens.query(req),
    'body:',
    tokens.body(req)
  ].join(' ')
);

module.exports = logger;
