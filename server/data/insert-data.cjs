const fs = require('fs');
const csv = require('csv-parser');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'SkiFinder';
const collectionName = 'ski';

const filePath = 'resorts.csv';

async function importCSV() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
        if (results.length === 100) {
          insertData(results, collection);
          return;
        }
      })
      .on('end', () => {
        console.log('CSV file processed');
      });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

async function insertData(data, collection) {
  try {
    await collection.insertMany(data);
    console.log(`${data.length} resorts inserted into MongoDB.`);
  } catch (err) {
    console.error('Error inserting data into MongoDB:', err);
  }
}

importCSV();
