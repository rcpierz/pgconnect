const router = require('./pgrouter.js');
const express = require('express');
const favicon = require('serve-favicon');
const app = express();

app.use(express.json());
app.use(favicon(__dirname + '/favicon.ico'));

app.use('/v1', router);

app.listen(8000);
console.log('[CONN] Listening on 8000...');

process.on('SIGINT', function() {
  console.log('\n[CONN] Turning off server. Closing client');
  process.exit();
});
