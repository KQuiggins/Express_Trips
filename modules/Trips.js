if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require('mongoose');
//require('dotenv').config();

const uri = process.env.MONGODB_URI;

// Connect to the MongoDB Atlas cluster
async function connectToDatabase() {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB Atlas!');
  } catch (err) {
    console.error(err);
  }
}

connectToDatabase();


const tripSchema = new mongoose.Schema({
  driver: {type: String, required: true},
  date: {type: String, required: true},
  city: {type: String, required: true},
  miles: {type: Number, required: true},
  gallons: {type: Number, required: true},
});

tripSchema.virtual('milesPerGallon').get(function() {
  return this.miles / this.gallons;
});

const TripsModel = mongoose.model('trips', tripSchema);

module.exports = TripsModel;
