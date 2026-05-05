const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Route files
const authRoutes = require('./routes/auth');
const zoneRoutes = require('./routes/zones');
const logRoutes = require('./routes/logs');
const aiRoutes = require('./routes/ai');
const Zone = require('./models/Zone');

dotenv.config();

// Connect to database
connectDB().then(async () => {
  // Auto-seed database for in-memory setup
  const count = await Zone.countDocuments();
  if (count === 0) {
    console.log('Seeding initial zones for Memory DB...');
    await Zone.insertMany([
      { name: 'Living Zone', currentGravity: 1.0, safeRange: { min: 0.8, max: 1.2 }, status: 'Optimal' },
      { name: 'Gym Zone', currentGravity: 1.5, safeRange: { min: 1.0, max: 2.5 }, status: 'Optimal' },
      { name: 'Medical Zone', currentGravity: 0.3, safeRange: { min: 0.1, max: 0.8 }, status: 'Optimal' },
      { name: 'Farming Zone', currentGravity: 1.0, safeRange: { min: 0.8, max: 1.2 }, status: 'Optimal' },
    ]);
  }
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/zones', zoneRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.send('GraviSphere API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
