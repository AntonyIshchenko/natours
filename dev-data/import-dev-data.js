const fs = require('node:fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DB_HOST.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(console.log('DB connection successful!'));

// READ JSON
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8'),
);

// Impord data
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

// Delete data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit(0);
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
