// Load all environmental variables from the .env file
require('dotenv').config();

// Imports
import mongodb from 'mongodb';

// Types
import type WorkerGlobalObject from 'types/WorkerGlobalObject';

// Check for the db URI variable
if(!process.env.MONGODB_URI) throw 'No mongodb uri specified as MONGODB_URI env variable';

console.log('Starting db');

// Connect to mongodb
mongodb.MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true }, (err, client) => {
  if(err) throw err;

  const db = client.db(process.env.DB_NAME);

  console.log('Started db');

  const global: WorkerGlobalObject = {

  }

  // Processes
  require('./processes/emote')(db, global);
});