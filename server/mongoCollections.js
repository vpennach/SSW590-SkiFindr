import { dbConnection } from './mongoConnection.js';
import axios from 'axios';

// Function to get the collection, as you have it already
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

// Fetch ski resorts from an API and insert into the database
export const populateSkiResorts = async () => {
  try {
    // Step 1: Fetch ski resorts data from the API
    const response = await axios.get('https://www.skiresortapi.com/');
    const resortsData = response.data;

    // Step 2: Get the collection you want to insert the data into (i.e., "skis")
    const skisCollection = await getCollectionFn('skis')();

    // Step 3: Insert the resorts into the database
    const insertResult = await skisCollection.insertMany(resortsData);
    console.log(`${insertResult.insertedCount} ski resorts inserted into MongoDB`);

  } catch (error) {
    console.error('Error fetching or inserting ski resorts data:', error);
  }
};

export const skis = getCollectionFn('skis');
