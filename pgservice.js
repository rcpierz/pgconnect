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

function searchByColumn(column) {
	client.query('SELECT '+column+' FROM dailyexpense;');
};

var addEntry = (req) => {
	client.query('INSERT INTO dailyexpense VALUES('+req.body.id+',\''+req.body.date+'\',\''+req.body.meal+'\',\''+req.body.source+'\',\''+req.body.item+'\','+req.body.cost+');');
};

var deleteEntry = (id) => {
	client.query('DELETE FROM dailyexpense WHERE id = '+id);
}

module.exports = client
