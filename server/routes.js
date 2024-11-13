import express from 'express';
import { ski } from './mongoCollections.js';

const router = express.Router();
const app = express();

app.use(express.json());


app.get('/api/resorts/count', async (req, res) => {
  try {
    const resortsCollection = await ski(); 
    const count = await resortsCollection.countDocuments();  
    res.json({ count });
  } catch (err) {
    console.error('Error fetching resort count:', err);
    res.status(500).send('Error fetching resort count');
  }
});

// Make sure to listen on the correct port
app.listen(5000, () => {
  console.log('Server running on http://localhost:3000');
});
