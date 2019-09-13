var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg');
const connectionString = 'postgresql://postgres:postgres@localhost:5432/generaldb';

const client = new Client({
	connectionString:connectionString,
});

client.connect();
console.log('[INFO] Client is connected');

router.get('/', (req,res) =>{
	res.send('Base path (\'/\') accessed with GET')
});

router.get('/about',(req,res)=>{
	console.log('[SUCC] GET /about')
	res.send('About page')
});

router.get('/entries/:column', (req,res)=>{
	client.query('SELECT '+req.params.column+' FROM dailyexpense;')
		.then( output => {
			res.send(output.rows);
			console.log('[SUCC] GET /entries/'+req.params.column); 
		})
})


router.post('/entries', (req,res) => {
	console.log('[ACCS] POST /entries');
	client.query('INSERT INTO dailyexpense VALUES('+req.body.id+',\''+req.body.date+'\',\''+req.body.meal+'\',\''+req.body.source+'\',\''+req.body.item+'\','+req.body.cost+');')
		.then( output => {
			res.send("STATUS 201 CREATED with ID = "+req.body.id);
		});
})

router.delete('/entries/:id', (req,res) => {
	console.log('[ACCS] DELETE /entries/'+req.params.id);
	client.query('DELETE FROM dailyexpense WHERE id='+req.params.id)
		.then( output => {
			res.send("Entry id "+req.params.id+" has been deleted")
		});
});

module.exports = router
