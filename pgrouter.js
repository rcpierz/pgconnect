const express = require('express');
const router = express.Router();
const pgservice = require('./pgservice.js');


router.get('/', (req, res) =>{
  console.log('[ROUT] GET /');
  res.send('Base path (\'/\') accessed with GET');
});

router.get('/about', (req, res)=>{
  console.log('[ROUT] GET /about');
  res.send('About page');
});

router.get('/test', (req, res) => {
  console.log('[ROUT] GET /test');
  pgservice.testLog();
  res.send('Test Endpoint reached');
});

router.get('/entries/:column', (req, res)=>{
  console.log('[ROUT] GET /entries/'+req.params.column);
  pgservice.searchByColumn(req.params.column, (output) => res.send(output));
});


router.post('/entries', (req, res) => {
  console.log('[ROUT] POST /entries');
  pgservice.addEntry(req, () => res.send('201 CREATED'));
});

router.delete('/entries/:id', (req, res) => {
  console.log('[ROUT] DELETE /entries/'+req.params.id);
  pgservice.deleteEntry(req.params.id, () => res.send('202 REQUEST RECEIVED'));
});

router.patch('/entries/:id', (req, res) => {
  console.log('[ROUT] PATCH /entries/'+req.params.id);
  pgservice.updateEntry(req.params.id, req.body.column, req.body.value, (output) => res.send('202 ACCEPTED'));
});

module.exports = router;
