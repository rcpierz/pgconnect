const router = require('./pgrouter.js');
const express = require('express');
const favicon = require('serve-favicon');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(favicon(__dirname + '/favicon.ico'));

// CORS Handling
app.use( (req, res, next) => {
  res.header('Accept-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    return res.status(200).json({});
  }
  next();
});

app.use('/v1', router);

app.use( (req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

// Error handler
app.use( (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

app.listen(8000);
console.log('[CONN] Listening on 8000...');

process.on('SIGINT', function() {
  console.log('\n[CONN] Turning off server. Closing client');
  process.exit();
});
