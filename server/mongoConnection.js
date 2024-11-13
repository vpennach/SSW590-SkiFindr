import { MongoClient } from 'mongodb';
import { mongoConfig } from './settings.js';
let _connection = undefined;
let _db = undefined;
let bucket = undefined;

const dbConnection = async () => {
  if (!_connection) {
    try {
      _connection = await MongoClient.connect(mongoConfig.serverUrl);
      _db = _connection.db(mongoConfig.database);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }
  return _db;
};


const closeConnection = async () => {
  await _connection.close();
};

export { dbConnection, closeConnection };