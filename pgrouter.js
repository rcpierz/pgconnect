var express = require('express');
var router = express.Router();
var pgservice = require('./pgservice.js');


router.get('/', (req,res) =>{
	console.log('[ROUT] GET /');
	res.send('Base path (\'/\') accessed with GET');
});

router.get('/about',(req,res)=>{
	console.log('[ROUT] GET /about');
	res.send('About page')
});

router.get('/test',(req,res) => {
	console.log('[ROUT] GET /test');
	pgservice.testLog();
	res.send('Test Endpoint reached');
})

router.get('/entries/:column', (req,res)=>{
	console.log('[ROUT] GET /entries/'+req.params.column);
	pgservice.searchByColumn(req.params.column, (output) => res.send(output));
})


router.post('/entries', (req,res) => {
	console.log('[ROUT] POST /entries');
	pgservice.addEntry(req, () => res.send('201 CREATED'));
});

router.delete('/entries/:id', (req,res) => {
	console.log('[ROUT] DELETE /entries/'+req.params.id);
	pgservice.deleteEntry(req.params.id, () => res.send('202 REQUEST RECEIVED'));	
});

module.exports = router
