// Load all environmental variables from the .env file
require('dotenv').config();

// Imports
import mongodb from 'mongodb';
import express from 'express';
import * as http from 'http';
import * as path from 'path';
import bodyParser from 'body-parser';

// Importing the config file
import config from './config';

// Types
import type GlobalObject from 'types/GlobalObject';

// Express app setup
const app = express();
const server = http.createServer(app);

// bodyParser for 'POST' requests
app.use(bodyParser());

// Public folder will server static assets
app.use(express.static(path.join(__dirname, 'public')));

console.log('Starting db');

// Check for the db URI variable
if(!process.env.MONGODB_URI) throw 'No mongodb uri specified as MONGODB_URI env variable';

// Connect to mongodb
mongodb.MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }, (err, client) => {
  if(err) throw err;

  const db = client.db(process.env.DB_NAME);

  console.log('Started db');

  // A global object that all route files will have access to.
  //  This is good for keeping a list of connected users, or for
  //  calling data once and then caching it for the rest of the application
  //  to use.
  let global: GlobalObject = {}

  // Routes!
  // Pass the global object in as a variable on the function that is returned from `./routes/example.js`
  app.use('/api', require('./routes/api')(db, global));

  // Starting the server
  server.listen(config.backend.port, () => {
    console.log(`Backend started on port ${config.backend.port}.`);
  });
});
