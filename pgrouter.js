const express = require('express');
const router = express.Router();
const pgservice = require('./pgservice.js');


router.get('/', (req, res) =>{
  console.log('[ROUT] GET /');
  res.send('Base path (\'/\') accessed with GET');
});

router.get('/about', (req, res)=>{
  console.log('[ROUT] GET /about');
  res.status(200).json({
    'Title': 'PGConnect',
    'Creator': 'RPierz',
    'Description': 'This API exists as an example connection to a database developed using NodeJS'
  });
});

router.get('/test', (req, res) => {
  console.log('[ROUT] GET /test');
  pgservice.testLog();
  res.send('Test Endpoint reached');
});

router.get('/entries', (req, res) => {
  console.log('[ROUT] GET /entries');
  pgservice.findAll()
      .then( 
        (output) => {
          res.send(output.rows)
        });
});

router.get('/entries/total', (req, res) => {
  console.log('[ROUT] GET /entries/total');
  pgservice.findTotal()
      .then( (output) => res.send(output.rows[0]));
});

router.get('/entries/average', (req, res) => {
  console.log('[ROUT] GET /entries/average');
  pgservice.findAverage()
      .then( (output) => res.send(output.rows[0]));
});

router.get('/entries/column/:column', (req, res)=>{
  console.log('[ROUT] GET /entries/column/'+req.params.column);
  pgservice.findByColumn(req.params.column)
      .then( (output) => res.send(output.rows));
});

router.get('/entries/source/:source', (req,res)=>{
  console.log('[ROUT] GET /entries/source/'+req.params.source);
  pgservice.findBySource(req.params.source)
      .then( (output) => res.send(output.rows));
});

router.get('/entries/:id', (req, res) => {
  console.log('[ROUT] GET /entries/'+req.params.id);
  pgservice.findById(req.params.id)
      .then( (output) => res.send(output.rows));
});

router.post('/entries', (req, res) => {
  console.log('[ROUT] POST /entries');
  pgservice.addEntry(req)
      .then( pgservice.findById(req.body.id)
          .then( (output) => res.send(output.rows[0]) ));
});

router.delete('/entries/:id', (req, res) => {
  console.log('[ROUT] DELETE /entries/'+req.params.id);
  pgservice.deleteEntry(req.params.id)
      .then( () => res.send('202 REQUEST RECEIVED'));
});

router.patch('/entries/:id', (req, res) => {
  console.log('[ROUT] PATCH /entries/'+req.params.id);
  pgservice.updateEntryPartial(req.params.id, req.body.column, req.body.value)
    .then( pgservice.findById(req.params.id)  
      .then( (output) => res.send(output.rows[0]))
    );
});

router.put('/entries/:id', (req, res) => {
  console.log('[ROUT] PUT /entries/'+req.params.id);
  pgservice.updateEntryFull(req)
    .then( pgservice.findById(req.params.id)  
      .then( (output) => res.send(output.rows[0]))
    );
});



module.exports = router;
