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
  console.log('[SRVC] searching for all entries in dailyexpense table');
  return client.query('SELECT * FROM dailyexpense;');
};

exports.findByColumn = function(column) {
  console.log('[SRVC] searching dailyexpense table with criterion column = '+
	  column);
  return client.query('SELECT '+column+' FROM dailyexpense;');
};

exports.findById = function(id) {
  console.log('[SRVC] searching dailyexpense table for entry with id = '+id);
  return client.query('SELECT * FROM dailyexpense WHERE id = '+id);
};

exports.addEntry = function(req) {
  console.log('[SRVC] adding a new entry to dailyexpense table with body = '+JSON.stringify(req.body));
  return client.query('INSERT INTO dailyexpense VALUES('+req.body.id+',\''+req.body.date+'\',\''+req.body.meal+'\',\''+req.body.source+'\',\''+req.body.item+'\','+req.body.cost+');');
};

exports.deleteEntry = function(id) {
  console.log('[SRVC] deleting entries with id = '+id);
  return client.query('DELETE FROM dailyexpense WHERE id = '+id);
};

exports.updateEntryPartial = function(id, column, value) {
  console.log('[SRVC] updating entry where id = '+id+': column '+column+'='+value);
  return client.query('UPDATE dailyexpense SET '+column+' = \''+value+'\' WHERE id = '+id);
};

exports.updateEntryFull = function(req) {
  console.log('[SRVC] updating entry where id = '+req.params.id+' with data: '+JSON.stringify(req.body));
  return client.query('UPDATE dailyexpense SET id = '+req.body.id+', date=\''+req.body.date+'\', meal=\''+req.body.meal+'\', source=\''+req.body.source+'\', item=\''+req.body.item+'\', cost='+req.body.cost+' where id='+req.params.id+';');
};

exports.getTotal = function() {
  console.log('[SRVC] finding total of costs from dailyexpense');
  return client.query('SELECT SUM(cost) FROM dailyexpense');
};
