const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const { argv } = require('process');
const { ObjectId } = mongoose.Types; // Import ObjectId from Mongoose

const DB = 'mongodb+srv://Bunthai:Bunthai1pass@cluster0.l0dcnf5.mongodb.net/?retryWrites=true';

mongoose.connect(DB, {});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

// Modify the "id" field to become "_id" with ObjectId
tours.forEach((tour) => {
  tour._id = new ObjectId(); // Create a new ObjectId
  delete tour.id; // Remove the "id" field
});

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully imported!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from the database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
