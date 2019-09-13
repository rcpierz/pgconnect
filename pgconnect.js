const router = require('./pgrouter.js')
const express = require('express')
var app = express()

app.use(express.json());

app.use('/v1',router)

app.listen(8000)
console.log('[CONN] Listening on 8000...')

process.on('SIGINT', function() {
	console.log('\n[CONN] Turning off server. Closing client')
	process.exit()
})
