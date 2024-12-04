import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import routes from './routes.js';

const app = express();
const PORT = 5000;

// Restrict CORS to specific origin
app.use((req, res, next) => {
  const corsOptions = {
    origin: 'http://localhost:3000', // Only allow this specific origin
    methods: 'GET,POST',
    optionsSuccessStatus: 200
  };
  cors(corsOptions)(req, res, next);
});

app.use(express.json());
app.use(routes);

//Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes',
})

app.use('/api', apiLimiter);

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
