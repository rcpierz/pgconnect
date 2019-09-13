#PGConnect

PGConnect is a Javascript Express application that exposes a PostgreSQL Database for consumption through HTTP

PGConnect runs on localhost on port 8000

##Components
-PGConnect: The NodeJS Application that establishes the server
-PGRouter: The Controller that handles traffic routing
-PGService: The Service layer to handle database connection [TODO]

##Running
To run the program, simply type
`$ npm start`
in the root folder

##Access
The application is accessible on localhost on port 8000

###Endpoints
BasePath: /v1

|VERB   |URI       	    |OUTPUT 							     |
|-------|-------------------|----------------------------------------------------------------|
|GET	|/entries/{column}  |Returns the output of query "SELECT {column} FROM dailyexpense" |


