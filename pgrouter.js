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

router.get('/entries', (req,res) => {
  console.log('[ROUT] GET /entries');
  pgservice.findAll()
      .then( output => res.send(output.rows));
});

router.get('/entries/total', (req, res) => {
  console.log('[ROUT] GET /entries/total');
  pgservice.findTotal( (output) => res.send(output));
});

router.get('/entries/column/:column', (req, res)=>{
  console.log('[ROUT] GET /entries/column/'+req.params.column);
  pgservice.findByColumn(req.params.column, (output) => res.send(output));
});

router.get('/entries/:id', (req, res) => {
  console.log('[ROUT] GET /entries/'+req.params.id);
  pgservice.findById(req.params.id, (output) => res.send(output));
});

router.post('/entries', (req, res) => {
  console.log('[ROUT] POST /entries');
  pgservice.addEntry(req, () => res.send('202 REQUEST RECEIVED'));
});

router.delete('/entries/:id', (req, res) => {
  console.log('[ROUT] DELETE /entries/'+req.params.id);
  pgservice.deleteEntry(req.params.id, () => res.send('202 REQUEST RECEIVED'));
});

router.patch('/entries/:id', (req, res) => {
  console.log('[ROUT] PATCH /entries/'+req.params.id);
  pgservice.updateEntryPartial(req.params.id, req.body.column, req.body.value, (output) => res.send('202 ACCEPTED'));
});

router.put('/entries/:id', (req, res) => {
  console.log('[ROUT] PUT /entries/'+req.params.id);
  pgservice.updateEntryFull(req, () => res.send('202 ACCEPTED'));
});


module.exports = router;
