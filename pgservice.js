const { Pool, Client } = require('pg');

const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'generaldb',
	password: 'postgres',
	port: 5432
});

client.connect();
console.log('[SRVC] Database connection is established');

exports.testLog = function() {
	console.log('[SRVC] running testLog function');
};

exports.searchByColumn = function(column, callback) {
	console.log('[SRVC] searching dailyexpense table with criterion column = '+column);
	client.query('SELECT '+column+' FROM dailyexpense;')
		.then( output => {callback(output.rows)});
		
};

exports.addEntry = function(req, callback) {
	console.log('[SRVC] adding a new entry to dailyexpense table with body = '+JSON.stringify(req.body));
	client.query('INSERT INTO dailyexpense VALUES('+req.body.id+',\''+req.body.date+'\',\''+req.body.meal+'\',\''+req.body.source+'\',\''+req.body.item+'\','+req.body.cost+');')
		.then( () => callback());
};

exports.deleteEntry = function(id, callback) {
	console.log('[SRVC] deleting entries with id = '+id);
	client.query('DELETE FROM dailyexpense WHERE id = '+id)
		.then( () => callback());
}

