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
  let query = 'SELECT * FROM dailyexpense;';
  console.log('[SRVC] searching for all entries in dailyexpense table');
  return client.query(query);
};

exports.findByColumn = function(column) {
  let query = 'SELECT '+column+' FROM dailyexpense;';
  console.log('[SRVC] searching dailyexpense table with criterion column = '+
	  column);
  return client.query(query);
};

exports.findById = function(id) {
  let query = 'SELECT * FROM dailyexpense WHERE id = $1;';
  let values = [id];
  console.log('[SRVC] searching dailyexpense table for entry with id = '+id);
  return client.query(query, values);
};

findLastId = function() {
  let query = 'SELECT id FROM dailyexpense ORDER BY id DESC LIMIT 1;';
  console.log('[SRVC] identifying last ID for data entries');
  return client.query(query);
};

exports.addEntry = function(req) {
  console.log('[SRVC] adding a new entry to dailyexpense table with the body = '+JSON.stringify(req.body));
  return findLastId().then( (output) => {
    let lastId = output.rows[0].id;
    let newId = lastId+1;
    let query = 'INSERT INTO dailyexpense VALUES($1, $2, $3, $4, $5, $6);';
    let values = [newId, req.body.date, req.body.meal, req.body.source, req.body.item, req.body.cost];
    client.query(query, values);
    return newId;
  });
};

exports.deleteEntry = function(id) {
  let query = 'DELETE FROM dailyexpense WHERE id = $1;';
  let values = [id];
  console.log('[SRVC] deleting entries with id = '+id);
  return client.query(query, values);
};

exports.updateEntryPartial = function(id, column, value) {
  let query = 'UPDATE dailyexpense SET '+column+' = $1 WHERE id = $2;';
  let values = [value, id];
  console.log('[SRVC] updating entry where id = '+id+': column '+column+'='+value);
  return client.query(query, values);
};

exports.updateEntryFull = function(req) {
  let query = 'UPDATE dailyexpense SET id = $1, date = $2, meal = $3, source = $4, item = $5,cost = $6 WHERE id = $1';
  let values = [req.body.id, req.body.date, req.body.meal, req.body.source, req.body.item, req.body.cost];
  console.log('[SRVC] updating entry where id = '+req.params.id+' with data: '+JSON.stringify(req.body));
  return client.query(query, values);
};

exports.getTotal = function() {
  let query = 'SELECT SUM(cost) FROM dailyexpense;';
  console.log('[SRVC] finding total of costs from dailyexpense');
  return client.query(query);
};
