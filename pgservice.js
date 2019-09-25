const {Client} = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'generaldb',
  password: 'postgres',
  port: 5432,
});

client.connect();
console.log('[SRVC] Database connection is established');

exports.testLog = function() {
  console.log('[SRVC] running testLog function');
};

exports.findAll = function() {
  var query = 'SELECT * FROM dailyexpense;');
  console.log('[SRVC] searching for all entries in dailyexpense table');
  return client.query(query);
};

exports.findByColumn = function(column) {
  var query = 'SELECT $1 FROM dailyexpense;');
  var values = [column];
  console.log('[SRVC] searching dailyexpense table with criterion column = '+
	  column);
  return client.query(query, values);
};

exports.findById = function(id) {
  var query = 'SELECT * FROM dailyexpense WHERE id = $1';
  var values = [id];
  console.log('[SRVC] searching dailyexpense table for entry with id = '+id);
  return client.query(query, values);
};

findLastId = function() {
  var query = 'SELECT id FROM dailyexpense ORDER BY id DESC LIMIT 1';
  console.log('Finding last ID for data entries');
  return client.query(query);
}

exports.addEntry = function(req) {
  findLastId().then( output => { 
	  var lastId = output.rows[0].id;
          console.log(lastId)});
  console.log(lastId);
  console.log('[SRVC] adding a new entry to dailyexpense table with body = '+JSON.stringify(req.body));
  return client.query('INSERT INTO dailyexpense VALUES('+req.body.id+',\''+req.body.date+'\',\''+req.body.meal+'\',\''+req.body.source+'\',\''+req.body.item+'\','+req.body.cost+');');
};

exports.deleteEntry = function(id) {
  var query = 'DELETE FROM dailyexpense WHERE id = ';
  var values = [id];
  console.log('[SRVC] deleting entries with id = '+id);
  return client.query(query, values);
};

exports.updateEntryPartial = function(id, column, value) {
  var query = 'UPDATE dailyexpense SET $1 = $2 WHERE id = $3';
  var values = [column, value, id];
  console.log('[SRVC] updating entry where id = '+id+': column '+column+'='+value);
  return client.query(query, values);
};

exports.updateEntryFull = function(req) {
  var query = 'UPDATE dailyexpense SET id = $1, date = $2, meal = $3, source = $4, item = $5,cost = $6 WHERE id = $1';
  var values = [req.body.id, req.body.date, req.body.meal, req.body.source, req.body.item, req.body.cost];
  console.log('[SRVC] updating entry where id = '+req.params.id+' with data: '+JSON.stringify(req.body));
  return client.query(query, values);
};

exports.getTotal = function() {
  var query = 'SELECT SUM(cost) FROM dailyexpense;';
  console.log('[SRVC] finding total of costs from dailyexpense');
  return client.query(query);
};
