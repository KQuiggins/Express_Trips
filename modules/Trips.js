const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1:27017/travel');
require('dotenv').config()
const uri = process.env.MONGODB_URI
//const test_uri = process.env.PLAYGROUND_URI
// Connect to the MongoDB Atlas cluster
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })

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

module.exports = TripsModel