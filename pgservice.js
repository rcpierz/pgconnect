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

exports.findAll = function(callback) {
  console.log('[SRVC] searching for all entries in dailyexpense table');
  return client.query('SELECT * FROM dailyexpense;');
};

exports.findByColumn = function(column, callback) {
  console.log('[SRVC] searching dailyexpense table with criterion column = '+
	  column);
  client.query('SELECT '+column+' FROM dailyexpense;')
      .then( (output) => {callback(output.rows);
      });
};

exports.findById = function(id, callback) {
  console.log('[SRVC] searching dailyexpense table for entry with id = '+id);
  client.query('SELECT * FROM dailyexpense WHERE id = '+id)
      .then( (output) => {callback(output.rows[0]);
      })
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
};

exports.updateEntryPartial = function(id, column, value, callback) {
  console.log('[SRVC] updating entry where id = '+id+': column '+column+'='+value);
  client.query('UPDATE dailyexpense SET '+column+' = \''+value+'\' WHERE id = '+id)
      .then( () => callback());
};

exports.updateEntryFull = function(req, callback) {
  console.log('[SRVC] updating entry where id = '+req.params.id+' with data: '+JSON.stringify(req.body));
  client.query('UPDATE dailyexpense SET id = '+req.body.id+', date=\''+req.body.date+'\', meal=\''+req.body.meal+'\', source=\''+req.body.source+'\', item=\''+req.body.item+'\', cost='+req.body.cost+' where id='+req.params.id+';')
      .then( () => callback());
};

exports.getTotal = function(callback) {
  console.log('[SRVC] finding total of costs from dailyexpense');
  client.query('SELECT SUM(cost) FROM dailyexpense')
      .then( output => callback(output.rows[0]));
};
