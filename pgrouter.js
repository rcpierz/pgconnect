var express = require('express');
var router = express.Router();
var pgservice = require('./pgservice');


router.get('/', (req,res) =>{
	res.send('Base path (\'/\') accessed with GET')
});

router.get('/about',(req,res)=>{
	console.log('[SUCC] GET /about')
	res.send('About page')
});

router.get('/entries/:column', (req,res)=>{
	console.log('[ACCS] GET /entries/'+req.params.column);
	pgservice.searchByColumn(req.params.column);
})


router.post('/entries', (req,res) => {
	console.log('[ACCS] POST /entries');
	res.send(pgservice.addEntry(req));
});

router.delete('/entries/:id', (req,res) => {
	console.log('[ACCS] DELETE /entries/'+req.params.id);
	res.send(pgservice.deleteEntry(req.params.id));	
});

module.exports = router
