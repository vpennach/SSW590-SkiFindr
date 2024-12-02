import express from 'express';
import { ski } from './mongoCollections.js';

const router = express.Router();

router.get('/api/resorts/count', async (req, res) => {
  try {
    const resortsCollection = await ski();
    const count = await resortsCollection.countDocuments();
    res.json({ count });
  } catch (err) {
    console.error('Error fetching resort count:', err);
    res.status(500).send('Error fetching resort count');
  }
});

router.get('/api/resorts', async (req, res) => {
  try {
    const resortsCollection = await ski();
    const resorts = await resortsCollection.find({}).limit(462).toArray(); // Fetch the first 20 resorts
    res.json(resorts);
  } catch (err) {
    console.error('Error fetching resorts:', err);
    res.status(500).send('Error fetching resorts');
  }
});

export default router;
