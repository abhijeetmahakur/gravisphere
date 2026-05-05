const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Zone = require('../models/Zone');
const Log = require('../models/Log');
const connectDB = require('../config/db');

dotenv.config();

connectDB();

const zones = [
  { name: 'Living Zone', currentGravity: 1.0, safeRange: { min: 0.8, max: 1.2 }, status: 'Optimal' },
  { name: 'Gym Zone', currentGravity: 1.5, safeRange: { min: 1.0, max: 2.5 }, status: 'Optimal' },
  { name: 'Medical Zone', currentGravity: 0.3, safeRange: { min: 0.1, max: 0.8 }, status: 'Optimal' },
  { name: 'Farming Zone', currentGravity: 1.0, safeRange: { min: 0.8, max: 1.2 }, status: 'Optimal' },
];

const seedData = async () => {
  try {
    await Zone.deleteMany();
    await Log.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed...');

    await Zone.insertMany(zones);
    console.log('Zones Seeded...');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Zone.deleteMany();
    await Log.deleteMany();
    await User.deleteMany();
    
    console.log('Data Destroyed...');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  seedData();
}
