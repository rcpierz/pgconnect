# PGConnect

PGConnect is a NodeJS application that uses Express to create a web API to expose a PostgreSQL Database (dailyexpense) for consumption through HTTP

PGConnect runs on localhost on port 8000

## To Do
- [x] Move the DB connection from the Router layer into the Service layer
- [x] Modify function definitions in pgservice so that they are properly accessed by the router module
- [x] Rework the callbacks between router and service module so that search query outputs to response object 
- [x] Apply the callback functions for every endpoint in the router and service layer
- [ ] Try-Catch the DB connection



## Components

- [x] PGConnect: The NodeJS Application that establishes the server
- [x] PGRouter: The Controller that handles traffic routing
- [x] PGService: The Service layer to handle database connection 

## Running
To run the program, simply type
`$ npm start`
in the root folder

## Access
The application is accessible on localhost on port 8000

### Endpoints
BasePath: /v1

|VERB   |URI       	    	   |OUTPUT 							     |
|-------|--------------------------|----------------------------------------------------------------:|
|GET	|/entries		   |Returns all entries from dailyexpense table		     	     |
|GET	|/entries/total	   	   |Returns the sum of the cost from all entries in dailyexpense     |
|GET	|/entries/{id}		   |Returns the entry with matching ID				     |		
|GET	|/entries/column/{column}  |Returns the output of query "SELECT {column} FROM dailyexpense   |
|POST	|/entries	 	   |Enters a new datum into the database in dailyexpense table	     |
|DELETE |/entries/{id}		   |Removes an entry by ID from the dailyexpense table		     |
|PUT	|/entries/{id}		   |Replaces an entry at matching ID with JSON body		     |
|PATCH	|/entries/{id}		   |Replaces a single field of an entry with a new value	     |
