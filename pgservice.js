const { Pool, Client } = require('pg');

const client = new Client({
	user: 'postgres',
	host: 'localhost',
	database: 'generaldb',
	password: 'postgres',
	port: 5432
});

client.connect();
console.log('[INFO] Database connection is established');

exports.testLog = function() {
	console.log('[TEST] Test endpoint reached');
};

exports.searchByColumn = function(column, callback) {
	client.query('SELECT '+column+' FROM dailyexpense;')
		.then( output => {callback(output.rows)});
};

exports.addEntry = function(req) {
	client.query('INSERT INTO dailyexpense VALUES('+req.body.id+',\''+req.body.date+'\',\''+req.body.meal+'\',\''+req.body.source+'\',\''+req.body.item+'\','+req.body.cost+');');
};

exports.deleteEntry = function(id) {
	client.query('DELETE FROM dailyexpense WHERE id = '+id);
}

